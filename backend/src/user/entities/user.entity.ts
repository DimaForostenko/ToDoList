import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Task } from '../../tasks/entities/task.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string; // Хеш пароля

  @OneToMany(() => Task, (task) => task.user)
  tasks: Task[]; // Зв’язок із завданнями
}
