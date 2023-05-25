async function listaVideos(termoBusca){
    
    let query = '';
    if(termoBusca){
        query = '?q=' + termoBusca;
    }
    
    const conexao = await fetch("http://localhost:3000/videos" + query);
    return await conexao.json();
}

async function criaVideo(titulo, visualisacoes, url, imagem){
    const conexao = await fetch("http://localhost:3000/videos", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            titulo: titulo,
            descricao: `${visualisacoes} mil visualisaões`,
            url: url,
            imagem: imagem
        })
    });

    return await conexao.json();
}



export const conectaApi = {
    listaVideos,
    criaVideo
}