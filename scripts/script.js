axios.defaults.headers.common['Authorization'] = 'sqTg9AiJoy0kppzmztZ9cCvk';
const enter = document.querySelector('.input-rodape'); 

enter.addEventListener("keypress", function(event) {
    if (event.keyCode === 13) { 
        event.preventDefault();
        document.querySelector('.botao-enviar').click(); 
    }
})

function atualizaMsg() {
    setInterval(buscaMensagem, 3000);
}

function renderizaMsg(array) {
    const layout = document.querySelector('.mensagens');
    layout.innerHTML = '';
    let mensagens = array.data;
    for (let i = 0; i < mensagens.length; i++) {
        if (mensagens[i].type === "message") {
            layout.innerHTML += `<div class="msg-normal" data-test="message"><p><span class="horario">(${mensagens[i].time})</span>  <span class="nome">${mensagens[i].from}</span> para <span class="nome">${mensagens[i].to}</span>: ${mensagens[i].text}</p></div>`
        } else if (mensagens[i].type === "status") {
            layout.innerHTML += `<div class="msg-portaria" data-test="message"><p><span class="horario">(${mensagens[i].time})</span>  <span class="nome">${mensagens[i].from}</span>  ${mensagens[i].text}</p></div>`
        }
    }
    atualizaMsg();
}

function erroMsg(erro) {
    window.location.reload();
}

function buscaMensagem() {
    const promiseRecebe = axios.get('https://mock-api.driven.com.br/api/vm/uol/messages');
    promiseRecebe.then(renderizaMsg);
    promiseRecebe.catch(erroMsg);
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
    promise.catch(erroMsg);
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

function sucessoNome() {
    alert('Nome cadastrado com sucesso!');
}

function mandaNome() {
    const nomeDigitado = document.querySelector('.input-entrada');
    const novoNome = {name: nomeDigitado.value};
    let usuarios = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', novoNome);
    usuarios.then(sucessoNome);
    buscaMensagem();
    someTelaEntrada();
    usuarios.catch(erroNome);
    statusUsuario(); 
}
