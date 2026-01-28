import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Task } from '../../core/model/task.model';

@Injectable({ providedIn: 'root' })
export class TaskService {

  private tasksSubject = new BehaviorSubject<Task[]>([]);

  constructor() {
    const savedTasks = localStorage.getItem('tasks');

    if (savedTasks) {
      this.tasksSubject.next(JSON.parse(savedTasks) as Task[]);
    } else {
        const demoTasks: Task[] = [
      {
        id: 1,
        title: 'Setup project',
        description: 'Create Angular project',
        status: 'TO DO',
      },
      {
        id: 2,
        title: 'Login feature',
        description: 'Implement auth',
        status: 'IN PROGRESS',
      },
      {
        id: 3,
        title: 'Dashboard',
        description: 'Show tasks',
        status: 'DONE',
      },
    ];

    localStorage.setItem('tasks', JSON.stringify(demoTasks));
    this.tasksSubject.next(demoTasks);
    }
  }

  getTasks(): Observable<Task[]> {
    return this.tasksSubject.asObservable();
  }

  addTask(task: Task): void {
    const updatedTasks = [...this.tasksSubject.value, task];
    this.save(updatedTasks);
  }

  updateTask(task: Task): void {
    const updatedTasks = this.tasksSubject.value.map(t =>
      t.id === task.id ? task : t
    );
    this.save(updatedTasks);
  }

  private save(tasks: Task[]): void {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    this.tasksSubject.next(tasks);
  }
}
