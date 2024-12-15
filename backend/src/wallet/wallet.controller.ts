import { Controller, Post, Get, Body, Param } from "@nestjs/common";
import { WalletService } from "./wallet.service";

@Controller('wallet')
export class WalletController {
    constructor(private walletService: WalletService) { }

    @Post('create')
    createWallet(@Body('username') username: string) {
        return this.walletService.createWallet(username);
    }

    @Get(':address/balance')
    getBalance(@Param('address') address: string) {
        return this.walletService.getBalance(address);
    }

    @Post('send')
    sendTransaction(
        @Body('senderAddress') senderAddress: string,
        @Body('recipientAddress') recipientAddress: string,
        @Body('amount') amount: number,
    ) {
        return this.walletService.sendTransaction(senderAddress, recipientAddress, amount);
    }
}