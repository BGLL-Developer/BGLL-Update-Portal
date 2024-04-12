import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, map } from 'rxjs';
import { convertSnaps } from './db-utilities';
import { boledoDataModel } from '../DataModels/boledoData.model';

@Injectable({
  providedIn: 'root',
})
export class BoledoService {
  constructor(private db: AngularFirestore) {}

  updateBoledoEntry(
    boledoID: string,
    changes: Partial<boledoDataModel>
  ): Observable<any> {
    return from(this.db.doc('/Boledo/' + boledoID).update(changes));
  }

  getBoledoByDate(filterDate: string) {
    return this.db
      .collection('/Boledo', (ref) =>
        ref.where('status', '==', 'active').where('date', '==', filterDate)
      )
      .get()
      .pipe(map((snaps) => convertSnaps<boledoDataModel>(snaps)));
  }

  getAllBoledo(status: string) {
    return this.db
      .collection('/Boledo', (ref) => ref.where('status', '==', status))
      .get()
      .pipe(map((snaps) => convertSnaps<boledoDataModel>(snaps)));
  }

  addNewBoledo(newBoledoEntry: Partial<boledoDataModel>) {
    let savedBoledo$: Observable<any>;

    savedBoledo$ = from(this.db.collection('/Boledo').add(newBoledoEntry));
    return savedBoledo$.pipe(
      map((res) => {
        return {
          id: res.id,
        };
      })
    );
  }
}
