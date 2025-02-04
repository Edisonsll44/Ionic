import { Component, OnInit } from '@angular/core';
import { GenericsService } from '../services/generics.service';
import { ProjectService } from '../services/project.service';
import { LoadingsService } from '../services/loadings.service';
import { PROJECTS_API, TASK_API_TRANSACTIONS } from '../interface/constants';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-taskcreate',
  templateUrl: './taskcreate.page.html',
  styleUrls: ['./taskcreate.page.scss'],
  standalone: false
})
export class TaskcreatePage implements OnInit {

    titulo: string = '';
    descripcion: string = '';
    estado: string = '';
    fecha_inicio: string = '';
    fecha_fin: string = '';
    proyecto_id:Number=0;
    minFecha: string = new Date().toISOString();
    idProject: Number =0;
    project: string="";

    constructor(
      private rootService: GenericsService,
      private projectService: ProjectService,
      private loadingController: LoadingsService,
      private route: ActivatedRoute
    ) { }

    ngOnInit() {
      this.route.queryParams.subscribe(params => {
        if (params['idProject']) {
          try {
            const decodedProject = decodeURIComponent(params['idProject']);
            const decodedName = decodeURIComponent(params['project']);

            this.idProject = JSON.parse(decodedProject);
            this.project = decodedName;
          } catch (error) {
            console.error('Error al parsear el proyecto:', error);
          }
        } else {
          console.error('No se encontró el parámetro "project" en los queryParams.');
        }
      });

    }


    saveProject() {
      const now = new Date();

      if (this.titulo && this.descripcion && this.estado && this.fecha_inicio && this.fecha_fin) {
        const taskData = {
          id:0,
          proyecto_id:this.idProject,
          titulo: this.titulo,
          descripcion: this.descripcion,
          estado: this.estado,
          fecha_inicio: this.fecha_inicio,
          fecha_fin: this.fecha_fin,
          fecha_creacion :now,
          fecha_modificacion : now,
          nombre:""
        };

        this.loadingController.showLoading("Procesando",4000,"circles");

        this.projectService.postData(taskData, TASK_API_TRANSACTIONS)
          .subscribe({
            next: (response) => {
              this.loadingController.showToast("Nueva tarea agregada exitosamente",3000,"success");
            },
            error: (err) => {
              this.loadingController.showToast("Problemas al intentar crear la nueva tarea, intentelo mas tarde",3000,"danger");
            }
          });
      } else {
        this.loadingController.showToast("Todos los campos son requeridos",3000,"danger");
      }
      this.clearFields();
      setTimeout(()=>{
        this.rootService.navigateTo('/task');
        this.loadingController.hideLoading();
      }, 4000);

    }

    clearFields(){
      this.titulo = '';
      this.descripcion = '';
      this.estado = '';
      this.fecha_inicio = '';
      this.fecha_fin = '';
    }

    // Método para cancelar la operación
    cancel() {
      this.rootService.navigateTo('/task');
    }
  }
