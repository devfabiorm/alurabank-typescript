export function tempoDeExecucao(tempoSegundos: boolean = false) {

    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor){

        let metodoOriginal = descriptor.value;

        descriptor.value = function(...args: any[]){

            let unidade = 'ms';
            let divisor = 1;

            if(tempoSegundos){
                unidade = 's';
                divisor = 1000;
            }

            console.log(`------------------`);
            console.log(`Parâmetros do método ${propertyKey}: ${JSON.stringify(args)}`);

            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();

            console.log(`O retorno do método ${propertyKey} é ${JSON.stringify(retorno)}`)
            console.log(`O tempo gasto no método ${propertyKey}`);

            console.log(`A ${propertyKey} demorou ${(t2 - t1)/divisor} ${unidade}`);
            console.log(`-------------------`);

            return retorno;
        }

        return descriptor;

    }
}