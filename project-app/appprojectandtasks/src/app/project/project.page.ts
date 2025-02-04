import { NavController } from '@ionic/angular';
import { GenericsService } from './../services/generics.service';
import { Component, OnInit } from '@angular/core';
import { ProjectService } from '../services/project.service';
import { LoadingsService } from '../services/loadings.service';
import { PROJECTS_API } from '../interface/constants';
import { Project } from '../interface/projectDto';

@Component({
  selector: 'app-project',
  templateUrl: './project.page.html',
  styleUrls: ['./project.page.scss'],
  standalone: false,
})
export class ProjectPage implements OnInit {

  projects: Project[] = [];
  enDesarrollo: Project[] = [];
  finalizado: Project[] = [];
  bloqueado: Project[] = [];
  cancelado: Project[] = [];

  constructor(private projectService: ProjectService,
              private loadingService: LoadingsService,
              private navController: NavController,
  ) { }

  ngOnInit() {
    this.loadData();
  }

  addProject(){
    this.navController.navigateForward("/actionsproject");
  }


  loadData(){
    this.loadingService.showLoading("Cargando proyectos...",3000,"circles");

    this.projectService.getData(PROJECTS_API)
    .subscribe({
      next: (data: Project[]) => {
        this.projects = data;
        this.enDesarrollo = this.projects.filter(project => project.estado === 'En desarrollo');
        this.finalizado = this.projects.filter(project => project.estado === 'Finalizado');
        this.bloqueado = this.projects.filter(project => project.estado === 'Bloqueado');
        this.cancelado = this.projects.filter(project => project.estado === 'Cancelado');
      },
      error: (err) => {
       this.loadingService.showToast('Error al cargar proyectos:',4000,'danger');
      }
    });
    this.loadingService.hideLoading();
  }

  editProject(project: Project) {
    const data = JSON.stringify(project); // Serializamos el objeto como JSON
    const encodedData = encodeURIComponent(data); // Codificamos la cadena JSON

    // Navegamos con queryParams correctamente estructurados
    this.navController.navigateForward('/actionsprojecteditproject', {
      queryParams: { project: encodedData } // Usamos la opción queryParams
    });
  }

  gotoHome(){
    this.navController.navigateForward("/home");
  }
}
