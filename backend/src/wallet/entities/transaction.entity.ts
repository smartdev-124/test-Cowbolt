import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Wallet } from './wallet.entity';

@Entity()
export class Transaction {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    hash: string;
  
    @Column()
    senderAddress: string;

    @Column()
    recipientAddress: string;

    @Column({ type: 'float' })
    amount: number;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => Wallet, (wallet) => wallet.id)
    wallet: Wallet;
}
