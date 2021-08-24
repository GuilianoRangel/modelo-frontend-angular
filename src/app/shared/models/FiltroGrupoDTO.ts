import { SistemaDTO } from './SistemaDTO';
type status = 'A' | 'I';

export class FiltroGrupoDTO{
    nome: string;
    tipoUsuario: string;
    status: status;
    sistema: SistemaDTO;
}