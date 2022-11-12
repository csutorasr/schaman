import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { BreadcrumbElement } from '../breadcrumb.interface';
import { BreadcrumbService } from '../breadcrumb.service';
import { BreadcrumbComponent } from './breadcrumb.component';

describe('BreadcrumbComponent', () => {
  let component: BreadcrumbComponent;
  let fixture: ComponentFixture<BreadcrumbComponent>;
  const breadcrumbs$ = new BehaviorSubject<BreadcrumbElement[]>([]);

  beforeEach(async () => {
    breadcrumbs$.next([]);
    await TestBed.configureTestingModule({
      declarations: [BreadcrumbComponent],
      providers: [
        {
          provide: BreadcrumbService,
          useValue: {
            breadcrumbs$,
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(BreadcrumbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
