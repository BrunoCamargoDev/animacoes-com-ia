// link do webhoock, para funcionar a automação, receber todas as informações e passar para a IA
let webhoock = "seu-link-do-webhook"

// função assincrona - função que sai do código, busca informações por fora
async function cliqueiNoBotao() {

    //definindo a area em que o codigo gerado pela IA vai aparecer:
    let codigo = document.querySelector(".area-codigo")

    // Variavel que filtra o texto digitado pelo usuário
    let textoInput = window.document.querySelector(".input-animacao").value

    // Area em que o resultado vai aparecer
    let areaResultado = document.querySelector(".area-resultado")

    // Filtrar a resposta da IA usando JSON
    let resposta = await fetch(webhoock, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pergunta: textoInput })
    })

    // Definir resultado, configuração para decodificar JSON
    let resultado = await resposta.json()

    // Filtra resposta em JSON
    let info = JSON.parse(resultado.resposta)

    // Jogar as informações na tela 
    codigo.innerHTML = info.code  //filtra os resultados "code" no JSON
    areaResultado.innerHTML = info.preview //filtra os resultados "preview" no JSON

    // Adiciona uma tag de estilo no html (head), adicionando o css gerado pela IA, assim gerando a imagem
    document.head.insertAdjacentHTML('beforeend', "<style>"+ info.style+ "</style>")

}