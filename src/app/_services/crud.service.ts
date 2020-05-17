import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CrudService {
  constructor(private firestore: AngularFirestore) {}

  create_NewTask(record) {
    return this.firestore.collection('Tasks').add(record);
  }

  read_Tasks(limitNumber: number) {
    return this.firestore
      .collection('Tasks', (ref) =>
        ref.orderBy('scheduledDate', 'desc').limit(limitNumber)
      )
      .snapshotChanges();
  }

  update_Task(recordID, record) {
    this.firestore.doc('Tasks/' + recordID).update(record);
  }

  delete_Task(record_id) {
    this.firestore.doc('Tasks/' + record_id).delete();
  }

  create_NewState(record) {
    return this.firestore.collection('States').add(record);
  }

  read_State() {
    return this.firestore.collection('States').snapshotChanges();
  }

  update_State(recordID, record) {
    this.firestore.doc('States/' + recordID).update(record);
  }

  delete_State(record_id) {
    this.firestore.doc('States/' + record_id).delete();
  }
}
