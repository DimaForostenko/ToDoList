import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create({
      ...createTaskDto,
      completed: createTaskDto.completed ?? false,
    });
    return this.tasksRepository.save(task);
  }

  async findAll(): Promise<Task[]> {
    this.logger.log('Fetching all tasks');
    return this.tasksRepository.find();
  }

  async findOne(id: number): Promise<Task> {
    this.logger.log(`Fetching task with ID ${id}`);
    const task = await this.tasksRepository.findOneBy({ id });
    if (!task) {
      this.logger.warn(`Task with ID ${id} not found`);
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    this.logger.log(`Updating task with ID ${id}`);
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    } // Перевірка наявності завдання перед оновленням
    await this.tasksRepository.update(id, updateTaskDto);
    return this.tasksRepository.findOneBy({ id });
  }

  async remove(id: number): Promise<Task> {
    this.logger.log(`Deleting task with ID ${id}`);
    const task = await this.findOne(id);
    await this.tasksRepository.delete(id);
    this.logger.log(`Task with ID ${id} deleted`);
    return task;
  }
}
