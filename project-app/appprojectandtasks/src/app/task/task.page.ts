import { Component, OnInit } from '@angular/core';
import { TaskDto } from '../interface/taskDto';
import { ProjectService } from '../services/project.service';
import { LoadingsService } from '../services/loadings.service';
import { NavController } from '@ionic/angular';
import { filter_pr, formatUrl, TASK_API } from '../interface/constants';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-task',
  templateUrl: './task.page.html',
  styleUrls: ['./task.page.scss'],
  standalone: false,
})
export class TaskPage implements OnInit {

  tasks: TaskDto[] = [];
  enDesarrollo: TaskDto[] = [];
  finalizado: TaskDto[] = [];
  bloqueado: TaskDto[] = [];
  cancelado: TaskDto[] = [];
  creado:TaskDto[] = [];
  idProject: Number = 0;
  project: string="";

  constructor(private projectService: ProjectService,
              private loadingService: LoadingsService,
              private navController: NavController,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['idProject']) {
        try {
          const decodedProject = decodeURIComponent(params['idProject']);
          const project = decodeURIComponent(params['project']);

          this.idProject = JSON.parse(decodedProject);
          this.project = project;
        } catch (error) {
          console.error('Error al parsear el proyecto:', error);
        }
      } else {
        console.error('No se encontró el parámetro "project" en los queryParams.');
      }
    });
    this.loadData();
  }

  addTask(){
    this.navController.navigateForward("/taskcreate",{
      queryParams: {idProject: this.idProject}
    });
  }




  loadData(){
    this.loadingService.showLoading("Cargando tareas...",3000,"circles");
    const url = formatUrl(TASK_API,filter_pr,this.idProject);
    this.projectService.getData(url)
    .subscribe({
      next: (data: TaskDto[]) => {
        this.tasks = data;
        this.enDesarrollo = this.tasks.filter(t => t.estado === 'En desarrollo');
        this.finalizado = this.tasks.filter(t => t.estado === 'Finalizado');
        this.bloqueado = this.tasks.filter(t => t.estado === 'Bloqueado');
        this.cancelado = this.tasks.filter(t => t.estado === 'Cancelado');
        this.creado = this.tasks.filter(t => t.estado === 'Creado');

      },
      error: (err) => {
       this.loadingService.showToast('No existen tareas asignadas aún.',4000,'warning');
      }
    });
    this.loadingService.hideLoading();
  }

  editProject(task: TaskDto) {
    const data = JSON.stringify(task);
    const encodedData = encodeURIComponent(data);

    this.navController.navigateForward('/taskedit', {
      queryParams: { task: encodedData }
    });
  }

  gotoHome(){
    this.navController.navigateBack("/project");
  }
}
