import { bootstrapApplication } from '@angular/platform-browser';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { AuthService } from './app/auth/auth.service';
import { TaskService } from './app/auth/task.service';
import { routes } from './app/app.routes';

//bootstrapApplication(App, appConfig)
//  .catch((err) => console.error(err));


bootstrapApplication(App, {
  providers: [
    provideRouter(routes),
    AuthService,
    TaskService
  ]
})
.catch(err => console.error(err));