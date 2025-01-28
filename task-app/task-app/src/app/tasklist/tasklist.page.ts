import { LoadingService } from './../services/loading.service';
import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { NavController } from '@ionic/angular';
import { TaskDto } from 'src/interface/task';


@Component({
  selector: 'app-tasklist',
  templateUrl: './tasklist.page.html',
  styleUrls: ['./tasklist.page.scss'],
  standalone: false
})
export class TasklistPage implements OnInit {

  tasks: { title: string; description: string; status: string }[] = [];
  filteredTasks: { title: string; description: string; status: string }[] = [];
  isInteracting: boolean = false;
  isLoading: boolean = true;

  constructor(private taskService: TaskService,
              private navController: NavController,
              private loadingService: LoadingService
  ) {}

  async ngOnInit() {
    await this.loadTasks();
  }

  async ionViewWillEnter() {
    this.isLoading = true;
    await this.loadingService.showLoading('Cargando tareas...', 5000);
    setTimeout( () => {

      this.loadTasks()
      this.isLoading = false;
    }, 5000);
  }


  async changeTaskStatus(event: Event, task: any) {
    event.stopPropagation();
    event.preventDefault();
    const shouldDelete = await this.showDeleteConfirmation(task);
    this.isLoading = true;
    if (shouldDelete) {
      this.deleteTask(task);
      this.loadingService.showLoading("Tarea finalizada exitosamente", 3000)
      setTimeout(() => {
        this.loadTasks()
        this.isLoading = false;
      }, 2000);
    }
  }

  addTask(){
    this.navController.navigateForward(["/actionstask"],
      {
        queryParams: { mode: 'add' },
      }
    );
  }

  async filterTasks(event: any){
    const searchText = event.target.value.toLowerCase();
    this.filteredTasks = this.tasks.filter(task =>
      task.title.toLowerCase().includes(searchText) ||
      task.description.toLowerCase().includes(searchText)
    );

    if (this.filteredTasks.length === 0) {
     this.loadingService.showToster("No se encontraron tareas.", 3000);
    }
  }

  editTask(event: Event, task:any){
    event.stopPropagation();
    event.preventDefault();

    this.navController.navigateForward(["/actionstask"],
      {
        queryParams: { mode: 'edit', task: JSON.stringify(task)},
    });
  }

  private async loadTasks() {
    this.isLoading = true;

    await this.loadingService.showLoading('Cargando tareas...', 5000);
    this.tasks = await this.taskService.getTasks();
    this.filteredTasks = [...this.tasks];
    await this.loadingService.hideLoading();
  }

  async reloadTasks(){
    await this.loadTasks();
    this.isLoading = false;
  }

  private async showDeleteConfirmation(task: TaskDto): Promise<boolean> {
    const alert = await this.loadingService.showAlert(
      'Confirmar acción',
      `¿Estás seguro de que quieres eliminar la tarea: ${task.title}?`
    );

    return alert;
  }

  private deleteTask(task: TaskDto) {
    this.tasks = this.tasks.filter(t => t !== task);
    this.filteredTasks = this.filteredTasks.filter(t => t !== task);
    this.taskService.setTasks(this.tasks);
  }


  handleItemClick(event: Event) {
    if ((event.target as HTMLElement).tagName === 'ION-BUTTON' || (event.target as HTMLElement).tagName === 'ION-CHECKBOX') {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  preventNavigation(event: Event) {
    event.stopPropagation();
    event.preventDefault();
  }

}
