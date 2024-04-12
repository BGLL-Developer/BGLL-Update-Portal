import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, map } from 'rxjs';
import { convertSnaps } from './db-utilities';
import { lotteryDataModel } from '../DataModels/lotteryData.model';

@Injectable({
  providedIn: 'root',
})
export class LotteryService {
  getAllLotteries(status: string) {
    return this.db
      .collection('/Lottery', (ref) => ref.where('status', '==', status))
      .get()
      .pipe(map((snaps) => convertSnaps<lotteryDataModel>(snaps)));
  }

  constructor(private db: AngularFirestore) {}

  updateLottery(
    lotteryID: string,
    changes: Partial<lotteryDataModel>
  ): Observable<any> {
    return from(this.db.doc('/Lottery/' + lotteryID).update(changes));
  }

  addNewLottery(newLottery: Partial<lotteryDataModel>) {
    let savedLottery$: Observable<any>;

    savedLottery$ = from(this.db.collection('/Lottery').add(newLottery));
    return savedLottery$.pipe(
      map((res) => {
        return {
          id: res.id,
        };
      })
    );
  }

  getLotteryByDate(filterDate: string) {
    return this.db
      .collection('/Lottery', (ref) =>
        ref.where('status', '==', 'active').where('date', '==', filterDate)
      )
      .get()
      .pipe(map((snaps) => convertSnaps<lotteryDataModel>(snaps)));
  }
}
