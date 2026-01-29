import { TestBed } from '@angular/core/testing';
import { DashboardComponent } from './features/dashboard.component';

describe('App', () => {
  let component: DashboardComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DashboardComponent]
    });
    const fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the dashboard', () => {
    expect(component).toBeTruthy();
  });
});
