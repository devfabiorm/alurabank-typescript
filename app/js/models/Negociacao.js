System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Negociacao;
    return {
        setters: [],
        execute: function () {
            Negociacao = class Negociacao {
                constructor(data, quantidade, valor) {
                    this.data = data;
                    this.quantidade = quantidade;
                    this.valor = valor;
                }
                get volume() {
                    return this.valor * this.quantidade;
                }
                paraTexto() {
                    console.log('Imprimindo negociação:');
                    console.log(`
        Data: ${this.data}
        Quantidade: ${this.quantidade}, 
        Valor: ${this.valor}, 
        Volume: ${this.volume}
        `);
                    console.log('----------------------');
                }
                ehIgual(negociacao) {
                    return negociacao.data.getDate() == this.data.getDate() && negociacao.data.getMonth() == this.data.getMonth() && negociacao.data.getFullYear() == this.data.getFullYear();
                }
            };
            exports_1("Negociacao", Negociacao);
        }
    };
});
