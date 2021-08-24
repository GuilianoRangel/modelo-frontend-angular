type status = 'A' | 'I';

export class Sistema{
    nomeSistema: string;
    siglaSistema: string;
    status: status;
    dtAtualizado: Date;
    dtCadastrado: Date;
    descricao: string;
}