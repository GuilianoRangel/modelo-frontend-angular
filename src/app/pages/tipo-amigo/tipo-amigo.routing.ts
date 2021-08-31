import { Routes } from '@angular/router';

import { SecurityGuard } from '../../shared/security/security.guard';
import { TipoAmigoResolve } from './shared/tipo-amigo-client/tipo-amigo.resolve';
import { TipoAmigoFormComponent } from './tipo-amigo-form/tipo-amigo-form.component';
import { TipoAmigoListComponent } from './tipo-amigo-list/tipo-amigo-list.component';
import {TipoAmigoListResolve} from './shared/tipo-amigo-client/tipo-amigo-list.resolve';

/**
 * Configurações de rota de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
export const TipoAmigoRoutes: Routes = [
  {
    path: 'incluir',
    component: TipoAmigoFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'incluir',
      security: {
        roles: [
          'ROLE_TIPOAMIGO_INCLUIR'
        ]
      }
    },
  },
  {
    path: 'listar',
    component: TipoAmigoListComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      security: {
        roles: [
          'ROLE_TIPOAMIGO_PESQUISAR'
        ]
      }
    },
    resolve: {
      tipoamigos: TipoAmigoListResolve,
    }
  },
  {
    path: ':id/alterar',
    component: TipoAmigoFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'alterar',
      security: {
        roles: [
          'ROLE_TIPOAMIGO_ALTERAR'
        ]
      }
    },
    resolve: {
      tipoAmigo: TipoAmigoResolve,
    }
  },
  {
    path: ':id/visualizar',
    component: TipoAmigoFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'visualizar',
      security: {
        roles: [
          'ROLE_TIPOAMIGO_VISUALIZAR'
        ]
      }
    },
    resolve: {
      tipoAmigo: TipoAmigoResolve
    }
  },
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  }
];
