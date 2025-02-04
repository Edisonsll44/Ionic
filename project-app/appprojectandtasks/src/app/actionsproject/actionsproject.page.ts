import { Component, OnInit } from '@angular/core';
import { GenericsService } from '../services/generics.service';
import { ProjectService } from '../services/project.service';
import { PROJECTS_API } from '../interface/constants';
import { LoadingsService } from '../services/loadings.service';

@Component({
  selector: 'app-actionsproject',
  templateUrl: './actionsproject.page.html',
  styleUrls: ['./actionsproject.page.scss'],
  standalone: false,
})
export class ActionsprojectPage implements OnInit {

  nombre: string = '';
  descripcion: string = '';
  estado: string = '';
  fecha_inicio: string = '';
  fecha_fin: string = '';

  minFecha: string = new Date().toISOString();

  constructor(
    private rootService: GenericsService,
    private projectService: ProjectService,
    private loadingController: LoadingsService
  ) { }

  ngOnInit() {

  }


  saveProject() {
    const now = new Date();

    if (this.nombre && this.descripcion && this.estado && this.fecha_inicio && this.fecha_fin) {
      const projectData = {
        nombre: this.nombre,
        descripcion: this.descripcion,
        estado: this.estado,
        fecha_inicio: this.fecha_inicio,
        fecha_fin: this.fecha_fin,
        fecha_creacion :now,
        fecha_modificacion : now
      };

      this.loadingController.showLoading("Procesando",4000,"circles");

      this.projectService.postData(projectData, PROJECTS_API)
        .subscribe({
          next: (response) => {
            this.loadingController.showToast("Nuevo proyecto agregado exitosamente",3000,"success");
            console.log("Nuevo proyecto agregado:", response);
          },
          error: (err) => {
            this.loadingController.showToast("Problemas al intentar crear el proyecto, intentelo mas tarde",3000,"danger");
            console.error('Error al agregar el proyecto:', err);
          }
        });
    } else {
      this.loadingController.showToast("Todos los campos son requeridos",3000,"danger");
      console.log('Todos los campos son requeridos.');
    }
    this.clearFields();
    setTimeout(()=>{
      this.rootService.navigateTo('/project');
      this.loadingController.hideLoading();
    }, 4000);

  }

  clearFields(){
    this.nombre = '';
    this.descripcion = '';
    this.estado = '';
    this.fecha_inicio = '';
    this.fecha_fin = '';
  }

  // Método para cancelar la operación
  cancel() {
    this.rootService.navigateTo('/project');
  }
}
