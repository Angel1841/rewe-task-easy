import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../app/auth/task.service';
import { Task } from '../../core/model/task.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  //styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  tasks$: Observable<Task[]>;
  editTaskId : number | null = null;
  editedTitle = '';
  editedDescription = '';

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.getTasks();
  }

  enableEdit(task: Task) {
    this.editTaskId = task.id;
    this.editedTitle = task.title;
    this.editedDescription = task.description || '';
  }

  saveEdit(task: Task) {
    const updatedTask: Task = {
      ...task,
      title: this.editedTitle,
      description: this.editedDescription,
    };
    this.taskService.updateTask(updatedTask);
    this.editTaskId = null;
  }

  cancelEdit() {
    this.editTaskId = null;
  }
}
