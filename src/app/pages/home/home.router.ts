import { Routes } from '@angular/router';
import {SecurityGuard} from '../../shared/security/security.guard';
import {LayoutComponent} from '../../layouts/layout.component';
import {GrupoUsuarioClientResolve} from '../../shared/services/grupo-usuario-client/grupo-usuario-client.resolve';
import {HomeComponent} from './home.component';

/**
 * Configuração de 'Rotas' do módulo 'Home'.
 *
 * @author Guiliano Rangel (UEG)
 */
export const HomeRoutes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [
      SecurityGuard
    ],
    children: [
      {
        path: '',
        component: HomeComponent,
        canActivate: [
          SecurityGuard
        ],
        resolve: {
          // sistemas: SistemaAcessoUsuarioResolve,
          grupos: GrupoUsuarioClientResolve,
        }
      },
    ]
  }
];
