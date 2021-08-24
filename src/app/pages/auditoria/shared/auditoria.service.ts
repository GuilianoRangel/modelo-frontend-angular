import { FiltroAuditoriaDTO } from '../../../shared/dto/filtro-auditoria.dto';
import { environment } from '../../../../environments/environment';
/* tslint:disable:no-redundant-jsdoc */
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuditoriaDTO } from 'src/app/shared/models/AuditoriaDTO';

/**
 * Classe de integração com o serviço de auditoria.
 */
@Injectable({
  providedIn: 'root'
})
export class AuditoriaService {

  /**
   * Construtor da classe.
   *
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * Retorna o array de auditorias confome o filtro de pesquisa informado.
   *
   * @param filtroDTO
   */
  public getByFiltro(filtroDTO: FiltroAuditoriaDTO): Observable<any> {
    return this.http.post(`${environment.urlApi}/auditorias/filtro`, filtroDTO);
  }

  /**
   * Retorna a instância do 'Log de Auditoria' pelos ids da Origem, da Auditoria e da Entidade.
   *
   * @param id
   * @param idAudit
   * @param idEntidade
   */
  public getAuditoria(id: any, idAudit: any, idEntidade: any): Observable<any> {
    return this.http.get(`${environment.urlApi}/auditorias/${id}/${idAudit}/${idEntidade}`);
  }

  /**
   * Retorna a lista de Entidades pelo id do Sistema informado.
   *
   * @param idSistema
   */
  public getEntidadesByIdSistema(idSistema: any): Observable<any> {
    return this.http.get(`${environment.urlApi}/entidades/sistema/${idSistema}`);
  }

  /**
   * Retorna o PDF concernente a pesquisa por filtro.
   *
   * @param filtro
   */
  public exportarByFiltro(filtro: FiltroAuditoriaDTO): Observable<any> {
    return this.http.post(`${environment.urlApi}/auditorias/filtro/exportacao`, filtro, { responseType: 'blob' });
  }

  public exportarAuditoria(auditoria: AuditoriaDTO): Observable<any> {
    return this.http.post(`${environment.urlApi}/auditorias/exportacao`, auditoria, { responseType: 'blob' });
  }
}
