import { AutenticacaoComponent } from './autenticacao.component';
import { Routes } from '@angular/router';
import {LayoutComponent} from '../../layouts/layout.component';
import {FormRecuperarSenhaComponent} from './form-recuperar-senha/form-recuperar-senha.component';
import {FormAlterarSenhaComponent} from './form-alterar-senha/form-alterar-senha.component';
import {RedefinirSenhaGuard} from './redefinir-senha.guard';

export const AutenticacaoRoutes: Routes = [
  {
    path: 'acesso',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        component: AutenticacaoComponent,
        loadChildren: () => import('./autenticacao.module').then(m => m.AutenticacaoModule)
      },
      {
        path: 'recuperar-senha',
        component: FormRecuperarSenhaComponent,
      },
      {
        path: 'alterar-senha/:token',
        component: FormAlterarSenhaComponent,
        canActivate: [
          RedefinirSenhaGuard
        ]
      },
    ]
  }
  ];

