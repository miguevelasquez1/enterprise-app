import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChangeNameModalPage } from './change-name-modal.page';

describe('ChangeNameModalPage', () => {
  let component: ChangeNameModalPage;
  let fixture: ComponentFixture<ChangeNameModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeNameModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChangeNameModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
