export class Barbeiro {
    constructor(
        private id: string,
        private nome: string,
        private diasTrabalho: string[],
        private horaInicio: string,
        private horaFim: string
    ){
        if (!nome) throw new Error("nome obrigatório");
        if (!diasTrabalho || diasTrabalho.length === 0) throw new Error("diasTrabalho obrigatório");
        if (!horaInicio) throw new Error("horaInicio obrigatório");
        if (!horaFim) throw new Error("horaFim obrigatórrio");
        if (nome.length < 3 ) throw new Error('nome muito curto')
    }
 static create(nome: string, diasTrabalho: string[], horaInicio: string, horaFim: string){
    const id = crypto.randomUUID();
    return new Barbeiro(id, nome, diasTrabalho, horaInicio, horaFim);
 }

 getId(): string {
    return this.id;
 }

 getNome(): string {
    return this.nome;
 }

 getDiasTrabalho(): string[] {
    return this.diasTrabalho;
 }

 getHoraInicio(): string {
    return this.horaInicio;
 }

getHoraFim(): string {
    return this.horaFim;
}
}