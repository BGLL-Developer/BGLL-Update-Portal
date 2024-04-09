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


  getBoledo(filterDate: string) {
    return this.db
    .collection('/Boledo', (ref) => ref.where('date', '==', filterDate))
    .get()
    .pipe(map((snaps) => convertSnaps<boledoDataModel>(snaps)));
  }

  getAllBoledoEntries(status: string) {
    return this.db
    .collection('/Boledo', (ref) => ref.where('status', '==', status))
    .get()
    .pipe(map((snaps) => convertSnaps<boledoDataModel>(snaps)));
  }



}
