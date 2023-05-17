import dataBase from "./dataBase.js";

const inputSearch = document.getElementById('input-search');
const formSearch = document.getElementById('form-search');
const imageDog = document.getElementById('image-dog');
const titleResult = document.getElementById('title-result');
const btnAddDog = document.getElementById('btn-add-dog');
const btnNextDog = document.getElementById('btn-next-dog');
const btnPreviewDog = document.getElementById('btn-preview-dog');
const elementsFind = document.querySelectorAll('[data-find]');

var dogList = [];
var dogListIndex = 0;


async function getDogImagesFromApi(dogBreed){
    try{
        const dogListResponse = await fetch('https://dog.ceo/api/breed/'+dogBreed+'/images');
        const dogList = await dogListResponse.json();

        if(dogList.status == 'error'){
            throw Error('Raça de cachorro não encontrada.');
        }

        return { 
            success: true,
            message: 'Foram encontradas ' + dogList.message.length + ' imagens.',
            dogList: dogList.message
        }
    }
    catch(erro){
        console.log(erro);
        return { success: false, message: erro.message, dogList: [] }
    }
}

addEvents();

function addEvents(){
    formSearch.addEventListener('submit', (e) => {
        e.preventDefault();
        searchDog()
    });

    btnNextDog.onclick = nextDogImage;
    btnPreviewDog.onclick = previewDogImage;
}

async function searchDog(){
    let breed = document.getElementById('input-search').value;
    let breedResult = await getDogImagesFromApi(breed);

    if(!breedResult.success){
        titleResult.innerHTML = breedResult.message
        elementsFind.forEach(e => e.style.display = 'none');
        
        return;
    }

    dogList = breedResult.dogList;
    dogListIndex = 0;
    titleResult.innerHTML = breed + ' - ' + breedResult.message;
    elementsFind.forEach(e => e.style.display = 'inline-block');
    imageDog.src = dogList[dogListIndex];
}

function convertImageToBase64(){

}

function addDogInDB(dogBreed, dogImage){
    dataBase.addItem({ src :dogList[dogListIndex], name: breed });
}

function removeDogFromDB(id){
    dataBase.removeItemById(id);
}

function writeDogInList(dogBreed, dogImage){

}

function removeDogFromList(dogId){

}

function nextDogImage(){

    if(dogList.length == 0) return;

    dogListIndex++;

    if(dogListIndex >= dogList.length){
        dogListIndex = 0;
    }
    
    imageDog.src = dogList[dogListIndex];
}
function previewDogImage(){
    
    if(dogList.length == 0) return;
    
    dogListIndex--;
 
    if(dogListIndex <= 0 ){
        dogListIndex = dogList.length - 1;
    }
    
    imageDog.src = dogList[dogListIndex];
}
