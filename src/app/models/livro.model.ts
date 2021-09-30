export class Livro {
    constructor (
        public nome: string,
        public autor: string,
        public dataAdicionado: string,
        public dataConclusao: string,
        public nota: number,
        public status: string,
        public id?: number,
    ) {}
}
