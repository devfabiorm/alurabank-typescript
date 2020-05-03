import { MeuObjeto } from './MeuObjeto';

export class Negociacao implements MeuObjeto<Negociacao>{

    constructor(readonly data: Date, readonly quantidade: number, readonly valor: number){}

    get volume(){
        return this.valor * this.quantidade;
    }

    paraTexto() : void {
        console.log('Imprimindo negociação:');
        console.log(`
        Data: ${this.data}
        Quantidade: ${this.quantidade}, 
        Valor: ${this.valor}, 
        Volume: ${this.volume}
        `);
        console.log('----------------------');
    }

    ehIgual(negociacao: Negociacao){

        return negociacao.data.getDate() == this.data.getDate() && negociacao.data.getMonth() == this.data.getMonth() && negociacao.data.getFullYear() == this.data.getFullYear();
    }
}