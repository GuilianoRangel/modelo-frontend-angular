import { ListAuditoriaComponent } from './list-auditoria/list-auditoria.component';
import { SecurityGuard } from '../../shared/security/security.guard';

import {  Routes } from '@angular/router';
import { AuditoriaFormComponent } from './auditoria-form/auditoria-form.component';
import {AuditoriaResolve} from './shared/auditoria.resolve';

/**
 * Configurações de rota de Grupo.
 *
 * @author Guiliano Rangel (UEG)
 */
export const AuditoriaRoutes: Routes = [
  {
    path: 'listar',
    component: ListAuditoriaComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      security: {
        roles: [
          'ROLE_AUDITORIA_PESQUISAR'
        ]
      }
    },
    resolve: {
      //sistemas: SistemaAtivoResolve
    }
  },
  {
    path: ':id/:idAudit/:idEntidade/visualizar',
    component: AuditoriaFormComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      acao: 'visualizar',
      security: {
        roles: [
          'ROLE_AUDITORIA_VISUALIZAR'
        ]
      }
    },
    resolve: {
      logAuditoria: AuditoriaResolve,
    }
  },
  {
    path: '',
    redirectTo: 'listar',
    pathMatch: 'full'
  }
];
