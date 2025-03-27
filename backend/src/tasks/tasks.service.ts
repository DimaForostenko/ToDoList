import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { UsersService } from '..//user/users.service';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private readonly usersService: UsersService,
  ) {}

  async create(createTaskDto: CreateTaskDto, userId: number): Promise<Task> {
    const user = await this.usersService.findById(userId);
    const task = this.tasksRepository.create({
      ...createTaskDto,
      completed: createTaskDto.completed ?? false,
      user,
    });
    const savedTask = await this.tasksRepository.save(task);
    // Виключаємо пароль із відповіді
    delete savedTask.user.password;
    return savedTask;
  }

  async findAll(userId: number): Promise<Task[]> {
    const tasks = await this.tasksRepository.find({
      where: { user: { id: userId } },
      relations: ['user'], // Завантажуємо користувача
    });
    // Виключаємо пароль із кожної задачі
    return tasks.map((task) => {
      delete task.user.password;
      return task;
    });
  }
  async findOne(id: number, userId: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id, user: { id: userId } },
      relations: ['user'], // Завантажуємо користувача
    });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    // Виключаємо пароль
    delete task.user.password;
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) throw new NotFoundException(`Task with ID ${id} not found`);
    Object.assign(task, updateTaskDto);
    return this.tasksRepository.save(task);
  }

  async remove(id: number, userId: number): Promise<void> {
    await this.findOne(id, userId); // Перевірка, чи існує завдання
    await this.tasksRepository.delete(id); // Видалення завдання
  }
}
