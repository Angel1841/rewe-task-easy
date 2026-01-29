import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../app/auth/task.service';
import { Task } from '../../core/model/task.model';
import { Observable } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule, MatCardModule, MatInputModule, MatButtonModule, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  tasks$: Observable<Task[]>;
  editTaskId : number | null = null;
  editedTitle = '';
  editedDescription = '';
  newTaskTitle = '';
  newTaskDescription = '';
  newTaskStatus: Task['status'] = 'TO DO';

  constructor(private taskService: TaskService, private authService: AuthService,
    private router: Router) {
    this.tasks$ = this.taskService.getTasks();
  }

  addTask() {
  if (!this.newTaskTitle.trim()) {
    alert('Task title is required');
    return;
  }
  
  const tasks = this.tasksSubjectValue(); 
  const newId = tasks.length ? Math.max(...tasks.map(t => t.id)) + 1 : 1;

  const newTask: Task = {
    id: newId,
    title: this.newTaskTitle,
    description: this.newTaskDescription,
    status: this.newTaskStatus
  };

  this.taskService.addTask(newTask);

  this.newTaskTitle = '';
  this.newTaskDescription = '';
  this.newTaskStatus = 'TO DO';
}

tasksSubjectValue(): Task[] {
  let currentTasks: Task[] = [];
  this.tasks$.subscribe(tasks => currentTasks = tasks).unsubscribe();
  return currentTasks;
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
  filterByStatus(tasks: Task[] | null, status: Task['status']): Task[] {
  if (!tasks) return []; 
  return tasks.filter(t => t.status === status);
}

  moveTask(task: Task, newStatus: Task['status']) {
  const updatedTask: Task = { ...task, status: newStatus };
  this.taskService.updateTask(updatedTask);
}
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

}
