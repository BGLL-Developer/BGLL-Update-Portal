import { Injectable, inject, signal } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  user,
  sendPasswordResetEmail
} from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { UserInterface } from '../DataModels/userLoginData.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: AngularFireAuth) {}
  firebaseAuth = inject(Auth);

  user$ = user(this.firebaseAuth);
  currentUserSig = signal<UserInterface | null | undefined>(undefined);

  login(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(
      this.firebaseAuth,
      email,
      password
    ).then(() => {});
    return from(promise);
  }

  logout(): Observable<void> {
    const promise = signOut(this.firebaseAuth);
    return from(promise);
  }

  resetPassword(email: string) {
    sendPasswordResetEmail(this.firebaseAuth, email);
  }

  
}
