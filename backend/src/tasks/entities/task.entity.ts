import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from '..//../user/entities/user.entity';
@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: false })
  completed: boolean;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User; // Завдання належить користувачу
}
