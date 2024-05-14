import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from, map } from 'rxjs';
import { convertSnaps } from './db-utilities';
import { agentDataModel } from '../DataModels/agentData.model';

@Injectable({
  providedIn: 'root',
})
export class AgentService {
  
  
  constructor(private db: AngularFirestore) {}

  getAllAgents(status: string) {
    return this.db
      .collection('/Agents', (ref) => ref.where('status', '==', status))
      .get()
      .pipe(map((snaps) => convertSnaps<agentDataModel>(snaps)));
  }

  addAgent(newAgent: Partial<agentDataModel>) {
    let savedAgent$: Observable<any>;

    savedAgent$ = from(this.db.collection('/Agents').add(newAgent));
    return savedAgent$.pipe(
      map((res) => {
        return {
          id: res.id,
        };
      })
    );
  }

  updateAgent(
    agentID: string,
    changes: Partial<agentDataModel>
  ): Observable<any> {
    return from(this.db.doc('/Agents/' + agentID).update(changes));
  }

  getAgentByDistrict(district: string) {
    return this.db
      .collection('/Agents', (ref) =>
        ref.where('status', '==', 'active').where('district', '==', district)
      )
      .get()
      .pipe(map((snaps) => convertSnaps<agentDataModel>(snaps)));
  }

}

