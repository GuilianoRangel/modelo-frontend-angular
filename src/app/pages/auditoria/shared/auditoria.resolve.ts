/* tslint:disable:no-redundant-jsdoc */
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';

import { MessageService } from 'src/app/shared/message/message.service';
import {AuditoriaService} from './auditoria.service';

/**
 * Classe resolve responsável pela busca das informações da grupo conforme o id.
 *
 * @author Guiliano Rangel (UEG)
 */
@Injectable()
export class AuditoriaResolve implements Resolve<any> {

  /**
   * Construtor da classe.
   *
   * @param router
   * @param auditoriaService
   * @param messageService
   */
  constructor(
    private router: Router,
    private auditoriaService: AuditoriaService,
    private messageService: MessageService
  ) { }

  /**
   * Realiza a consulta por id de grupo.
   *
   * @param route
   */
  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const id = route.params.id;
    const idAudit = route.params.idAudit;
    const idEntidade = route.params.idEntidade;

    return new Observable(observer => {
      this.auditoriaService.getAuditoria(id, idAudit, idEntidade).subscribe(
        data => {
          observer.next(data);
          observer.complete();
        },
        error => {
          observer.error(error);
          this.router.navigate(['']);
          this.messageService.addMsgDanger(error);
        }
      );
    });
  }
}
