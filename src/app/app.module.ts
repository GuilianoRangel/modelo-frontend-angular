/* tslint:disable:no-redundant-jsdoc callable-types quotemark */
/* tslint:disable:variable-name */
import ptBr from '@angular/common/locales/pt';
import { ptBrLocale } from 'ngx-bootstrap/locale';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MaterialModule } from './layouts/material.module';
import { BrowserModule } from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import { ToastrModule } from 'ngx-toastr';
import { SecurityModule } from './shared/security/security.module';
import { NgxLoadingModule, ngxLoadingAnimationTypes } from 'ngx-loading';
import {ValidationModule} from './shared/validation/validation.module';
import {AutenticacaoModule} from './pages/autenticacao/autenticacao.module';
import {MessageModule} from './shared/message/message.module';
import {MessageResourceProvider} from './shared/message/message.resource';
import {AppMessage} from './app.message';
import {AppInterceptor} from './app.interceptor';
import {SecurityInterceptor} from './shared/security/security.interceptor';
import { BsDatepickerModule, BsDatepickerConfig, BsLocaleService } from 'ngx-bootstrap/datepicker';
import {registerLocaleData} from '@angular/common';
import {defineLocale} from 'ngx-bootstrap';
import {LoaderModule} from "./shared/loader/loader.module";
import {ValidationResourceProvider} from "./shared/validation/validation.resource";
import {HomeModule} from "./pages/home/home.module";
import {LayoutsModule} from "./layouts/layouts.module";
import {AdministracaoModule} from './pages/administracao/administracao.module';
import {MatPaginatorIntl} from '@angular/material/paginator';
import {getPortuguesePaginatorIntl} from './shared/component/portuguese-paginator-intl';

/**
 * Init Locale Date.
 */
defineLocale('pt', ptBrLocale);
registerLocaleData(ptBr);


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    MessageModule.forRoot(),
    HomeModule,
    AdministracaoModule,
    LayoutsModule,
    AutenticacaoModule,
    ValidationModule,
    LoaderModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    SecurityModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxLoadingModule.forRoot({
      animationType: ngxLoadingAnimationTypes.wanderingCubes,
        backdropBackgroundColour: 'rgba(0,0,0,0.1)',
        backdropBorderRadius: '4px',
        primaryColour: '#ffffff',
        secondaryColour: '#ffffff',
        tertiaryColour: '#ffffff'
    }),
    SecurityModule.forRoot({
      nameStorage: 'portalSSOSecurityStorage',
      loginRouter: '/acesso/login'
    }),
  ],
  providers: [
    {
      provide: MatPaginatorIntl,
      useValue: getPortuguesePaginatorIntl()},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AppInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
    {
      provide: MessageResourceProvider,
      useValue: AppMessage,
    },
    {
      provide: ValidationResourceProvider,
      useValue: AppMessage,
    },
    {
      provide: BsDatepickerConfig,
      useFactory: (): BsDatepickerConfig => {
        return Object.assign(new BsDatepickerConfig(), {
          containerClass: 'theme-blue',
          dateInputFormat: 'DD/MM/YYYY'
        });
      }
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  /**
   * Construtor do Modulo.
   *
   * @param localeService
   */
  constructor(localeService: BsLocaleService) {
    localeService.use('pt');
  }
}
