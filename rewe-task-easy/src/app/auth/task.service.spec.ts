import { TestBed } from '@angular/core/testing';
import { TaskService } from './task.service';
import { Task } from '../../core/model/task.model';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [TaskService]
    });

    service = TestBed.inject(TaskService);
  });

  it('should add a task', (done) => {
  const task: Task = {
    id: 99,
    title: 'Test task',
    status: 'TO DO'
  };

  service.addTask(task);

  service.getTasks().subscribe(tasks => {
    expect(tasks.length).toBeGreaterThan(0);
    expect(tasks[tasks.length - 1].title).toBe('Test task');
    done();
  });
});


  it('should update a task', (done) => {
    const task: Task = {
      id: 1,
      title: 'Old',
      status: 'TO DO'
    };

    service.addTask(task);
    service.updateTask({ ...task, title: 'New' });

    service.getTasks().subscribe(tasks => {
      expect(tasks[0].title).toBe('New');
      done();
    });
  });
});
