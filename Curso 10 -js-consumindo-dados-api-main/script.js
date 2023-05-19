async function buscaEndereco(cep){
    
    let mensagemErro = document.getElementById('erro');
    mensagemErro.innerHTML = '';

    try{
        const consultaCepResponse = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const cepResult = await consultaCepResponse.json();

        const cidade = document.getElementById('cidade');
        const estado = document.getElementById('estado');
        const rua = document.getElementById('endereco');
        const bairro = document.getElementById('bairro');

        cidade.value  = cepResult.localidade;
        estado.value = cepResult.uf;
        rua.value = cepResult.logradouro;
        bairro.value = cepResult.bairro;

        if(cepResult.erro){
            throw Error('CEP não existente.');
        }
        return cepResult;
    }
    catch(erro){
        console.log(erro);
        mensagemErro.innerHTML = `<p>CEP inválido. Tente novamente</p>`;
    }
}

var cepInput = document.getElementById('cep');
cepInput.addEventListener('focusout', () => buscaEndereco(cep.value));












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


