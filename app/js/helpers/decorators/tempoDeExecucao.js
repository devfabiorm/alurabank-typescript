System.register([], function (exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    function tempoDeExecucao(tempoSegundos = false) {
        return function (target, propertyKey, descriptor) {
            let metodoOriginal = descriptor.value;
            descriptor.value = function (...args) {
                let unidade = 'ms';
                let divisor = 1;
                if (tempoSegundos) {
                    unidade = 's';
                    divisor = 1000;
                }
                console.log(`------------------`);
                console.log(`Parâmetros do método ${propertyKey}: ${JSON.stringify(args)}`);
                const t1 = performance.now();
                const retorno = metodoOriginal.apply(this, args);
                const t2 = performance.now();
                console.log(`O retorno do método ${propertyKey} é ${JSON.stringify(retorno)}`);
                console.log(`O tempo gasto no método ${propertyKey}`);
                console.log(`A ${propertyKey} demorou ${(t2 - t1) / divisor} ${unidade}`);
                console.log(`-------------------`);
                return retorno;
            };
            return descriptor;
        };
    }
    exports_1("tempoDeExecucao", tempoDeExecucao);
    return {
        setters: [],
        execute: function () {
        }
    };
});
