import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  address: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  phone: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
