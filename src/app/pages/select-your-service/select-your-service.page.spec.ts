import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectYourServicePage } from './select-your-service.page';

describe('SelectYourServicePage', () => {
  let component: SelectYourServicePage;
  let fixture: ComponentFixture<SelectYourServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectYourServicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectYourServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
