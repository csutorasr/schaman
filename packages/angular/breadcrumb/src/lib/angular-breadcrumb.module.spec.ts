/* eslint-disable @angular-eslint/component-selector */
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SchamanBreadcrumbModule } from './angular-breadcrumb.module';
import { BreadcrumbOrderService } from './breadcrumb-order.service';

describe('SchamanBreadcrumbModule', () => {
  describe('without separator', () => {
    let component: ModuleTestComponent;
    let fixture: ComponentFixture<ModuleTestComponent>;
    @Component({
      template: `<schaman-breadcrumb></schaman-breadcrumb>
        <test-1>
          <test-2><test-3></test-3></test-2>
        </test-1>`,
    })
    class ModuleTestComponent {}
    @Component({
      template: `<p *schamanBreadcrumb>Test</p>`,
      selector: 'test-1',
      providers: [BreadcrumbOrderService],
    })
    class ModuleTestChild1Component {}
    @Component({
      template: `<p *schamanBreadcrumb>Test1</p>`,
      selector: 'test-2',
      providers: [BreadcrumbOrderService],
    })
    class ModuleTestChild2Component {}
    @Component({
      template: `<p *schamanBreadcrumb>Test2</p>`,
      selector: 'test-3',
      providers: [BreadcrumbOrderService],
    })
    class ModuleTestChild3Component {}

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          ModuleTestComponent,
          ModuleTestChild1Component,
          ModuleTestChild2Component,
          ModuleTestChild3Component,
        ],
        imports: [SchamanBreadcrumbModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(ModuleTestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render the breadcrumb', () => {
      expect(fixture.nativeElement.textContent).toBe('TestTest1Test2');
    });
  });

  describe('with separator', () => {
    let component: ModuleTestComponent;
    let fixture: ComponentFixture<ModuleTestComponent>;
    @Component({
      template: `<schaman-breadcrumb [separator]="sep"></schaman-breadcrumb>
        <ng-template #sep let-i="index">&gt;{{ i }}</ng-template>
        <test-1>
          <test-2><test-3></test-3></test-2>
        </test-1>`,
    })
    class ModuleTestComponent {}
    @Component({
      template: `<p *schamanBreadcrumb>Test</p>`,
      selector: 'test-1',
      providers: [BreadcrumbOrderService],
    })
    class ModuleTestChild1Component {}
    @Component({
      template: `<p *schamanBreadcrumb>Test1</p>`,
      selector: 'test-2',
      providers: [BreadcrumbOrderService],
    })
    class ModuleTestChild2Component {}
    @Component({
      template: `<p *schamanBreadcrumb>Test2</p>`,
      selector: 'test-3',
      providers: [BreadcrumbOrderService],
    })
    class ModuleTestChild3Component {}

    beforeEach(async () => {
      await TestBed.configureTestingModule({
        declarations: [
          ModuleTestComponent,
          ModuleTestChild1Component,
          ModuleTestChild2Component,
          ModuleTestChild3Component,
        ],
        imports: [SchamanBreadcrumbModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(ModuleTestComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render the breadcrumb', () => {
      expect(fixture.nativeElement.textContent).toBe('Test>0Test1>1Test2');
    });
  });
});
