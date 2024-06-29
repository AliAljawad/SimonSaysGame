const buttonColors = ["red", "blue", "green", "yellow"]
let gamePattern = []
let userClickedPattern = []
let started = false
let level = 0

document.addEventListener('keypress', () => {
    if (!started) {
        document.querySelector("#level-title").textContent = `Level ${level}`
        nextSequence()
        started = true
    }
})

function nextSequence() {
    userClickedPattern = []
    gamePattern=[]
    level++
    document.querySelector("#level-title").textContent = `Level ${level}`
    let i = Math.floor(Math.max(1, Math.floor(Math.random() * 5)))
    for(k=0;k<i;k++){
    let randomColor = buttonColors[Math.floor(Math.random() * buttonColors.length)]
    gamePattern.push(randomColor)
    }
    showSequence(gamePattern)
}

function showSequence(gamePattern) {
    disableInput()
    let i = 0
    let interval = setInterval(() => {
        pressedButton(gamePattern[i])
        i++
        if (i >= gamePattern.length) {
            clearInterval(interval)
            enableInput()
            return
        }
    }, 750)
    console.log("Game Pattern: ", gamePattern)
}

function pressedButton(color) {
    const button = document.getElementById(color)
    button.classList.add("pressed")
    setTimeout(() => {
        button.classList.remove("pressed")
    }, 500)
}

function enableInput() {
    const buttons = document.querySelectorAll(".btn")
    buttons.forEach(button => {
        button.addEventListener('click', handlePlayerInput)
    })
}

function disableInput() {
    const buttons = document.querySelectorAll(".btn")
    buttons.forEach(button => {
        button.removeEventListener('click', handlePlayerInput)
    })
}

function handlePlayerInput(event) {
    const clickedColor = event.target.id
    userClickedPattern.push(clickedColor)
    pressedButton(clickedColor)
    const audio = new Audio(`sounds/${clickedColor}.mp3`)
    audio.play()
    console.log("User Pattern: ", userClickedPattern)
    checkAnswer()
}

function checkAnswer() {
    for (let i = 0; i < userClickedPattern.length; i++) {
        if (userClickedPattern[i] !== gamePattern[i]) {
            console.log("wrong")
            document.querySelector("#level-title").textContent = "Game Over, Press Any Key to Restart"
            document.body.classList.add("game-over")
            setTimeout(() => {
                document.body.classList.remove("game-over")
            }, 200)
            level = 0
            disableInput()
            gamePattern = []
            userClickedPattern = []
            started = false
            return
        }
    }

    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(() => {
            nextSequence()
        }, 1000)
    }
}


function btnSound(color) {
    let audio = new Audio(`sounds/${color}.mp3`)
    audio.play()
}
