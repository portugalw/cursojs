import { conectaApi } from "./conectaApi.js";

const lista = document.querySelector("[data-lista]");
const inputPesquisar = document.querySelector("[data-pesquisar]");
const botaoPesquisar = document.querySelector("[data-pesquisar-botao]");

function constroiCard(videoData) {
    const video = document.createElement("li");
    video.className = "videos__item";
    video.innerHTML = `<iframe width="100%" height="72%" src="${videoData.url}"
                            title="${videoData.titulo}" frameborder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowfullscreen></iframe>
                       <div class="descricao-video">
                            <img src="${videoData.imagem}" alt="logo canal alura">
                            <h3>${videoData.titulo}</h3>
                            <p>${videoData.descricao}</p>
                       </div>`
    return video;
}

botaoPesquisar.addEventListener('click', e => {
    e.preventDefault();
    let termo = inputPesquisar.value;
    listarVideos(termo);
});

async function listarVideos(termoBusca){
    
    const listaApi = await conectaApi.listaVideos(termoBusca);
    
    lista.innerHTML = "";
    
    listaApi.forEach(videoData => {
        lista.appendChild(constroiCard(videoData));
    });

}

listarVideos();