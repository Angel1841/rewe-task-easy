import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

import { User } from '../../core/model/user.model';
import { USERS } from '../../core/constants/users.constants';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);

  constructor() {
    const savedUser = localStorage.getItem('user');

    if (savedUser) {
      this.userSubject.next(JSON.parse(savedUser) as User);
    }
  }

  login(username: string, password: string): Observable<boolean> {
    const foundUser = USERS.find(user => user.username === username && user.password === password);

    if (!foundUser) {
      return of(false);
    }

    localStorage.setItem('user', JSON.stringify(foundUser));
    this.userSubject.next(foundUser);

    return of(true);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.userSubject.next(null);
  }

  getUser(): Observable<User | null> {
    return this.userSubject.asObservable();
  }
}
