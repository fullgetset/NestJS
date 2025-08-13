import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  private tasks = [
    {
      id: 1,
      title: 'Task number 1',
      isCompleted: true,
    },
    {
      id: 2,
      title: 'Task number 2',
      isCompleted: false,
    },
  ];

  findAll() {
    return this.tasks;
  }

  findById(id: number) {
    const currentTask = this.tasks.find((task) => task.id === id);

    if (!currentTask) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }

    return currentTask;
  }

  create(dto: CreateTaskDto) {
    const { title, description, priority, tags } = dto;

    const newTask = {
      id: this.tasks.length + 1,
      title,
      isCompleted: false,
      description,
      priority,
      tags,
    };

    this.tasks.push(newTask);

    return this.tasks;
  }

  update(id: number, dto: UpdateTaskDto) {
    const { title, isCompleted } = dto;

    const currentTask = this.findById(id);

    currentTask.title = title;
    currentTask.isCompleted = isCompleted;

    return currentTask;
  }

  patchUpdate(id: number, dto: Partial<UpdateTaskDto>) {
    const currentTask = this.findById(id);

    Object.assign(currentTask, dto);

    return currentTask;
  }

  delete(id: number) {
    const currentTask = this.findById(id);

    this.tasks = this.tasks.filter((task) => task.id !== currentTask.id);

    return this.tasks;
  }
}
