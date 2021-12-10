import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PutYourPhonePage } from './put-your-phone.page';

describe('PutYourPhonePage', () => {
  let component: PutYourPhonePage;
  let fixture: ComponentFixture<PutYourPhonePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PutYourPhonePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PutYourPhonePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
