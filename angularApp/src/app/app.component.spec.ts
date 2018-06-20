import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { DndModule } from 'ng2-dnd';

describe('AppComponent', () => {
  let fixture;
  let app;
  let todoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        DndModule.forRoot()
      ],
      declarations: [
        AppComponent
      ],
      // providers: [TodoDataService]
    });
  });

  beforeEach(async(() => {
    fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    // todoDataService = fixture.debugElement.injector.get(TodoDataService);
  }));

  // it('should move todo at top to bottom', (done: any) => {
  //   addTodo({
  //     id: 1,
  //     title: 'First Todo'
  //   });
  //   addTodo({
  //     id: 2,
  //     title: 'Second Todo'
  //   });
  //   addTodo({
  //     id: 3,
  //     title: 'Third Todo'
  //   });
  //   fixture.detectChanges();
  //   const todoToDragEl = fixture.debugElement.queryAll(By.css('.todo-item'))[0].nativeElement;
  //   const todoToDropEl = fixture.debugElement.queryAll(By.css('.todo-item'))[2].nativeElement;
  //   const handleEl = fixture.debugElement.query(By.css('.handle')).nativeElement;
  //   triggerEvent(handleEl, 'mousedown', 'MouseEvent');
  //   triggerEvent(todoToDragEl, 'dragstart', 'MouseEvent');
  //   triggerEvent(todoToDropEl, 'dragenter', 'MouseEvent');
  //   triggerEvent(handleEl, 'mouseup', 'MouseEvent');
  //   triggerEvent(todoToDragEl, 'drop', 'MouseEvent');
  //   fixture.detectChanges();
  //   expect(app.todos.map(t => t.id)).toEqual([2, 3, 1]);
  //   done();
  // });

  // function addTodo(obj) {
  //   app.newTodo = new Todo(obj);
  //   app.addTodo();
  // }

  function triggerEvent(elem: HTMLElement, eventName: string, eventType: string) {
    const event: Event = document.createEvent(eventType);
    event.initEvent(eventName, true, true);
    elem.dispatchEvent(event);
  }
});
// describe('AppComponent', () => {
//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         AppComponent
//       ],
//     }).compileComponents();
//   }));
//   it('should create the app', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app).toBeTruthy();
//   }));
//   it(`should have as title 'app'`, async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     const app = fixture.debugElement.componentInstance;
//     expect(app.title).toEqual('app');
//   }));
//   it('should render title in a h1 tag', async(() => {
//     const fixture = TestBed.createComponent(AppComponent);
//     fixture.detectChanges();
//     const compiled = fixture.debugElement.nativeElement;
//     expect(compiled.querySelector('h1').textContent).toContain('Welcome to app!');
//   }));
// });
