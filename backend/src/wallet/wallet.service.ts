import { Injectable, NotFoundException, BadRequestException, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Wallet } from "./entities/wallet.entity";
import { Transaction } from "./entities/transaction.entity";
import { ethers } from 'ethers';

@Injectable()
export class WalletService implements OnModuleInit {
    private provider: ethers.providers.JsonRpcProvider;

    constructor(
        @InjectRepository(Wallet) private walletRepository: Repository<Wallet>,
        @InjectRepository(Transaction) private transactionRepository: Repository<Transaction>,
    ) {
        this.provider = new ethers.providers.JsonRpcProvider(process.env.ETH_RPC_URL);
    }

    async createWallet(username: string): Promise<Wallet> {
        const newWallet = ethers.Wallet.createRandom();
        const wallet = this.walletRepository.create({
            username,
            address: newWallet.address,
            privateKey: newWallet.privateKey,
            balance: 0,
        });

        return this.walletRepository.save(wallet);
    }

    async onModuleInit() {
        this.listenForIncomingTransactions();
    }

    listenForIncomingTransactions() {
        this.provider.on('block', async () => {
            const wallets = await this.walletRepository.find();
            for (const wallet of wallets) {
                const balance = await this.provider.getBalance(wallet.address);
                wallet.balance = Number(ethers.utils.formatEther(balance));
                await this.walletRepository.save(wallet);
            }
        });
    }

    async getBalance(address: string): Promise<number> {
        const wallet = await this.walletRepository.findOne({ where: { address } });
        if (!wallet) throw new NotFoundException('Wallet not found');

        return wallet.balance;
    }

    async sendTransaction(senderAddress: string, recipientAddress: string, amount: number): Promise<string> {
        if (amount <= 0) throw new BadRequestException('Invalid amount');

        const sender = await this.walletRepository.findOne({ where: { address: senderAddress } });
        const recipient = await this.walletRepository.findOne({ where: { address: recipientAddress } });

        if (!sender || !recipient) throw new NotFoundException('Wallet not found');
        if (sender.balance < amount) throw new BadRequestException('Insufficient balance');

        try {
            const wallet = new ethers.Wallet(sender.privateKey, this.provider);
            const tx = await wallet.sendTransaction({
                to: recipientAddress,
                value: ethers.utils.parseEther(String(amount)),
            });

            sender.balance = Number(sender.balance) - Number(amount);
            recipient.balance = Number(recipient.balance) + Number(amount);

            await this.walletRepository.save(sender);
            await this.walletRepository.save(recipient);

            const transaction = this.transactionRepository.create({
                hash: tx.hash,
                senderAddress,
                recipientAddress,
                amount,
            });

            await this.transactionRepository.save(transaction);

            return tx.hash;
        } catch (error) {
            throw new Error(`Transaction failed: ${error.message}`);
        }
    }
}
