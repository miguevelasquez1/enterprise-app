import { Injectable } from '@angular/core';
import { AngularFireList } from '@angular/fire/compat/database';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  chatList: AngularFireList<any>;
  chatForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private angularFirestore: AngularFirestore
  ) {
    this.buildForm();
  }

  private buildForm() {
    this.chatForm = this.formBuilder.group ({
      $key: [null, []],
      userUid: [''],
      userName: ['']
    });
  }

  getChat() {
    return this.angularFirestore.collection('chats').snapshotChanges();
  }
}
