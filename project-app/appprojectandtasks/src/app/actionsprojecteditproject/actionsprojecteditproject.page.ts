import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../interface/projectDto';
import { GenericsService } from '../services/generics.service';
import { ProjectService } from '../services/project.service';
import { formatUrl, PROJECTS_API, PROJECTS_API_DELETE } from '../interface/constants';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { LoadingsService } from '../services/loadings.service';

@Component({
  selector: 'app-actionsprojecteditproject',
  templateUrl: './actionsprojecteditproject.page.html',
  styleUrls: ['./actionsprojecteditproject.page.scss'],
  standalone: false,
})
export class ActionsprojecteditprojectPage implements OnInit {

  project: any = {};

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private routeService: NavController,
              private loadingController: LoadingsService,
              private alertController: AlertController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['project']) {
        try {
          const decodedProject = decodeURIComponent(params['project']);
          this.project = JSON.parse(decodedProject);
        } catch (error) {
          console.error('Error al parsear el proyecto:', error);
        }
      } else {
        console.error('No se encontró el parámetro "project" en los queryParams.');
      }
    });
  }

  updateProject() {
    const now = new Date();
   const projectData = {
    id: this.project.id,
    nombre: this.project.nombre,
    descripcion: this.project.descripcion,
    estado: this.project.estado,
    fecha_inicio: this.project.fecha_inicio,
    fecha_fin: this.project.fecha_fin,
    fecha_creacion :this.project.fecha_creacion,
    fecha_modificacion : now
  };

  this.loadingController.showLoading("Procesando",4000,"circles");

  this.projectService.putData(projectData, PROJECTS_API)
    .subscribe({
      next: (response) => {
        this.loadingController.showToast("Proyecto actualizado exitosamente",3000,"success");
      },
      error: (err) => {
        this.loadingController.showToast("Problemas al intentar actualizar el proyecto, intentelo mas tarde",3000,"danger");
        console.error('Error al agregar el proyecto:', err);
      }
    });

    //this.clearFields();
    setTimeout(()=>{
      this.routeService.navigateForward('/project');
      this.loadingController.hideLoading();
    }, 4000);


  }


  async deleteProject(){
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Está seguro de que desea eliminar este proyecto? También se eliminarán las tareas asociadas.',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Eliminación cancelada');
          }
        },
        {
          text: 'Eliminar',
          handler: () => {
            const url = formatUrl(PROJECTS_API_DELETE, this.project.id);
            this.projectService.deleteData(url)
            .subscribe({
                next:(response)=> {
                  this.loadingController.showLoading("Proyecto eliminado exitosamente",300,"circles");
                },
                error: (err) => {
                  this.loadingController.showToast("Problemas al eliminar el proyecto, intentelo mas tarde",3000,"danger");
                  console.error('Error al eliminar el proyecto:', err);
                }
            });
          }
        }
      ]
    });

    await alert.present();

    //this.clearFields();
    setTimeout(()=>{
      this.routeService.navigateForward('/project');
      this.loadingController.hideLoading();
    }, 4000);

  }

  cancel(){
    this.routeService.navigateForward("/project");
  }

  gotoTask(){
    this.routeService.navigateForward("/task", {
     queryParams: {idProject: this.project.id, project: this.project.nombre}
    });
  }
}
