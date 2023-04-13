axios.defaults.headers.common['Authorization'] = 'sqTg9AiJoy0kppzmztZ9cCvk';

function msgPortaria() {
    const mensagens = document.querySelector('.mensagens');
    mensagens.innerHTML = `<div class="msg-portaria"><p><span class="horario">(09:21:45)</span>  <span class="nome">Gabriel</span>  entra na sala...</p></div>`
}

function recebeNome(nome) {
    const status = nome.status;
    console.log(status);
    if (status !== 200) {
        voltaTelaEntrada();
    }
}

function mandaNome() {
    const nomeDigitado = document.querySelector('.input-entrada');
    const novoNome = {name: nomeDigitado.value};
    const usuarios = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', novoNome);
    usuarios.then(recebeNome);
    console.log(usuarios);
}

function voltaTelaEntrada() {
    const layoutEntrada = document.querySelector('.tela-entrada');
    layoutEntrada.classList.remove('escondido');
    const layoutPrincipal = document.querySelector('.tela-principal');
    layoutPrincipal.classList.add('escondido');
    const body = document.querySelector('body');
    body.classList.remove('cinza');
    mandaNome();
}

function someTelaEntrada() {
    const layoutEntrada = document.querySelector('.tela-entrada');
    layoutEntrada.classList.add('escondido');
    const layoutPrincipal = document.querySelector('.tela-principal');
    layoutPrincipal.classList.remove('escondido');
    const body = document.querySelector('body');
    body.classList.add('cinza');
    mandaNome();
    msgPortaria();
}