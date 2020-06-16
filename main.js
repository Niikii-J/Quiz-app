const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')

const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() -.5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
           button.dataset.correct = answer.correct 
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

function selectAnswer(e) {
    const selectButton = e.target
    const correct = selectButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button =>{
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Play Again'
        startButton.classList.remove('hide')
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'Who is the best YouTuber?',
        answers: [
            { text: 'PewDiePie', correct: true},
            { text: 'Pyrocynical', correct: false},
            { text: 'GameTheory', correct: false},
            { text: 'JakePaul', correct: false},
        ]
    },

    {
        question: 'Which is the best color ever?',
        answers: [
            { text: 'Purple', correct: false},
            { text: 'Green', correct: false},
            { text: 'Rainbow', correct: true},
            { text: 'Blue', correct: false},
        ]
    },

    {
        question: 'What is my favorite mythical creature?',
        answers: [
            { text: 'Elf', correct: false},
            { text: 'Jackalope', correct: true},
            { text: 'Pegasus', correct: false},
            { text: 'Dragon', correct: false},
        ]
    },

    {
        question: 'Which is the ultimate Fast food?',
        answers: [
            { text: 'Burgers', correct: false},
            { text: 'French Fries', correct: false},
            { text: 'Pizza', correct: true},
            { text: 'Nuggets', correct: true},
        ]
    },

    {
        question: 'Which country makes the best maple syrup?',
        answers: [
            { text: 'CANADA', correct: true},
            { text: 'CANADA', correct: true},
            { text: 'CANADA', correct: true},
            { text: 'CANADA', correct: true},
        ]
    },

    {
        question: 'Which is the saddest anime?',
        answers: [
            { text: 'Naruto', correct: false},
            { text: 'Neon Genesis', correct: true},
            { text: 'Madoka Magika', correct: true},
            { text: 'Pokémon', correct: false},
        ]
    },

]