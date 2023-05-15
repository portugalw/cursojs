export default function validaIdade(campo){
    const dataNascimento = new Date(campo.value);
    
    if(!validaSeMaiorDeIdade(dataNascimento)){
        campo.setCustomValidity('O usuário não é maior de idade');
    }
}

function validaSeMaiorDeIdade(data){
    const dataAtual = new Date();
    const dataMais18 = new Date(data.getUTCFullYear() + 18,
                                data.getUTCMonth(), 
                                data.getUTCDate());

    return dataAtual >= dataMais18;
}