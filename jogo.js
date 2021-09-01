//abaixo, recuperando informações do tamanho da tela (altura, largura)

var altura = 0
var largura = 0
var vidas = 1//variável referente ao número de vidas
var tempo = 60

var criaMosquitoTempo = 1000

var oNivel = window.location.search.replace("?", "")
/*sobre a linha acima: o atributo search de location retorna os argumentos passados, e com isso, também retorna junto com o "?"
e com o método replace nós retiramos esse ponto de interrogação para ficar apenas o valor passado normal (normal, dificil
e leviAckerman)*/

if (oNivel === "normal") {
	//3000, ou seja: 3 segundos
	criaMosquitoTempo = 3000
} else if (oNivel === "dificil"){
	//2000, ou seja: 2 segundos
	criaMosquitoTempo = 2000
} else if (oNivel === "leviAckerman"){
	//1000, ou seja: 1 segundo
	criaMosquitoTempo = 1000
}

function ajustaTamanhoPalcoJogo(){
	altura = window.innerHeight
	largura = window.innerWidth
	console.log(largura, altura)
	/*afetando a variável altura e largura com o tamanho da página*/
}

var tempoCB = function(){
	tempo--//decrementa a variável tempo

	if (tempo < 0) {//aqui ele para de executar o cronometro, como também encerra o jogo
		clearInterval(intervaloCronometro)
		clearInterval(criaMosca)
		window.location.href = "vitoria.html" //redirecionando para a página da vitória
	} else {
		document.getElementById("cronometro").innerHTML = tempo//aqui ele pegar o que tá entre as tags
	}

	
}

intervaloCronometro = setInterval(tempoCB, 1000)//decrementando a cada 1 segundo

ajustaTamanhoPalcoJogo()//atualiza altura e largura com o tamanho da página

function posicaoRandomica(){

	removendoMosquito()//chamada do método para remover o mosquito anterior

	//Logo abaixo, gera posição aleatórias, arredonda e substrai 90 para que a imagem não ultrapasse, por parte a janela
	var posicaoX = Math.floor(Math.random() * largura) - 90
	var posicaoY = Math.floor(Math.random() * altura) - 90
	/*Uma observação: como a função random() gera valores entre 0 a 1, isso fará com que a posição do mosquito nunca fique em uma
	área não visível da tela do usuário, pois multiplicação com números de 0 a 1 não dá um número superior em relação ao que está
	sendo multiplicado.*/

	/*No if abaixo, eliminamos a possibilidade valores negativos, pois isso faria com que o mosquito ficasse
	de fora da janela, ou seja, de fora da visibilidade do usuário*/
	if(posicaoX < 0 || posicaoY < 0){
		posicaoX = 0
		posicaoY = 0
	}

	console.log(posicaoX, posicaoY)

	//cria o elemento html
	var mosquito = document.createElement("img")
	mosquito.src = "imagens/mosquito.png" //atribui o src no img que acabou de ser criado (coloca a imagem desejada)
	mosquito.className = tamanhoAleatorio() + " " + ladoAleatorio()
	/*atribuindo a classe desejada para não ficar gigante, além de retorna algum dos dos mosquitos, mosquito1, mosquito2 ou 
	mosquito3. Também irá retornar a classe ladoB (randomicamente) para mudar o lado do mosquito.*/
											
	//deixando os elementos com as posições randomicas configuradas
	mosquito.style.left = posicaoX + "px"
	mosquito.style.top = posicaoY + "px"
	mosquito.style.position = "absolute"//só funcionará se for absoluto.
	mosquito.id = "mosquito"
	mosquito.onclick = function(){ //aqui nesta função ele chama o onclick e o remove quando clicado
		this.remove()
	}
	
	document.body.appendChild(mosquito)//adiciona no body

	//tamanhoAleatorio()

	//ladoAleatorio()
}

function tamanhoAleatorio(){//mudando tamanho dos mosquitos
	var classe = Math.floor(Math.random() * 3) /*resultado disso aqui será de 0 a muito próximo de 3, ele arredonda para baixo, 
	para que sempre der 0, 1 ou 2*/

	switch(classe){
		case 0:
			return "mosquito1"//retorna a classe do mosquito menor
		case 1:
			return "mosquito2"//retorna a classe do mosquito médio
		case 2:
			return "mosquito3"//retorna a classe do mosquito maior
	}
}

function ladoAleatorio(){
	var classe = Math.floor(Math.random() * 2) /*resultado disso aqui será de 0 a muito próximo de 2, ele arredonda para baixo, 
	para que sempre der 0, 1*/

	if (classe == 0) {
		return "ladoB"
	}
}

function removendoMosquito(){
	//removendo o mosquito anterior (caso exista)
	if(document.getElementById("mosquito")){//aqui o js já tem a inteligência de simplesmente verificar se existe este id
		document.getElementById("mosquito").remove()//e caso exista, aqui nesta linha ele remove
		

		if(vidas > 3){
			window.location.href = "fimDeJogo.html"//redireciona para página do fim de jogo
		} else {
			document.getElementById("v" + vidas).src = "imagens/coracao_vazio.png"
			vidas++
			/*Aqui ele irá implementar mais 1. O valor inicial é 1, acessando o primeiro coração v1 pois o número 1 foi 
			concatenado com a palavra v, logo irá acessar a primeira imagem, do id v1, e como implementamos o operador ++ na
			variável vida, ele também irá acessar as outras 2 imagens referente ao coração (v2 e v3) até que ocupe um número
			maior do que 3, onde*/
		}

	}
}