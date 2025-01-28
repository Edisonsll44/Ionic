import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular/standalone';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '../services/loading.service';
import { TaskService } from '../services/task.service';
import { TaskDto } from '../../interface/task';

@Component({
  selector: 'app-actionstask',
  templateUrl: './actionstask.page.html',
  styleUrls: ['./actionstask.page.scss'],
  standalone: false,
})
export class ActionstaskPage implements OnInit {
  taskTitle: string = '';
  taskDescription: string = '';
  action: string = '';
  isEditMode: boolean = false;
  taskToEdit: TaskDto | null = null;

  constructor(
    private navController: NavController,
    private loadingService: LoadingService,
    private activatedRoute: ActivatedRoute,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(async (params) => {
      if (params['mode'] === 'edit' && params['task']) {
        this.isEditMode = true;
        this.taskToEdit = JSON.parse(params['task']);
        if (this.taskToEdit) {
          this.taskTitle = this.taskToEdit.title;
          this.taskDescription = this.taskToEdit.description;
        }
      } else {
        this.clearField();
        this.isEditMode = false;
      }
      this.setActionText();
    });
  }

  returnTaskList() {
    this.navController.navigateBack(['/tasklist']);
  }

  async saveTask() {
    if (!this.taskTitle?.trim() || !this.taskDescription?.trim()) {
      this.loadingService.showToster(
        'El título de la tarea y su descripción son obligatorios',
        3000
      );
      return;
    }

    if (this.isEditMode) {
      await this.updateTask();
    } else {
      await this.addNewTask();
    }
  }

  private async addNewTask() {
    const tasks = await this.taskService.getTasks();
    const taskExists = tasks.some((task) => task.title === this.taskTitle.trim());

    if (taskExists) {
      this.loadingService.showToster('Ya existe una tarea con este título', 3000);
      return;
    }

    const newTask: TaskDto = {
      title: this.taskTitle.trim(),
      description: this.taskDescription.trim(),
      status: 'pendiente',
    };

    await this.saveOrUpdateTasks(newTask);
  }

  private async updateTask() {
    if (!this.taskToEdit) {
      this.loadingService.showToster('No se encontró la tarea a editar', 3000);
      return;
    }

    const updatedTask: TaskDto = {
      ...this.taskToEdit,
      title: this.taskTitle.trim(),
      description: this.taskDescription.trim(),
    };

    await this.saveOrUpdateTasks(updatedTask);
  }

  private clearField() {
    this.taskTitle = '';
    this.taskDescription = '';
  }

  private setActionText() {
    this.action = this.isEditMode ? 'Editar tarea' : 'Nueva tarea';
  }

  private async saveOrUpdateTasks(task: TaskDto) {
    try {
      const tasks = await this.taskService.getTasks();
      const taskIndex = tasks.findIndex(
        (existingTask) => existingTask.title === task.title
      );

      if (taskIndex !== -1) {
        tasks[taskIndex] = task;
      } else {
        tasks.push(task);
      }

      await this.taskService.setTasks(tasks);

      this.clearField();
      setTimeout(() => {

      }, 2000);

      this.loadingService.showLoading('Tarea guardada correctamente', 2000);
      setTimeout(() => {
        this.returnTaskList();
      }, 3000);
    } catch (error) {
      console.error('Error al guardar la tarea:', error);
      this.loadingService.showToster('Error al guardar la tarea', 3000);
    }
  }

  preventNavigation(event: Event) {
    event.stopPropagation();
    event.preventDefault();
  }
}
