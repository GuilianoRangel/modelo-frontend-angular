import { Routes } from '@angular/router';
import {SecurityGuard} from '../../shared/security/security.guard';
import {AdministracaoComponent} from './administracao.component';
import {LayoutComponent} from '../../layouts/layout.component';

/**
 * Configuração de 'Rotas' do módulo 'Home'.
 *
 * @author Squadra Tecnologia
 */
export const AdministracaoRoutes: Routes = [
  {
    path: 'administracao',
    component: LayoutComponent,
    canActivate: [
      SecurityGuard
    ],
    data: {
      security: {
        roles: [
          'ROLE_GRUPO_INCLUIR',
          'ROLE_GRUPO_ALTERAR',
          'ROLE_GRUPO_PESQUISAR',
          'ROLE_GRUPO_VISUALIZAR',
          'ROLE_GRUPO_ATIVAR_INATIVAR',
          'ROLE_USUARIO_PESQUISAR',
          'ROLE_USUARIO_INCLUIR',
          'ROLE_USUARIO_VISUALIZAR',
          'ROLE_USUARIO_ATIVAR_INATIVAR',
          'ROLE_USUARIO_VINCULAR_GRUPO',
          'ROLE_AUDITORIA_PESQUISAR',
          'ROLE_PORTAL_AUDITORIA_EXPORTAR'
        ]
      }
    },
    children: [
      {
        path: '',
        component: AdministracaoComponent
      },
      {
        path: 'grupo',  loadChildren: () => import('../grupo/grupo.module').then(m => m.GrupoModule)
      },
      {
        path: 'usuario', loadChildren: () => import('./../usuario/usuario.module').then(m => m.UsuarioModule)
      },
      {
        path: 'audit', loadChildren: () => import('../auditoria/audit.module').then(m => m.AuditModule)
      }
    ]
  }
];
