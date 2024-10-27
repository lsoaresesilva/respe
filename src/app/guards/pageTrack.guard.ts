import { Injectable, OnDestroy } from '@angular/core';

import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login-module/login.service';
import PageTrackRecord from '../model/analytics/pageTrack';
import Turma from '../model/turma';

@Injectable({
  providedIn: 'root',
})
export class PageTrack  {
  path: ActivatedRouteSnapshot[];
  route: ActivatedRouteSnapshot;

  constructor(private router: Router, private login: LoginService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    const pageTrack = new PageTrackRecord(null, route.url[0].path, this.login.getUsuarioLogado());
    pageTrack.save().subscribe(() => {});

    return true;
  }
}
