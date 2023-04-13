axios.defaults.headers.common['Authorization'] = 'sqTg9AiJoy0kppzmztZ9cCvk';

function renderizaMsg(array) {
    let layout = document.querySelector('.mensagens');
    layout.innerHTML = '';
    let hora = array.data.time;
    console.log(array.data[0].time);
    layout.innerHTML = `<div class="msg-normal"><p><span class="horario">${hora}</span>  <span class="nome">${array.data.from}</span> para <span class="nome">${array.data.to}</span>:  ${array.data.text}</p></div>`
}


function buscaMensagem() {
    const promiseRecebe = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    promiseRecebe.then(renderizaMsg);
}

function respostaMsg() {
    let msgDigitada = document.querySelector('.input-rodape');
    msgDigitada.value = '';

}

function enviarMensagem() {
    let msgDigitada = document.querySelector('.input-rodape');
    const nomeDigitado = document.querySelector('.input-entrada');
    let novaMsg = {from: nomeDigitado.value,
	to: "Todos",
	text: msgDigitada.value,
	type: "message"}
    const promise = axios.post('https://mock-api.driven.com.br/api/vm/uol/messages', novaMsg);
    promise.then(respostaMsg);
}

function verificaStatus() {
    const nomeDigitado = document.querySelector('.input-entrada');
    const nome = {name: nomeDigitado.value};
    const promise = axios.post('https://mock-api.driven.com.br/api/vm/uol/status', nome);
}

function statusUsuario() {
    setInterval(verificaStatus, 5000);
}

function someTelaEntrada() {    
    const layoutEntrada = document.querySelector('.tela-entrada');
    layoutEntrada.classList.add('escondido');
    const layoutPrincipal = document.querySelector('.tela-principal');
    layoutPrincipal.classList.remove('escondido');
    const body = document.querySelector('body');
    body.classList.add('cinza');
}

function erroNome() {
    alert('Esse usuário já existe! Digite outro nome.')
}

function nomeCadastrado() {
    const promiseRecebe = axios.get('https://mock-api.driven.com.br/api/vm/uol/participants');
    console.log('Cadastrado!');
    someTelaEntrada();
    buscaMensagem();
}

function mandaNome() {
    const nomeDigitado = document.querySelector('.input-entrada');
    const novoNome = {name: nomeDigitado.value};
    let usuarios = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', novoNome);
    usuarios.then(nomeCadastrado);
    usuarios.catch(erroNome);
    statusUsuario();
}
