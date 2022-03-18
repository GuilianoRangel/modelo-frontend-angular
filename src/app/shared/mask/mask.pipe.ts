import { Pipe, PipeTransform } from '@angular/core';

/**
 * Class 'Pipe' responsável por prover as máscaras geradas através da sequência de caracteres,
 * conforme o padrão adotado pela biblioteca javascript 'jQuery Mask Input'.
 *
 * @author Guiliano Rangel (UEG)
 */
@Pipe({
  name: 'mask'
})
export class MaskPipe implements PipeTransform {

  /**
   * Retorna o valor formatado conforme os parâmetros informados.
   *
   * @param value -
   * @param pattern -
   */
  transform(value: string, pattern: string | string[]): string {
    let formatted = '';

    if (!value || !pattern) {
      return formatted;
    }

    let count: number = 0;
    let rules: string[] = typeof pattern === 'string' ? [pattern] : pattern;

    do {
      let rule: string = rules[count].trim();
      formatted = this.getFormattedValue(value, rule);

      if (this.isSuccessfullyFormatted(formatted, rule)) {
        break;
      }

      ++count;
      formatted = '';
    } while (count != rules.length);

    return formatted;
  }

  /**
   * Retorna o 'value' formatado conforme a 'rule' informada.
   *
   * @param value -
   * @param rule -
   */
  private getFormattedValue(value: string, rule: string): string {
    let count: number = 0;
    let formatted: string = '';
    let optional: number = value.length - rule.replace(/\D/g, '').replace(/\9/g, '').length;

    for (let index = 0; index < rule.length; index++) {

      if (rule[index] === '0') {

        if (value[count]) {
          formatted += value[count++];
        } else {
          break;
        }
      } else if (rule[index] === '9') {

        if (optional > 0) {
          formatted += value[count++];
          optional--;
        }
      } else if (rule[index]) {
        formatted += rule[index];
      }
    }

    return formatted;
  }

  /**
   * Verifica se a mascara foi aplicada com sucesso.
   *
   * @param formatted -
   * @param rule -
   */
  private isSuccessfullyFormatted(formatted: string, rule: string): boolean {
    return formatted.length >= rule.replace(/\9/g, '').length && formatted.length <= rule.length;
  }
}
