import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TypeAPasswordPage } from './type-a-password.page';

describe('TypeAPasswordPage', () => {
  let component: TypeAPasswordPage;
  let fixture: ComponentFixture<TypeAPasswordPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeAPasswordPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TypeAPasswordPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
