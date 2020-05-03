function processaToken(token) {
    if (typeof (token) === 'string') {
        return token.replace(/2/g, 'x');
    }
    else {
        return token.toFixed().replace(/2/g, 'X');
    }
}
const tokenProcessado1 = processaToken('1234');
const tokenProcessado2 = processaToken(1234);
