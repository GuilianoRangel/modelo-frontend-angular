/* tslint:disable:no-redundant-jsdoc */
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

import { MessageService } from 'src/app/shared/message/message.service';
import { TipoAmigoClientService } from './tipo-amigo-client.service';
import {FiltroTipoAmigoDTO} from '../../../../shared/dto/filtro-tipo-amigo.dto';

/**
 * Classe resolve responsável pela busca das informações de Usuário conforme o id.
 *
 * @author Squadra Tecnologia
 */
@Injectable()
export class TipoAmigoListResolve implements Resolve<any> {

  /**
   * Construtor da classe.
   *
   * @param router
   * @param usuarioClientService
   * @param messageService
   */
  constructor(
    private router: Router,
    private usuarioClientService: TipoAmigoClientService,
    private messageService: MessageService
  ) { }

  /**
   * Realiza a consulta por id de Usuário.
   *
   * @param route
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.params.id;

    return new Observable(observer => {
      const filtro: FiltroTipoAmigoDTO = new FiltroTipoAmigoDTO();
      filtro.nome = '%%%%';
      this.usuarioClientService.getByFiltro(filtro).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        },
        error => {
          if (error.status === 404) {
            observer.next();
            observer.complete();
          } else {
            observer.error(error);
            this.router.navigate(['']);
            this.messageService.addMsgDanger(error);
          }
        }
      );
    });
  }
}
