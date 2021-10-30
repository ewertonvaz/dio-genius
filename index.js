let order = []
let clickedOrder = []
let score = 0
let level = 1

//0 - verde
//1 -  vermelho
//2 - amarelo
//3 - azul

const azul = document.querySelector('.blue')
const verde = document.querySelector('.green')
const amarelo = document.querySelector('.yellow')
const vermelho = document.querySelector('.red')
const placar = document.getElementById('placar')
const nivel = document.getElementById('nivel')

function shuffleOrder() {
    let colorOrder = Math.floor(Math.random() * 4)
    order[order.length] = colorOrder
    clickedOrder = []

    for(i in order){
        let elementColor = createColorElement(order[i])
        ligthColor(elementColor, Number(i) + 1)
    }
}

function createColorElement(color) {
    switch (color) {
        case 0:
          return verde;
        case 1:
          return vermelho;
        case 2:
            return amarelo;
        case 3:
            return azul;
        default:
          return null;
      }
}

function ligthColor(element, number) {
    console.log(element)
    number = number * 1000
    setTimeout( () => {
        element.classList.add('selected')
    }, number - 250)

    setTimeout( () => {
         element.classList.remove('selected')
    }, number)
}

function checkOrder() {
    for (i in clickedOrder){
        if (clickedOrder[i] !== order[i]) {
            gameOver()
            break
        }
    }

    if(clickedOrder.length === order.length){
        alert(`Pontuação : ${score}\nPróxima rodada!`)
        nextLevel()
    }
}

function click(color) {
    clickedOrder[clickedOrder.length] = color
    createColorElement(color).classList.add('selected')

    setTimeout( () => {
        createColorElement(color).classList.remove('selected')
        checkOrder()
    }, 250)

}

function nextLevel() {
    placar.innerHTML = score
    if (score !== 0 && score % 3  == 0) {
        level++
        alert(`Parabéns!\nVocê passou para próximo nível!`)
        nivel.innerHTML = level
    }
    score++
    shuffleOrder()
}

function gameOver() {
    alert(`Pontuação : ${score}\nVocê perdeu!\nClqiue em OK para começar de novo!`)
    order = []
    clickedOrder = []

    playGame()
}

function playGame() {
    alert('Bem vindo ao Genius!')
    score = 0
    level = 1
    nivel.innerHTML = level
    nextLevel()
}

verde.onclick = () => click(0)
vermelho.onclick = () => click(1)
amarelo.onclick = () => click(2)
azul.onclick = () => click(3)

playGame()