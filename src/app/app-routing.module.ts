
import { Routes, RouterModule } from '@angular/router';
import {HomeRoutes} from './pages/home/home.router';
import { ModuleWithProviders } from '@angular/core';
import {AutenticacaoRoutes} from './pages/autenticacao/autenticacao.routing';
import {AdministracaoRoutes} from './pages/administracao/administracao.routing';

/**
 * Configuração de 'Rotas' do módulo 'Principal' da aplicação.
 *
 * @author Guiliano Rangel (UEG)
 */
export const routes: Routes = [
  ...HomeRoutes,
  ...AutenticacaoRoutes,
  ...AdministracaoRoutes
];

// Exportação das rotas para o contexto da aplicação.
export const AppRoutingModule: ModuleWithProviders = RouterModule.forRoot(routes);
