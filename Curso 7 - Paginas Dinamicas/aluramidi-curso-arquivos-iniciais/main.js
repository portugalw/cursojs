function tocaSom(e){
    let tecla = e.target;
    let som = tecla.classList[1];
    let audioElement = document.querySelector(`#som_${som}`);
    
    if(audioElement && audioElement.localName == 'audio')
        audioElement.play();
    else
        console.log(`Elemento ${audioElement ? audioElement.id : '-' } não é válido ou não é um áudio. ${audioElement ? `Tipo: ${audioElement.localName}` : '' }` );
}

const listaDeTeclas = document.querySelectorAll('.tecla');

listaDeTeclas.forEach(tecla => facaTudo(tecla));

function facaTudo(tecla){

    var teclasPermitidas = [13, 32];
    var podeAtuar =  1 == 2 ? 'Pode' : 'Não pode';

    tecla.onclick = tocaSom;

    tecla.onkeydown  = (e) => { 
        if( teclasPermitidas.includes(e.keyCode)){
            tecla.classList.add('ativa'); 
        }
    }
    tecla.onkeyup  = (e) => { 
        if( teclasPermitidas.includes(e.keyCode)){
            tecla.classList.remove('ativa'); 
        }
    }

}