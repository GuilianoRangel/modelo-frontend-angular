import { Observable } from 'rxjs';
import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';


import { AutenticacaoService } from './autenticacao.service';
import { map } from 'rxjs/operators';

/**
 * Implementação que verifica se o usuário tem acesso as rotas de alteração de senha.
 *
 * @author Guiliano Rangel (UEG)
 */
@Injectable()
export class RedefinirSenhaGuard implements CanActivate {

    /**
     * Construtor da classe.
     *
     * @param router -
     * @param authService -
     * @param config -
     */
    constructor(private router: Router, private authService: AutenticacaoService) { }

    /**
     * Inercepta a rota e verifica se a mesma poderá ou não ser apresentada.
     *
     * @param next -
     * @param state -
     */
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const token  = next.params.token;
        return this.authService.validarSolicitacaoSenha(token).pipe(map((valido: boolean) => {
                if (!valido) {
                    this.router.navigate(['/login']);
                }
                return valido;
            }
        ));
    }

}
