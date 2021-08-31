/* tslint:disable:no-redundant-jsdoc */
import { HttpResponse } from '@angular/common/http';

/**
 * Classe abstract Service.
 *
 * @author Guiliano Rangel (UEG)
 */
export abstract class AbstractService {

  /**
   * Consturtor da classe.
   */
  public constructor() {
  }

  /**
   * Recupera o objeto 'Json' disponível no 'body' da 'Response'.
   *
   * @param response
   */
  protected resolveJsonData(response: HttpResponse<any>) {
    return response.body.json();
  }

  /**
   * Recupera o objeto disponível no 'body' da 'Response'.
   *
   * @param response
   */
  protected resolveFileData(response: HttpResponse<any>) {
    const blob = response.body.blob();
    const contentType = response.headers.get('Content-Type');
    return new Blob([blob], { type: contentType });
  }

  /**
   * Popula o FormData com os dados do Objeto JSON informado, percorrendo todos os atributos Simples/Complexos.
   *
   *
   * @param json - Objeto JSON que será percorrido para popular o 'FormData'.
   *
   * @param formData - Objetos FormData fornecem uma forma fácil de construir um conjunto de pares
   * 		  chave/valor representando campos de formulário e seus valores.
   *
   * @param firstkey - Descrição da chave que será necessária para a identificação do parâmetro adicionado no 'FormData'.
   */
  protected appendFormData(json: any, formData: FormData, firstKey?: string) {
    for (const key of Object.keys(json)) {
      const value = json[key];
      const formatedKey = firstKey !== undefined ? firstKey + '.' + key : key;

      if (value instanceof Array) {
        for (let index = 0; index < value.length; index++) {
          const formatedKeyArray = formatedKey + '[' + index + ']';

          if (typeof value === 'object') {
            if (typeof value[index] === 'string') {
              formData.append(formatedKeyArray, value[index]);
            } else {
              this.appendFormData(value[index], formData, formatedKeyArray);
            }
          } else {
            formData.append(formatedKeyArray, value[index]);
          }
        }
      } else if (typeof value === 'object') {
        if (value instanceof File) {
          formData.append(formatedKey, value);
        } else {
          this.appendFormData(value, formData, formatedKey);
        }
      } else {
        if (key !== '$$hashKey' && value !== undefined) {
          formData.append(formatedKey, value);
        }
      }
    }

  }
}
