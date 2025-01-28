import { Component, OnInit } from '@angular/core';
import { NavController } from "@ionic/angular/standalone";
import { TaskDto } from 'src/interface/task';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-detailstask',
  templateUrl: './detailstask.page.html',
  styleUrls: ['./detailstask.page.scss'],
  standalone: false
})
export class DetailstaskPage implements OnInit {

  task: TaskDto | null = null;
  taskTitle: string = '';
  taskDescription: string = '';

  constructor(private navController: NavController,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      const taskParam = params['task'];
      if (taskParam) {
        const parsedTask = JSON.parse(taskParam);
        this.task = this.mapToTaskDto(parsedTask);
        this.taskTitle = this.task.title;
        this.taskDescription = this.task.description;
      }
    });
  }

  private mapToTaskDto(task: any): TaskDto {
    return {
      title: task.title || '',
      description: task.description || '',
      status: task.status || 'pendiente',
    };
  }

  returnTaskList(){
    this.navController.navigateForward(['/tasklist']);
  }
}
