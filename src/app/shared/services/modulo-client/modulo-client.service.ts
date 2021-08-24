/* tslint:disable:no-redundant-jsdoc */
import {Observable} from 'rxjs';
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {environment} from '../../../../environments/environment';

/**
 * Classe de integração com o serviço de queimadura.
 */
@Injectable({
  providedIn: 'root'
})
export class ModuloClientService {

  /**
   * Construtor da classe.
   *
   * @param http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Retorna a lista de Módulos pelo id do Sistema informado.
   *
   * @param idSistema
   */
  public getModulos(): Observable<any> {
    return this.http.get(`${environment.urlApi}/modulos/modulo/ativos`);
  }
}
