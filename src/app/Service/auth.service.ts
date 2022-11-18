import { Injectable } from '@angular/core';
import {
  Auth,
  authState,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from '@angular/fire/auth';
import { UserDataService } from './user.service';
import { from, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private FireAuth: Auth) {}

  currentUser$ = authState(this.FireAuth);
  login(username: string, password: string) {
    return from(signInWithEmailAndPassword(this.FireAuth, username, password));
  }

  signUp(name: string, email: string, password: string) {
    return from(
      createUserWithEmailAndPassword(this.FireAuth, email, password)
    ).pipe(
      switchMap(({ user }) => {
        console.log(user.uid);
        return updateProfile(user, { displayName: name });
      })

    )
  }

  logout() {
    return from(this.FireAuth.signOut());
  }
}
