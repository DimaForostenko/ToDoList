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

  @Column({ nullable: true }) // Додаємо status
  status?: string;

  @Column({ type: 'date', nullable: true }) // Поле для дати
  dueDate?: Date;

  @Column({ enum: ['low', 'middle', 'high'], default: 'middle' }) // Поле для пріоритетності
  priority: 'low' | 'middle' | 'high';

  @ManyToOne(() => User, (user) => user.tasks)
  user: User; // Завдання належить користувачу
}
