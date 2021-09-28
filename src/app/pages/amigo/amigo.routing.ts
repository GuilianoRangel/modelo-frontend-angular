import {Routes} from '@angular/router';

import {SecurityGuard} from '../../shared/security/security.guard';
import {AmigoResolve} from './shared/amigo-client/amigo.resolve';
import {AmigoFormComponent} from './amigo-form/amigo-form.component';
import {AmigoListComponent} from './amigo-list/amigo-list.component';
import {AmigoListResolve} from './shared/amigo-client/amigo-list.resolve';
import {TipoAmigoListResolve} from '../tipo-amigo/shared/tipo-amigo-client/tipo-amigo-list.resolve';

/**
 * Configurações de rota de Usuário.
 *
 * @author Guiliano Rangel (UEG)
 */
export const AmigoRoutes: Routes = [
  {
    path: 'incluir',
    component: AmigoFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'incluir',
      security: {
        roles: [
          'ROLE_AMIGO_INCLUIR'
        ]
      }
    },
    resolve: {
      tipoAmigos: TipoAmigoListResolve
    }
  },
  {
    path: 'listar',
    component: AmigoListComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      security: {
        roles: [
          'ROLE_AMIGO_PESQUISAR'
        ]
      }
    },
    resolve: {
      tipoAmigos: TipoAmigoListResolve,
      amigos: AmigoListResolve
    }
  },
  {
    path: ':id/alterar',
    component: AmigoFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'alterar',
      security: {
        roles: [
          'ROLE_AMIGO_ALTERAR'
        ]
      }
    },
    resolve: {
      amigo: AmigoResolve,
      tipoAmigos: TipoAmigoListResolve
    }
  },
  {
    path: ':id/visualizar',
    component: AmigoFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'visualizar',
      security: {
        roles: [
          'ROLE_USUARIO_VISUALIZAR'
        ]
      }
    },
    resolve: {
      amigo: AmigoResolve,
      tipoAmigos: TipoAmigoListResolve
    }
  },
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  }
];
