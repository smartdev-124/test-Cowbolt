import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { Transaction } from './entities/transaction.entity';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Wallet, Transaction])],
    controllers: [WalletController],
    providers: [WalletService],
})
export class WalletModule {}
