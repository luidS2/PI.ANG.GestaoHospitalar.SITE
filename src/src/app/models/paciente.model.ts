import { BaseModel } from './base.model';

export class PacienteModel extends BaseModel<number> {
    nome: string;
    numeroPaciente: number;
    pressaoSistolica: number;
    pressaoDistolica: number;


    changed:boolean;
}
