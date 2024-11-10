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


    async canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Promise<boolean> {


        return await this.verificarAcesso();
    }

    canLoad(route: Route): boolean | Observable<boolean> | Promise<boolean> {
        return this.verificarAcesso();
    }


    async verificarAcesso() {
        const usuario = this.login.getUsuarioLogado();

        if (usuario.perfil == PerfilUsuario.professor || usuario.perfil == PerfilUsuario.admin) {
            return true
        }
        /* return new Observable<boolean>(observer=>{
            this.login.getUsuarioLogado().subscribe(usuario => {
                if (usuario.perfil == PerfilUsuario.professor || usuario.perfil == PerfilUsuario.admin) {
                    observer.next(true);
                }
                this.router.navigate([""]);
                observer.next(false);
            })
        }) */
       return false;
       
    }

}
