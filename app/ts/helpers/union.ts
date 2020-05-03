// criando o alias!
type MeuToken = string |  number;

function processaToken(token: MeuToken) {

    if(typeof(token) === 'string'){
        // typescript entende que é o tipo string e faz autocomplete para este tipo. A função replace só existe em string
        //muda o dígito 2 por x!
        return token.replace(/2/g, 'x');
    }else{
        // toFixed só existe em number!
        return token.toFixed().replace(/2/g,'X');
    }
}

const tokenProcessado1 = processaToken('1234');
const tokenProcessado2 = processaToken(1234);