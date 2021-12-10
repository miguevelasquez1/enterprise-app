import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Segment } from '../models/segment';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  sectionsForm: FormGroup;

  sectionsList: AngularFireList<any>;

  public image: string;

  constructor(
    private formBuilder: FormBuilder,
    private aFDb: AngularFireDatabase,
  ) {
    this.buildForm();
    this.image = '';
  }

  private buildForm() {
    this.sectionsForm = this.formBuilder.group({
      $key: [null, []],
      value: ['', []],
      section: this.formBuilder.array([ this.createSection() ])
    });
  }

  public createSection(): FormGroup {
    return this.formBuilder.group({
      value: '',
      services: this.formBuilder.array([  ])
    });
  }

  public getSections() {
    this.sectionsList = this.aFDb.list('sections');
    return this.sectionsList.snapshotChanges();
  }

  get section(): FormArray {
    return this.sectionsForm.get('section') as FormArray;
  }

  public insertSection(sections) {
    return this.sectionsList.push({
      value: sections.value,
      section: sections.section
    });
  }

  public updateSections(sections) {
    return this.sectionsList.update(sections.$key, {
      value: sections.value,
      section: sections.section
    });
  }

  get sectionField() {
    return this.sectionsForm.get('section') as FormArray;
  }

}
