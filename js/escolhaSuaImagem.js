// variáveis
let favoritos = JSON.parse(localStorage.getItem('favoritos')) || [];
const imageContainer = document.querySelector('.images');
const button = document.querySelector('button');

// eventos
button.onclick = () => updateImage();
imageContainer.onclick = () => updateAll();

// funções
function getState() {

    const imageSource = document.querySelector('.images img').src;

    let index = favoritos.indexOf(imageSource);
    const existiNoLocalStorage = index != -1;

    return { imageSource, index, existiNoLocalStorage }
}

function updateAll() {
    updateFavoritos();
    updateClasses();
}

function updateFavoritos() {

    const { existiNoLocalStorage, index, imageSource } = getState();

    if (existiNoLocalStorage) {
        favoritos.splice(index, 1);
    } else {
        favoritos.push(imageSource);
    }

    localStorage.setItem('favoritos', JSON.stringify(favoritos));
}

function updateClasses() {

    const { existiNoLocalStorage } = getState();

    imageContainer.classList.remove('fav');

    if (existiNoLocalStorage) {
        imageContainer.classList.add('fav');
    }
}

async function updateImage() {
    await pegarImagensExternas();
    updateClasses();
}

async function pegarImagensExternas() {

    const resposta = await fetch('https://source.unsplash.com/random');

    imageContainer
        .innerHTML = `<img src="${resposta.url}">`;
}

pegarImagensExternas();