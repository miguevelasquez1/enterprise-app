import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ShowImagesPage } from './show-images.page';

describe('ShowImagesPage', () => {
  let component: ShowImagesPage;
  let fixture: ComponentFixture<ShowImagesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowImagesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ShowImagesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
