import {MessageService} from 'src/app/shared/message/message.service';
import {saveAs} from 'file-saver';
import {AuditoriaService} from '../shared/auditoria.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {OrderPipe} from 'ngx-order-pipe';
import {AbstractComponent} from '../../../shared/component/Abstract.component';
import {TipoRevisao} from '../../../shared/app.constantes';

const NOME_DOCUMENTO_EXPORTACAO = 'exportacao_log_auditoria.pdf';

@Component({
  selector: 'app-auditoria-form',
  templateUrl: './auditoria-form.component.html',
  styleUrls: ['./auditoria-form.component.scss']
})
export class AuditoriaFormComponent extends AbstractComponent implements OnInit {

  public auditoria: any;
  public tipoRevisao: string;
  public detalhes = [];

  constructor(
    private auditoriaService: AuditoriaService,
    private orderPipe: OrderPipe,
    private route: ActivatedRoute,
    private router: Router,
    private messageService: MessageService) {
    super();


    this.auditoria = route.snapshot.data.logAuditoria;
    this.detalhes = Object.entries(JSON.parse(this.auditoria.detalhe));
    this.detalhes = this.orderPipe.transform(this.detalhes, 0);
  }

  ngOnInit() {
    const tipoRevisaoTxt: TipoRevisao[] =
      this.listTiposRevisoes.filter((tpRevisao: TipoRevisao) => tpRevisao.id === this.auditoria.tipoRevisao);
    this.tipoRevisao = tipoRevisaoTxt[0] !== undefined ? tipoRevisaoTxt[0].descricao : '';
  }

  voltar() {
    this.router.navigateByUrl('/administracao/audit/listar');
  }

  visualizarImpressao() {
    this.auditoriaService.exportarAuditoria(this.auditoria).subscribe(
      data => {
        const documento = new Blob([data], {type: 'application/pdf'});
        saveAs(documento, NOME_DOCUMENTO_EXPORTACAO);
        const fileURL = URL.createObjectURL(data);
        window.open(fileURL, '_blank');
      },
      error => {
        this.messageService.addMsgDanger(error);
      }
    );
  }
}
