
    const form  = document.getElementById("novoItem");
    const lista = document.getElementById("lista");
    const itens = JSON.parse(localStorage.getItem('itens')) || [];

    itens.forEach(e => {
        criaElemento (e)
    });
 
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const nomeInput = e.target.elements['nome'];
        const quantidadeInput = e.target.elements['quantidade'];
        const itemAtual = {
            "nome" : nomeInput.value,
            "quantidade": quantidadeInput.value
        };

        if(!validarItem(itemAtual))
            return;
       

        const existeItem = itens.find(item => item.nome == itemAtual.nome);

        if(existeItem){
            itemAtual.id = existeItem.id;
            atualizaElemento(itemAtual);
            itens[itens.findIndex(item => item.id == itemAtual.id)] = itemAtual;
        }else{
            itemAtual.id = criarIdentificador();
            criaElemento(itemAtual);
            itens.push(itemAtual);
        }

        atualizaLocalStorage();    

        nomeInput.focus();
        nomeInput.value = '';
        quantidadeInput.value = '';
    })

    function criaElemento (item) {
        lista.insertAdjacentHTML('beforeend',`<li class="item">
                                                <strong data-id='${item.id}'>${item.quantidade}</strong>
                                                ${item.nome} 
                                                <button onclick='deletarItem(${item.id})'>X</button>
                                              </li>`);
    }

    function atualizaElemento(item){
        document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;
    }

    function atualizaLocalStorage(){
        localStorage.setItem('itens', JSON.stringify(itens));
    }

    function deletarItem(idItem){
        
        let podeRemoverItem = confirm("Deseja realmente excluir o item?");

        if(podeRemoverItem){
            deletarElemento(idItem);
            const index = itens.findIndex(item => item.id == idItem);
            itens.splice(index, 1);
            atualizaLocalStorage();
        }
    }

    function deletarElemento(idItem){
        document.querySelector("[data-id='" + idItem + "']").parentNode.remove();
    }

   function criarIdentificador(){
        return Date.now();
   }

   function validarItem(itemAtual){
    
        if(itemAtual.nome == '' || itemAtual.nome == undefined){
            alert('Nome não pode estar vazio!');
            return false;
        }

        if(itemAtual.quantidade == '' || itemAtual.quantidade <= 0 || itemAtual.quantidade > 20){
            alert('Quantidade não permitida!');
            return false;
        }

        return true;
   }

