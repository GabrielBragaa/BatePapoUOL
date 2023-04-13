axios.defaults.headers.common['Authorization'] = 'sqTg9AiJoy0kppzmztZ9cCvk';

function msgPortaria() {
    const mensagens = document.querySelector('.mensagens');
    mensagens.innerHTML = `<div class="msg-portaria"><p><span class="horario">(09:21:45)</span>  <span class="nome">Gabriel</span>  entra na sala...</p></div>`
}

function mostraNomes(lista) {
    let listaNomes = lista.data;
    console.log(listaNomes);
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
    console.log('Erro!');
}

function nomeCadastrado() {
    const promiseRecebe = axios.get('https://mock-api.driven.com.br/api/vm/uol/participants');
    promiseRecebe.then(mostraNomes);
    console.log('Cadastrado!');
    someTelaEntrada();
}

function mandaNome() {
    const nomeDigitado = document.querySelector('.input-entrada');
    const novoNome = {name: nomeDigitado.value};
    let usuarios = axios.post('https://mock-api.driven.com.br/api/vm/uol/participants', novoNome);
    usuarios.then(nomeCadastrado);
    usuarios.catch(erroNome);
}
