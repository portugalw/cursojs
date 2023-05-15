import validaCpf from "./valida-cpf.js";
import validaIdade from "./valida-idade.js";

const camposDoFormulario = document.querySelectorAll('[required]');
const formulario = document.querySelector('[data-formulario]');

formulario.addEventListener("submit", (e) => {
    e.preventDefault(); // remove a função padrão do elemento HTML que estou escutando

    const listaRespostas = {
        "nome" : e.target.elements["nome"].value,
        "email" : e.target.elements["email"].value,
        "rg" : e.target.elements["rg"].value,
        "cpf" : e.target.elements["cpf"].value,
        "aniversario" : e.target.elements["aniversario"].value
    }
})

var  funcaoVerificar = () => {
     verificaCampo(campo);
}

var  funcaoRemoverPreventDefault = function(e) {
    e.preventDefault();
}

camposDoFormulario.forEach((campo) => {
    campo.addEventListener('blur', funcaoVerificar);
    campo.addEventListener('invalid', funcaoRemoverPreventDefault);
})

const tiposDeErro = [
    'valueMissing',
    'typeMissmatch',
    'patternMismatch',
    'tooShort',
    'customError'
]

const mensagens = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
        tooShort: "Por favor, preencha um nome válido."
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    rg: {
        valueMissing: "O campo de RG não pode estar vazio.",
        patternMismatch: "Por favor, preencha um RG válido.",
        tooShort: "O campo de RG não tem caractéres suficientes."
    },
    cpf: {
        valueMissing: 'O campo de CPF não pode estar vazio.',
        patternMismatch: "Por favor, preencha um CPF válido.",
        customError: "O CPF digitado não existe.",
        tooShort: "O campo de CPF não tem caractéres suficientes."
    },
    aniversario: {
        valueMissing: 'O campo de data de nascimento não pode estar vazio.',
        customError: 'Você deve ser maior que 18 anos para se cadastrar.'
    },
    termos: {
        valueMissing: 'Você deve aceitar nossos termos antes de continuar.',
    }
}

function verificaCampo(campo){
    let mensagem = '';
    campo.setCustomValidity('');
    
    if(campo.name == 'cpf' && campo.value.length >= 11){
        validaCpf(campo);
    }

    if(campo.name == 'aniversario' && campo.value != ''){
        validaIdade(campo);
    }

    tiposDeErro.forEach(erro => {
        if(campo.validity[erro]){
            mensagem = mensagens[campo.name][erro];
            console.log(mensagem);
        }
    })

    const mensagemErro = campo.parentNode.querySelector('.mensagem-erro');
    const validadorDeInput = campo.checkValidity();

    if(!validadorDeInput){
        mensagemErro.textContent = mensagem;
    }else{
        mensagemErro.textContent = '';
    }
    
}


