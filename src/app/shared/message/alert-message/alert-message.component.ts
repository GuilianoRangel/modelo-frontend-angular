/* tslint:disable:component-selector no-redundant-jsdoc */
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { trigger, style, transition, animate, query } from '@angular/animations';

import { MessageService, MessageItem } from '../message.service';

/**
 * Implementação de 'component' responsável por gerar a estrutura 'html' onde os alertas serão gerados.
 *
 * @author Guiliano Rangel (UEG)
 */
@Component({
  selector: 'alert-message',
  styleUrls: ['./alert-message.component.scss'],
  template: `<div class="alert-message">
                <alert [@fadeInOut]="" [type]="item.type" *ngFor="let item of items" [dismissible]="true" (onClosed)="removeMsg(item)">
                  <span [innerHTML]="domSanitizer.bypassSecurityTrustHtml(item.msg)" ></span>
                </alert>
            </div>`,
  animations: [
    trigger('fadeInOut', [
      transition('* => *', [
        query(':enter', [
            style({ opacity: 0 })],
          { optional: true }
        ),
        query(':leave',
          [
            style({ opacity: 1 }),
            animate('.5s', style({ opacity: 0 }))
          ],
          { optional: true }),
        query(':enter',
          [
            style({ opacity: 0 }),
            animate('.5s', style({ opacity: 1 }))
          ],
          { optional: true }
        )])
    ])]
})
export class AlertMessageComponent {

  private static RUNTIME_MILLISECONDS = 5000;

  public items: MessageItem[];

  /**
   * Construtor da classe.
   *
   * @param messageService
   * @param domSanitizer
   */
  constructor(private messageService: MessageService, public domSanitizer: DomSanitizer) {
    this.items = [];
    this.messageService.getMsgEmitter().subscribe(item => this.addMsgItem(item));
  }

  /**
   * Adiciona o item de mensagem a visualização.
   *
   * @param messageItem
   */
  private addMsgItem(messageItem: MessageItem): void {
    const count = this.items.filter(item => item.msg === messageItem.msg).length;

    if (count === 0) {
      this.items.push(messageItem);

      setTimeout(() => {
        this.removeMsg(messageItem);
      }, AlertMessageComponent.RUNTIME_MILLISECONDS);
    }
  }

  /**
   * Remove o item de mensagem da visualização.
   *
   * @param messageItem
   */
  public removeMsg(messageItem: MessageItem): void {
    this.items = this.items.filter(item => item.msg !== messageItem.msg);
  }
}

