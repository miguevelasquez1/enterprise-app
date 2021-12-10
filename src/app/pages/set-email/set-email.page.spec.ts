import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SetEmailPage } from './set-email.page';

describe('SetEmailPage', () => {
  let component: SetEmailPage;
  let fixture: ComponentFixture<SetEmailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetEmailPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SetEmailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
