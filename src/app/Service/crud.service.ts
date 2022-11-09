import { Injectable } from '@angular/core';
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import {
  CollectionReference,
  Firestore,
  Query,
  addDoc,
  collection,
  deleteDoc,
  doc,
  orderBy,
  query,
  updateDoc,
  where,
  docData,
  collectionData,
} from '@angular/fire/firestore';
interface user {
  $key: string;
  firstName: string;
  lastName: string;
  email: string;
}

@Injectable({
  providedIn: 'root',
})
export abstract class CRUDService<T> {
  abstract collectionName: string;

  docsRef!: AngularFireList<any>;
  docRef!: AngularFireObject<any>;
  constructor(public db: Firestore) {}
  private get collectionRef(): CollectionReference {
    return collection(this.db, this.collectionName);
  }

  add(obj: T) {
    return addDoc(this.collectionRef, { ...(obj as any) });
  }

  updateUser(id: string, obj: T) {
    const docRef = doc(this.db, this.collectionName, id);
    const newObject: any = { ...obj };
    return updateDoc(docRef, newObject);
  }

  delete(id: string): Promise<void> {
    return deleteDoc(doc(this.db, this.collectionName, id));
  }

  getList() {
    return collectionData(query(collection(this.db, this.collectionName)), {
      idField: 'id',
    });
  }

  get(id: string) {
    const docRef = doc(this.db, this.collectionName, id);

    return docData(docRef, { idField: 'id' });

  }

  getUser(uid: string) {
    const docsRef =  collection(this.db, this.collectionName);
    return collectionData(query(docsRef, where('uid', '==', uid)), {
      idField: 'id'
    });
  }
}
