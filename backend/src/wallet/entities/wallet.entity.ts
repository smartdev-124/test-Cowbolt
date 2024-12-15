import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    username: string;

    @Column({ unique: true })
    address: string;

    @Column()
    privateKey: string;
  
    @Column({ type: 'float', default: 0 })
    balance: number;
}
