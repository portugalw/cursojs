import dataBase from "./dataBase.js";

const dogListContext = document.getElementById('dog-list-context');
const inputSearch = document.getElementById('input-search');
const canvas = document.getElementById('canvas');
const formSearch = document.getElementById('form-search');
const imageDog = document.getElementById('image-dog');
const titleResult = document.getElementById('title-result');
const btnAddDog = document.getElementById('btn-add-dog');
const btnNextDog = document.getElementById('btn-next-dog');
const btnPreviewDog = document.getElementById('btn-preview-dog');
const elementsFind = document.querySelectorAll('[data-find]');

var dogList = [];
var dogListIndex = 0;
var breed = '';


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

async function getAllDogBreedsFromApi(){
    try{
        const breedListResponse = await fetch('https://dog.ceo/api/breeds/list/all');
        const breedList = await breedListResponse.json();

        if(breedList.status == 'error'){
            throw Error('Raça de cachorro não encontrada.');
        }

        return { 
            success: true,
            breeds: breedList.message
        }
    }
    catch(erro){
        console.log(erro);
        return { success: false, breeds:{} }
    }
}

addEvents();
loadDogList();
loadBreedList();

function addEvents(){
    inputSearch.addEventListener('change', (e) => {
        e.preventDefault();
        searchDog()
    });

    btnNextDog.onclick = nextDogImage;
    btnPreviewDog.onclick = previewDogImage;
    btnAddDog.onclick = addDog;
}

async function searchDog(){
    breed = inputSearch.value;
    let breedResult = await getDogImagesFromApi(breed);

    if(!breedResult.success){
        titleResult.innerHTML = breedResult.message
        elementsFind.forEach(e => e.style.display = 'none');
        breed = '';
        return;
    }

    dogList = breedResult.dogList;
    dogListIndex = 0;
    titleResult.innerHTML = inputSearch.value.replace('\\' , ' ') + ' - ' + breedResult.message;
    elementsFind.forEach(e => e.style.display = 'inline-block');
    imageDog.src = dogList[dogListIndex];
}

function convertImageToBase64(){

    canvas.getContext('2d').drawImage(imageDog, 0, 0, canvas.width, canvas.height);
    
    let imagemURL = canvas.toDataURL("image/jpeg");

    return imagemURL;
}

function addDog(){
   
    let imageBase64 = convertImageToBase64();
    let item = dataBase.addItem({breed: breed, image: imageBase64});
    addDogList(item);
}

function removeDog(element){
    let id = element.target.attributes['data-id'].value;
    dataBase.removeItemById(id);
    element.target.parentElement.parentElement.remove()

    loadDogList();
}

function addDogList(item){
    let htmlTemplate = getDogHtmlTemplate(item);
    dogListContext.insertAdjacentHTML('afterBegin', htmlTemplate)
    document.getElementById('btn-remove-'+item.id).onclick = removeDog;
}

async function loadBreedList(){
    let breedsResponse= await getAllDogBreedsFromApi();
    let breeds = breedsResponse.breeds;

    for(let breedKey in breeds){

        let option = document.createElement('option');

        if(breeds[breedKey].length > 0){
            breeds[breedKey].forEach(subBreed => {
                option.innerHTML = `${subBreed} ${breedKey}`,
                option.value = breedKey+ '\\' + subBreed
            });
          
        }
        else {
            option.innerHTML = breedKey,
            option.value = breedKey
        }

        inputSearch.appendChild(option);
    }
}

function loadDogList(){
    
    dogListContext.innerHTML = "";
    
    let dogList = dataBase.getAll();

    dogList.forEach(d => addDogList(d));
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

function getDogHtmlTemplate(item){
    return `<div class='col-md-6 col-lg-3' data-id=${item.id}>
                <div class='blog-entry box-dog'>
                    <a class='img-link'>
                        <img width='150' height='100' src=${item.image} alt='Image' >
                    </a>
                    <h4>
                        <a>${item.breed.replace('\\', ' ')}</a>
                    </h4>
                    <a id='btn-remove-${item.id}' data-id=${item.id} class='btn-remover btn btn-xm'>Remover</a>
                </div>
            </div>`;
}
