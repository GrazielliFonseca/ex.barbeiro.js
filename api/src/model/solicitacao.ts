export class Solicitacao {
    constructor(
        private id: string,
        private nomePaciente: string,
        private idadePaciente: number,
        private medicoId: string,
        private medicamentoId: string,
        private descricaoPaciente: string,
        private data: Date,
        private status: string,
        private farmaceuticoId: string,
    ){
        if (!id) throw new Error("id obrigatório");
        if (!nomePaciente) throw new Error("Paciente obrigatório");
        if (!idadePaciente) throw new Error('Idade obrigatória')
        if (!medicoId) throw new Error("Médico obrigatório");
        if (!medicamentoId) throw new Error('Medicamento obrigatório')
        if (!descricaoPaciente) throw new Error ('Descrição obrigatória')
    }
 static create(nomePaciente:string, idadePaciente:number, medicoId:string, medicamentoId:string, descricaoPaciente:string, status:string, farmaceuticoId:string){
    const id = crypto.randomUUID();
    const now = new Date()
    return new Solicitacao(id,nomePaciente,idadePaciente,medicoId,medicamentoId,descricaoPaciente,now,status,farmaceuticoId);
 }

public getId(): string {
   return this.id;
 }
public getNomePaciente(): string {
    return this.nomePaciente;
 }

 public getIdadePaciente(): number{
    return this.idadePaciente
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