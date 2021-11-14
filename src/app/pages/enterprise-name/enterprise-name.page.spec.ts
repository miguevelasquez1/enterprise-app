import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnterpriseNamePage } from './enterprise-name.page';

describe('EnterpriseNamePage', () => {
  let component: EnterpriseNamePage;
  let fixture: ComponentFixture<EnterpriseNamePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterpriseNamePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnterpriseNamePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
