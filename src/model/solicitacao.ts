export class Solicitacao {
    constructor(
        private id: string,
        private pacienteId: string,
        private medicoId: string,
        private medicamentoId: string,
        private descricaoPaciente: string,
        private dataHoraSolicitacao: Date,
        private status: string,
        private farmaceuticoId: string

    ){
        if (!id) throw new Error("id obrigatório");
        if (!pacienteId) throw new Error("Paciente obrigatório");
        if (!medicoId) throw new Error("Médico obrigatório");
        if (!medicamentoId) throw new Error('Medicamento obrigatório')
        if (!descricaoPaciente) throw new Error ('Descrição obrigatória')
    }
 static create(pacienteId:string, medicoId:string, medicamentoId:string, descricaoPaciente:string, dataHoraSolicitacao:Date, status:string, farmaceuticoId:string){
    const id = crypto.randomUUID();
    return new Solicitacao(id,pacienteId,medicoId,medicamentoId,descricaoPaciente,dataHoraSolicitacao,status,farmaceuticoId);
 }

public getId(): string {
   return this.id;
 }
public getPacienteId(): string {
    return this.pacienteId;
 }

public getMedicoId(): string {
    return this.medicoId;
 }

public getMedicamentoId(): string {
    return this.medicamentoId;
 }

public getDescricaoPaciente(): string {
    return this.descricaoPaciente;
}
public getDataHoraSolicitacao(): Date {
    return this.dataHoraSolicitacao;
 }
public getStatus(): string {
    return this.status;
 }
public  getFarmaceuticoId(): string {
    return this.farmaceuticoId;
 }

public setStatus(novoStatus: string): void {
    this.status = novoStatus;
}

public setFarmaceuticoId(novoFarmaceuticoId: string): void {
    this.farmaceuticoId = novoFarmaceuticoId;
}
}