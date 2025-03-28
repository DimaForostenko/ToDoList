import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
  Req,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from '../guards/auth.guard';
import { Request } from 'express';

@Controller('tasks')
@UseGuards(AuthGuard)
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@Body() createTaskDto: CreateTaskDto, @Req() req: Request) {
    const userId = req.user['sub'];
    return this.tasksService.create(createTaskDto, userId);
  }

  @Get()
  findAll(@Req() req: Request) {
    const userId = req['user']['sub'];
    return this.tasksService.findAll(userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req: Request) {
    const userId = req['user']['sub'];
    return this.tasksService.findOne(+id, userId);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Req() req: Request) {
    const userId = req.user['sub'];
    return this.tasksService.remove(+id, userId);
  }
}
