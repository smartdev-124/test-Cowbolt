import { Injectable, NotFoundException, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Wallet } from "./entities/wallet.entity";
import { Transaction } from "./entities/transaction.entity";
import { v4 as uuidv4 } from 'uuid';
import { ethers } from 'ethers';

@Injectable()
export class WalletService {
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
}
