import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../services/project.service';
import { AlertController, NavController } from '@ionic/angular';
import { LoadingsService } from '../services/loadings.service';
import { formatUrl, TASK_API_DELETE, TASK_API_TRANSACTIONS } from '../interface/constants';

@Component({
  selector: 'app-taskedit',
  templateUrl: './taskedit.page.html',
  styleUrls: ['./taskedit.page.scss'],
  standalone: false
})
export class TaskeditPage implements OnInit {

  task: any = {};

  constructor(private route: ActivatedRoute,
              private projectService: ProjectService,
              private routeService: NavController,
              private loadingController: LoadingsService,
              private alertController: AlertController
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params['task']) {
        try {
          const decodedProject = decodeURIComponent(params['task']);
          this.task = JSON.parse(decodedProject);
        } catch (error) {
          console.error('Error al parsear las tareas:', error);
        }
      } else {
        console.error('No se encontró el parámetro "task" en los queryParams.');
      }
    });
  }

  updateProject() {
    const now = new Date();
   const projectData = {
    id: this.task.id,
    titulo: this.task.titulo,
    descripcion: this.task.descripcion,
    estado: this.task.estado,
    fecha_inicio: this.task.fecha_inicio,
    fecha_fin: this.task.fecha_fin,
    fecha_creacion :this.task.fecha_creacion,
    fecha_modificacion : now,
    proyecto_id:this.task.proyecto_id,
    proyecto:""
  };

  this.loadingController.showLoading("Procesando",4000,"circles");

  this.projectService.putData(projectData, TASK_API_TRANSACTIONS)
    .subscribe({
      next: (response) => {
        this.loadingController.showToast("Tarea actualizada exitosamente",3000,"success");
      },
      error: (err) => {
        this.loadingController.showToast("Problemas al intentar actualizar la tarea, intentelo mas tarde",3000,"danger");
        console.error('Error al agregar el proyecto:', err);
      }
    });

    //this.clearFields();
    setTimeout(()=>{
      this.routeService.navigateForward('/task');
      this.loadingController.hideLoading();
    }, 4000);


  }


  async deleteProject(){
    const alert = await this.alertController.create({
      header: 'Confirmación',
      message: '¿Está seguro de que desea eliminar esta tarea?.',
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
            const url = formatUrl(TASK_API_DELETE, this.task.id);
            this.projectService.deleteData(url)
            .subscribe({
                next:(response)=> {
                  this.loadingController.showLoading("Tarea eliminada exitosamente",300,"circles");
                },
                error: (err) => {
                  this.loadingController.showLoading("Tarea eliminada exitosamente",300,"circles");
                  console.error('Error al eliminar la tarea:', err);
                }
            });
          }
        }
      ]
    });

    await alert.present();

    //this.clearFields();
    setTimeout(()=>{
      this.routeService.navigateForward('/task');
      this.loadingController.hideLoading();
    }, 4000);

  }

  cancel(){
    this.routeService.navigateForward("/task");
  }
}
