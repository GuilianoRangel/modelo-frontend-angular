import { AutenticacaoComponent } from './autenticacao.component';
import { Routes } from '@angular/router';
import {LayoutComponent} from '../../layouts/layout.component';

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
      }
    ]
  }
  ];

