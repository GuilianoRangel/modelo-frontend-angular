/* tslint:disable:no-redundant-jsdoc */
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import {FiltroGrupoDTO} from '../../../../shared/dto/filtro-grupo.dto';

/**
 * Classe de integração com o serviço de grupo.
 */
@Injectable({
  providedIn: 'root'
})
export class GrupoClientService {

  /**
   * Construtor da classe.
   *
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * Salva a instância de grupo.
   *
   * @param grupo
   * @return
   */
  public salvar(grupo: any): Observable<any> {
    let result: Observable<any> = null;

    if (grupo.id) {
      result = this.http.put(`${environment.urlApi}/grupos/${grupo.id}`, grupo);
    } else {
      result = this.http.post(`${environment.urlApi}/grupos`, grupo);
    }
    return result;
  }

  /**
   *  Inativa a grupo confomre o 'id' informado.
   *
   * @param id
   * @return
   */
  public inativar(id: number): Observable<any> {
    return this.http.put(`${environment.urlApi}/grupos/${id}/inativo`, {});
  }

  /**
   * Ativa a grupo conforme o 'id' informado.
   *
   * @param id
   * @return
   */
  public ativar(id: number): Observable<any> {
    return this.http.put(`${environment.urlApi}/grupos/${id}/ativo`, {});
  }

  /**
   * Retorna uma instância de grupo conforme o 'id' informado.
   *
   * @param id
   * @return
   */
  public getById(id: number): Observable<any> {
    return this.http.get(`${environment.urlApi}/grupos/${id}`);
  }

  /**
   * Retorna o array de grupo confome o filtro de pesquisa informado.
   *
   * @param filtroDTO
   */
  public getByFiltro(filtroDTO: FiltroGrupoDTO): Observable<any> {
    return this.http.get(`${environment.urlApi}/grupos/filtro`, {
      params: filtroDTO.toParams()
    });
  }

  /**
   * Retorna a lista de Grupos Ativos.
   *
   * @param idSistema
   */
  public getGruposAtivos(): Observable<any> {
    return this.http.get(`${environment.urlApi}/grupos/grupo/ativos`);
  }

  /**
   * Retorna a Estatisticas de Usuários por Grupo.
   *
   * @param idSistema
   */
  public getGruposStats(): Observable<any> {
    return this.http.get(`${environment.urlApi}/grupos/estatisticas`);
  }
}
