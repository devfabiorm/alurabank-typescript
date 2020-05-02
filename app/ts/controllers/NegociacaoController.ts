import { Negociacoes, Negociacao } from '../models/index';
import { NegociacoesView, MensagemView } from '../views/index';
import { domInject } from '../helpers/decorators/index';

export class NegociacaoController {

    @domInject('#data')
    private _inputData: JQuery;

    @domInject('#quantidade')
    private _inputQuantidade: JQuery;

    @domInject('#valor')
    private _inputValor: JQuery;
    
    private _negociacoes = new Negociacoes();
    private _negociacoesView = new NegociacoesView('#negociacoesView');
    private _mensagemView = new MensagemView('#mensagemView');

    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    adiciona(event: Event) {

        event.preventDefault();

        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if(!this._ehDiaUtil(data)){
            this._mensagemView.update('Negociações somente em dias úteis, por favor!');
            return;
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val()));

        this._negociacoes.adiciona(negociacao);

        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação cadastrada com sucesso!');
    }

    private _ehDiaUtil(data: Date) : boolean {

        return data.getDay() != DiaDaSemana.Domingo && data.getDay() != DiaDaSemana.Sabado;
    }

    importa(){

        function isOk(res: Response){
            if(!res.ok){
                throw new Error(res.statusText)
            }

            return res;
        }
        
        fetch('http://localhost:8080/dados')
            .then(res => isOk(res))
            .then(res => res.json())
            .then((dados : any[]) => {
                dados.map(dado => new Negociacao(new Date, dado.vezes, dado.montante))
                    .forEach(negociacao => this._negociacoes.adiciona(negociacao));
                this._negociacoesView.update(this._negociacoes);
            })
    }
}

enum DiaDaSemana {

    Domingo,
    Segunda,
    Terca,
    Quarta,
    Quinta,
    Sexta,
    Sabado
}