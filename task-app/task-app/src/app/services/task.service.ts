import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { TaskDto } from '../../interface/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: TaskDto[] = [];

  constructor() {
    this.init();
  }

  async init() {
    //await this.clearPreferences();

    const storedTasks = await this.getTasks();

    if (!storedTasks || storedTasks.length === 0) {
      await this.fullData();
    } else {
      this.tasks = storedTasks;
    }
  }

  async setTasks(tasks: TaskDto[]): Promise<void> {
    await Preferences.set({ key: 'tasks', value: JSON.stringify(tasks) });
  }

  async getTasks(): Promise<TaskDto[]> {
    const { value } = await Preferences.get({ key: 'tasks' });

    if (!value) {
      return [];
    }
    const tasks: TaskDto[] = JSON.parse(value);

    return tasks.filter(task => task.status === 'pendiente');
  }

  private async fullData() {
    if (this.tasks.length === 0) {
      this.tasks = [
        {
          title: 'Tarea de desarrollo',
          description:
            'Desarrollar una aplicación en Ionic que me permita agregar un listado de tareas e ir tachando mientras se vaya cumpliendo',
          status: 'pendiente',
        },
        {
          title: 'Tarea Análisis',
          description:
            'Análisis del requerimiento',
          status: 'pendiente',
        },
        {
          title: 'Tarea BDD',
          description:
            'Modelo de datos',
          status: 'pendiente',
        },
        {
          title: 'Tarea Diseño',
          description:
            'Revisar los mockups',
          status: 'completada',
        },
        {
          title: 'Tarea Devops',
          description:
            'Subir codigo fuente al repositorio de código',
          status: 'pendiente',
        },
      ];
      await this.setTasks(this.tasks);
    }
  }

  async clearPreferences(): Promise<void> {
    await Preferences.clear();
  }
}
