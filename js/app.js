//Array de amigos adicionados
let amigos = [];

function capitalizarPrimeraLetra(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function adicionar() {
    //Input do nome do amigo
    let nomeDoAmigo = document.querySelector("#nome-amigo");
    //Paragrafo de amigos adicionados
    let amigosIncluidos = document.querySelector("#lista-amigos");

    //Caso não seja digitado nada na entrada de nome do amigo, exibe um popup na tela
    if(nomeDoAmigo.value === '' || nomeDoAmigo.value === null) {
        alert("Digite o nome do amigo antes de adicionar")
        return;
    }
    let nomeCapitalizado = capitalizarPrimeraLetra(nomeDoAmigo.value)
    //Caso a array amigos já contenha o nome do amigo, exibe um popup na tela
    if(amigos.includes(nomeCapitalizado)) {
        alert(`Especifique o(a) amigo(a) ${nomeCapitalizado}. Já há um(a) ${nomeCapitalizado} na lista.`);
        return;
    }
    //Adiciona o nome do amigo na array amigos
    amigos.push(nomeCapitalizado);
    //Adiciona o nome do amigo à lista de amigos incluidos para participar do sorteio
    if(amigosIncluidos.textContent == '') {
        amigosIncluidos.textContent = nomeCapitalizado;
    } else {
        amigosIncluidos.textContent = amigosIncluidos.textContent + ', ' + nomeCapitalizado;
    }
    //Apaga o que foi digitado no input de nome do amigo
    nomeDoAmigo.value = '';

    atualizarLista();
    atualizarSorteio();
}

function excluirAmigo(index) {
    amigos.splice(index, 1);
    atualizarLista()
    atualizarSorteio()
}

function atualizarSorteio() {
    //Paragrafo da lista de Sorteio
    let sorteio = document.getElementById("lista-sorteio");

    sorteio.innerHTML = "";
}

function atualizarLista() {
    //Paragrafo de amigos adicionados
    let amigosIncluidos = document.querySelector("#lista-amigos");
    
    amigosIncluidos.innerHTML = "";

    for(let i = 0; i < amigos.length; i++) {
        let paragrafo = document.createElement('p');
        paragrafo.textContent = amigos[i];

        paragrafo.addEventListener('click', function() {
            excluirAmigo(i);
        });

        amigosIncluidos.appendChild(paragrafo);
    }
}

function sortear() {
    //Paragrafo da lista de Sorteio
    let sorteio = document.getElementById("lista-sorteio");

    //Caso a quantidade de amigos adicionados seja menor que 3, exibe um popup na tela
    if(amigos.length < 3) {
        alert(`Número mínimo de participantes: 3. Número atual: ${amigos.length}.`);
        return;
    }
    //Chama a função embaralha com o argumento de array amigos
    embaralha(amigos)
    //Sorteia os amigos embaralhados com base no indice de arrays
    for(let i = 0; i < amigos.length; i++) {
        //Caso esteja na vez do último sorteado, ele vai sortear o primeiro amigo
        if(i == amigos.length - 1) {
            sorteio.innerHTML += amigos[i] + ' --> ' + amigos[0] + '<br>';
        } else {
            //Caso não, o amigo vai sortear o próximo amigo com base no indice de arrays
            sorteio.innerHTML += amigos[i] + ' --> ' + amigos[i + 1] + '<br>';
        }
    }
}

function embaralha(lista) {
    //Faz com que a ordem de amigos adicionados à array amigos fique aleatória!
    for(let indice = amigos.length; indice; indice--) {
        
        const indiceAleatorio = Math.floor(Math.random() * indice);

        //Atribuição via destructuring
        [lista[indice - 1], lista[indiceAleatorio]] =
            [lista[indiceAleatorio], lista[indice - 1]];

    }
}

function reiniciar() {
    //Paragrafo da lista de Sorteio
    let sorteio = document.getElementById("lista-sorteio");
    //Input do nome do amigo
    let nomeDoAmigo = document.querySelector("#nome-amigo");
    //Paragrafo de amigos adicionados
    let amigosIncluidos = document.querySelector("#lista-amigos");

    //Limpa o conteúdo do paragrafo da lista de sorteio
    sorteio.innerHTML = '';
    //Limpa o conteúdo do paragrafo de amigos incluidos
    amigosIncluidos.textContent = '';
    //Limpa a array amigos
    amigos = [];
    //Limpa o campo de entrada de nome do amigo
    nomeDoAmigo.value = '';
}