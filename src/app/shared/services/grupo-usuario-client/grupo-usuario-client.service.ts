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
export class GrupoUsuarioClientService {

  /**
   * Construtor da classe.
   *
   * @param http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * Recupera uma lista dos grupos ativos do usuário atual do token
   *
   * @return
   */
  public getAllByAtivosByAcessoUsuario(): Observable<any> {
    return this.http.get(`${environment.urlApi}/grupos/user`);
  }
}
