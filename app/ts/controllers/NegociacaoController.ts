import { Negociacoes, Negociacao } from '../models/index';
import { NegociacoesView, MensagemView } from '../views/index';
import { domInject, throttle } from '../helpers/decorators/index';
import { NegociacaoParcial } from '../models/NegociacaoParcial';
import { NegociacaoService } from '../services/index';
import { imprime } from '../helpers/index';

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
    private _service = new NegociacaoService();

    constructor() {
        this._negociacoesView.update(this._negociacoes);
    }

    @throttle()
    adiciona() {

        let data = new Date(this._inputData.val().replace(/-/g, ','));

        if (!this._ehDiaUtil(data)) {
            this._mensagemView.update('Negociações somente em dias úteis, por favor!');
            return;
        }

        const negociacao = new Negociacao(
            data,
            parseInt(this._inputQuantidade.val()),
            parseFloat(this._inputValor.val()));

        this._negociacoes.adiciona(negociacao);

        imprime(negociacao, this._negociacoes);
        this._negociacoesView.update(this._negociacoes);
        this._mensagemView.update('Negociação cadastrada com sucesso!');
    }

    private _ehDiaUtil(data: Date): boolean {

        return data.getDay() != DiaDaSemana.Domingo && data.getDay() != DiaDaSemana.Sabado;
    }

    @throttle()
    async importa() {
        try {

            const negociacoesParaImportar = await this._service.obterNegociacoes(res => {
                if (!res.ok) {
                    throw new Error(res.statusText)
                }

                return res;
            });


            const negociacoesJaImportadas = this._negociacoes.paraArray();

            if (typeof (negociacoesParaImportar) === typeof (this._negociacoes.paraArray())) {

                let array = negociacoesParaImportar as Negociacao[];

                array
                    .filter((negociacao: Negociacao) => !negociacoesJaImportadas.some(jaImportada => negociacao.ehIgual(jaImportada)))
                    .forEach((negociacao: Negociacao) => this._negociacoes.adiciona(negociacao));
                this._negociacoesView.update(this._negociacoes);
                this._mensagemView.update('Negociações importadas com sucesso');
            }

        }
        catch (erro) {
            this._mensagemView.update(erro.message);
        }

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