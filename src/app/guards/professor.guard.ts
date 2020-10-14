import { Injectable, OnDestroy } from '@angular/core';
import { CanActivate } from '@angular/router';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login-module/login.service';
import { PerfilUsuario } from '../model/enums/perfilUsuario';


@Injectable({
    providedIn: 'root'
})

export class ProfessorGuard implements CanActivate {

    path: ActivatedRouteSnapshot[];
    route: ActivatedRouteSnapshot;

    constructor(
        private router: Router,
        private login: LoginService
    ) { }


    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {


        return this.verificarAcesso();
    }

    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
        return this.verificarAcesso();
    }

    verificarAcesso() {
        let usuario = this.login.getUsuarioLogado();
        if (usuario.perfil == PerfilUsuario.professor || usuario.perfil == PerfilUsuario.admin) {
            return true;
        }
        this.router.navigate([""]);
        return false;
    }

}
