function pulaLinha(){ // Fumção para pular linha
        document.write("<br><br>")
    }

    function mostra(frase) {

        document.write("****************************************");
        pulaLinha();
        document.write(frase);
        pulaLinha();
    }
    function exibeTitulo(titulo) {
        document.write("<h1>" + titulo + "</h1>");
        pulaLinha();
    }

    function exibeParagrafo(paragrafo) {
        document.write("<p>" + paragrafo + "</p>");
        pulaLinha();
    }
    
    function idade(idadeA, idadeB){
        diferenca = idadeA - idadeB;
        mostra("Nossa diferença de idade é: " + diferenca);
        
    }