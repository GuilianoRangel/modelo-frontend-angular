/* tslint:disable:no-redundant-jsdoc */
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../../environments/environment';
import { FiltroUsuarioDTO } from '../../../../shared/dto/filtro-usuario.dto';
import { FiltroUserKeycloakDTO } from '../../../../shared/dto/filtro-user-keycloak.dto';

/**
 * Classe de integração com o serviço de Usuário.
 */
@Injectable({
  providedIn: 'root'
})
export class UsuarioClientService {

  /**
   * Construtor da classe.
   *
   * @param http
   */
  constructor(private http: HttpClient) { }

  /**
   * Retorna a instância de Usuário conforme o 'id' informado.
   *
   * @param id
   * @return
   */
  public getById(id: number): Observable<any> {
    return this.http.get(`${environment.urlApi}/usuarios/${id}`);
  }

  /**
   * Retorna o array de Usuários confome o filtro de pesquisa informado.
   *
   * @param filtroDTO
   */
  public getByFiltro(filtroDTO: FiltroUsuarioDTO): Observable<any> {
    return this.http.get(`${environment.urlApi}/usuarios/filtro`, {
      params: filtroDTO.toParams()
    });
  }

  /**
   * Retorna o array de Usuários do AD confome o filtro de pesquisa informado.
   *
   * @param filtroDTO
   */
  public getUsuariosADByFiltro(filtroDTO: FiltroUserKeycloakDTO): Observable<any> {
    return this.http.get(`${environment.urlApi}/usuarios/ad/filtro`, {
      params: filtroDTO.toParams()
    });
  }

  /**
   * Salva a instância de Usuário.
   *
   * @param usuario
   */
  public salvar(usuario: any): Observable<any> {
    let result: Observable<any> = null;

    if (usuario.id) {
      result = this.http.put(`${environment.urlApi}/usuarios/${usuario.id}`, usuario);
    } else {
      result = this.http.post(`${environment.urlApi}/usuarios/`, usuario);
    }
    return result;
  }

  /**
   * Ativa o Usuário pelo 'id' informado.
   *
   * @param id
   * @return
   */
  public ativar(id: number): Observable<any> {
    return this.http.put(`${environment.urlApi}/usuarios/${id}/ativo`, {});
  }

  /**
   *  Inativa Usuário pelo 'id' informado.
   *
   * @param id
   * @return
   */
  public inativar(id: number): Observable<any> {
    return this.http.put(`${environment.urlApi}/usuarios/${id}/inativo`, {});
  }

  /**
   * Retorna se o CPF informado é válido e se está em uso.
   *
   * @param cpf
   * @param id
   */
  public validarCpf(cpf: string, id: number): Observable<any> {
    let observable: Observable<any>;

    if (id === undefined) {
      observable = this.http.get(`${environment.urlApi}/usuarios/cpf/valido/${cpf}`);
    } else {
      observable = this.http.get(`${environment.urlApi}/usuarios/${id}/cpf/valido/${cpf}`);
    }
    return observable;
  }
}
