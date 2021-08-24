export class AuditoriaDTO{
    nomeUsuario: string;
    tipoUsuario: string;
    email: string ;
    dataHoraAlteracao: string;
    tipoRevisao: string;
    ipUsuario:string;
    loginUsuario: string;
}

export class AuditoriaExportacaoDTO{
  id: number;
  idAudit: number;
  idUsuario: number;
  ipUsuario:string;
  tipoUsuarioPortal:string;
  loginUsuario: string;
  nomeUsuario: string;
  email: string;
  idEntidade: number;
  entidadeNome: string;
  dataHoraAlteracao: Date;
  tipoRevisao: number;
  detalhe: string;
}
