
// variáveis
let favoritos;
const boxes = document.querySelector('.boxes');

// Carregar as imagens
function carregarImagens() {

    favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];

    let box;
    let img;
    let link;

    for (let i = 0; i < favoritos.length; i++) {

        box = document.createElement('div');
        box.classList.add('box');

        img = document.createElement('img');
        img.setAttribute('src', favoritos[i]);

        link = document.createElement('a');
        link.setAttribute('href', '#');
        link.setAttribute('data-excluir-fav', '');
        link.textContent = 'Excluir';
        link.classList.add('boxes__box__img__excluir');

        box.appendChild(img);
        box.appendChild(link);
        boxes.appendChild(box);

    }
}

carregarImagens();

function procurarBotoesExcluir() {

    const buttonsExcluir = document.querySelectorAll('[data-excluir-fav]');

    buttonsExcluir.forEach((button) => {

        button.addEventListener('click', excluirFavorito);
    })
}

procurarBotoesExcluir();

function excluirFavorito(evento) {

    let imageSource = evento.target.parentElement.firstElementChild.src;
    console.log(imageSource);
    let index = favoritos.indexOf(imageSource);
    favoritos.splice(index, 1);

    localStorage.setItem('favoritos', JSON.stringify(favoritos));

    boxes.innerHTML = "";

    carregarImagens();
    procurarBotoesExcluir();
}

let limparFav = document.querySelector('[data-excluir-todos-fav]');
limparFav.addEventListener('click', excluirTodosOsFavoritos)

function excluirTodosOsFavoritos() {

    localStorage.removeItem('favoritos');

    boxes.innerHTML = '';
}













