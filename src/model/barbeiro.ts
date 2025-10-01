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

        if (nome.length < 3)
    }
}