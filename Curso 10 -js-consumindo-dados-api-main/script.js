async function buscaEndereco(){
    
    try{
        const consultaCepResponse = await fetch('https://viacep.com.br/ws/71687700/json/');
        const cepResult = await consultaCepResponse.json();

        if(cepResult.erro){
            throw Error('CEP não existente.');
        }

        console.log(cepResult);
    }
    catch(erro){
        console.log(erro);
    }
}

buscaEndereco();












// var consultaCep =  fetch('https://viacep.com.br/ws/31320061/json/')
//                     .then(response => response.json())
//                     .then(r => {
//                         if(r.erro){
//                             throw Error('Esse cep não existe!');
//                         }else{
//                             console.log(r);
//                         }
//                     })
//                     .catch(error => console.log(error.message))
//                     .finally(mensagem => console.log('Processamento concluído.'));


