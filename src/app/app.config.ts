import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBTMrLBvBniX58bDBQgWuUtuU-SAu1qIxs',
  authDomain: 'bgll-update-portal-35881.firebaseapp.com',
  projectId: 'bgll-update-portal-35881',
  storageBucket: 'bgll-update-portal-35881.appspot.com',
  messagingSenderId: '830618333350',
  appId: '1:830618333350:web:aac03c9599d5d0acf80467',
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    importProvidersFrom([
      AngularFireModule.initializeApp(firebaseConfig),
      AngularFireAuthModule,
      AngularFirestoreModule,
      AngularFirestore,
    ]),
  ],
};
