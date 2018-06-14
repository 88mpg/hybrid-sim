const generateButton = document.querySelector('.generate')
const gameResults = document.querySelector('.gameResults')
const gameResultsScore = gameResults.querySelector('.gameResultsScore')
const totalAverage = document.querySelector('.totalAverage')
const hundoSlider = document.querySelector('.hundoSlider')
const fortySlider = document.querySelector('.fortySlider')
const hundoCountSelect = document.querySelector('.hundoCount select')

let frame = 1

let hundoSkill = 0.5
let fortySkill = 0.5
let hundoCount = 3

let frameResults = []

const generateScore = () => {
	const gameResultsArray = []
  const sum = (a, b) => a + b

  if (hundoCount > 0) {
    for (let i = 0; i < hundoCount; i++) {
      gameResultsArray.push(Math.random() < hundoSkill ? 100 : 10)
    }
  }

	for (let i = 0; i < 9 - hundoCount; i++) {
    gameResultsArray.push(Math.random() < fortySkill ? 40 : 20)
  }

  const row = document.createElement('div')

  gameResultsScore.appendChild(row)
  gameResultsArray.forEach(roll => {
    row.innerHTML += `<span>${roll}</span>`
  })
	row.innerHTML += `<span class="m${gameResultsArray.reduce(sum)}">${gameResultsArray.reduce(sum)}</span>`

  frameResults.push(gameResultsArray.reduce(sum))
  totalAverage.querySelector('span').innerText = (frameResults.reduce(sum) / frameResults.length).toFixed(2)

  if (frame === 11) {
    startOver.classList.add('is-visible')
    generateButton.disabled = true
  }
}

const resetGenerator = () => {
  frame = 1
  totalAverage.querySelector('span').innerText = '000.00'
  gameResultsScore.innerHTML = ''
  generateButton.disabled = false
  frameResults = []
}

generateButton.addEventListener('click', e => {
  e.preventDefault()
  if (frames < 10) {
    generateScore()
    const repeat = setInterval(function () {
      if (frame <= 10) {
        generateScore();
        frame++
      } else {
        clearInterval(repeat);
      }
    }, 250);
  } else {
    resetGenerator()
    const repeat = setInterval(function () {
      if (frame <= 10) {
        generateScore();
        frame++
      } else {
        clearInterval(repeat);
      }
    }, 250);
  }
})

hundoCountSelect.addEventListener('change', e => {
  hundoCount = e.target.selectedIndex
})

hundoSlider.querySelector('input').addEventListener('input', e => {
  hundoSlider.querySelector('span').innerText = (e.target.value*100).toFixed(0)
  hundoSkill = e.target.value
})

fortySlider.querySelector('input').addEventListener('input', e => {
  fortySlider.querySelector('span').innerText = (e.target.value*100).toFixed(0)
  fortySkill = e.target.value
})
