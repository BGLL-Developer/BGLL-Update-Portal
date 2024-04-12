import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { convertSnaps } from './db-utilities';
import { jackpotDataModel } from '../DataModels/jackpotData.model';
import { Observable, from, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JackpotService {
  constructor(private db: AngularFirestore) {}

  getAllJackpots(status: string) {
    return this.db
      .collection('/Jackpot', (ref) => ref.where('status', '==', status))
      .get()
      .pipe(map((snaps) => convertSnaps<jackpotDataModel>(snaps)));
  }

  addJackpot(newJackpot: Partial<jackpotDataModel>) {
    let savedJackpot$: Observable<any>;

    savedJackpot$ = from(this.db.collection('/Jackpot').add(newJackpot));
    return savedJackpot$.pipe(
      map((res) => {
        return {
          id: res.id,
        };
      })
    );
  }

  updateJackpot(
    JackpotID: string,
    changes: Partial<jackpotDataModel>
  ): Observable<any> {
    return from(this.db.doc('/Jackpot/' + JackpotID).update(changes));
  }

  getJackpotByDate(date: string) {
    return this.db
      .collection('/Jackpot', (ref) =>
        ref.where('status', '==', 'active').where('date', '==', date)
      )
      .get()
      .pipe(map((snaps) => convertSnaps<jackpotDataModel>(snaps)));
  }

}
