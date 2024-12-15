import { Controller, Post, Get, Body, Param } from "@nestjs/common";
import { WalletService } from "./wallet.service";

@Controller('wallet')
export class WalletController {
    constructor(private walletService: WalletService) { }

    @Post('create')
    createWallet(@Body('username') username: string) {
        return this.walletService.createWallet(username);
    }

}