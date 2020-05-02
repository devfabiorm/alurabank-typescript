import { NegociacaoController } from './controllers/NegociacaoController';
let controller = new NegociacaoController();

$('#importa').click(controller.importa.bind(controller));
$('.form').submit(controller.adiciona.bind(controller));