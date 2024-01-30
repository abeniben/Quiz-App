const questions = [
    {
       question : "Which one of the following doesn't supprt OOP?",
       choices :  [
          {text:"C++", correct:false},
          {text:"C", correct:true},
          {text:"Python", correct:false},
          {text:"Java", correct:false}
       ]
    },
    {
        question : "What does it imply when an attribute is labeled 'Private' in OOP?",
       choices :  [
          {text:"It can be accessed using inheritance", correct:false},
          {text:"It can't be accessed by any means", correct:false},
          {text:"It can be accessed using Getter and Setter", correct:true},
          {text:"None", correct:false}
       ]
    },
    {
       question : "Which one of the following is not a programming Language?",
       choices :  [
          {text:"JavaScript", correct:false},
          {text:"R", correct:false},
          {text:"Go", correct:false},
          {text:"CSS", correct:true}
       ]
    },
    {
        question : "What do we use to inherit a class in C++?",
        choices :  [
           {text:"extends", correct:false},
           {text:"->", correct:false},
           {text:"inherit", correct:false},
           {text:":", correct:true}
        ]
     },
     {
        question : "Which of the following is used for testing purpose?",
        choices :  [
           {text:"Cypress", correct:true},
           {text:"Ruby", correct:false},
           {text:"React", correct:false},
           {text:"Git", correct:false}
        ]
     },
     {
        question : "Which of the following programming is the latest?",
        choices :  [
           {text:"Swift", correct:true},
           {text:"PHP", correct:false},
           {text:"Python", correct:false},
           {text:"JavaScript", correct:false}
        ]
     },
     {
        question : "What does the 'this' keyword do?",
        choices :  [
           {text:"Envokes the constructor os the same class", correct:true},
           {text:"Envokes the constructor of the super class", correct:false},
           {text:"Envokes the method of the super class", correct:false},
           {text:"Choice 1 and 3 are correct", correct:false}
        ]
     },
     
     {
        question : "Any field declared with keyword _______ is constant.(In Java)",
        choices :  [
           {text:"Constant", correct:false},
           {text:"Static", correct:false},
           {text:"Const", correct:false},
           {text:"Final", correct:true}
        ]
     },

     {
        question : "When evaluating an expression without parentheses, operands of the same precedence are evaluated:",
        choices :  [
           {text:"Randomly", correct:false},
           {text:"Right to left", correct:false},
           {text:"At the same time", correct:false},
           {text:"Left to right", correct:true}
        ]
     },
     {
        question : "The Parameter list in the method header and the method call arguementss must agree in:",
        choices :  [
           {text:"Number", correct:false},
           {text:"Order", correct:false},
           {text:"Type", correct:false},
           {text:"All are correct", correct:true}
        ]
     },
] 

const questionEl = document.getElementById('question')
const choiceBtns  = document.getElementById('choice-btn') 
const nextBtn = document.getElementById('next-btn')



let curQuestionCount = 0
let score = 0

//Starting Quiz
function startQuiz(){
    curQuestionCount = 0
    score = 0
    nextBtn.textContent = 'Next'
    showQuestion()
}

//Rendering the Question and Choices in their appropriate places
function showQuestion(){
    resetState()
    let curQuestion = questions[curQuestionCount]
    let questionNo = curQuestionCount + 1
    questionEl.textContent = questionNo + ') ' + curQuestion.question

    curQuestion.choices.forEach( choice => {
        const button = document.createElement('button')
        button.textContent = choice.text
        button.classList.add('btn')
        choiceBtns.append(button)
        if(choice.correct){
            button.dataset.correct = choice.correct
        }
        button.addEventListener('click', chooseAnswer)
    })
}

// Removes the div's first children which are the choice buttons

function resetState(){
    nextBtn.style.display = "none" 
    while(choiceBtns.firstChild){                        // We can avoid this block of code by removing the choice buttons in the Html document
    choiceBtns.removeChild(choiceBtns.firstChild)   
    }
}
//Styling the buttons depending on their correctness

function chooseAnswer(e){
    const selectedChoice = e.target 
    const isCorrect = selectedChoice.dataset.correct === 'true'
    if(isCorrect){
        selectedChoice.classList.add('correct')
        score++
    }
    else{
        selectedChoice.classList.add('incorrect')
    }
    Array.from(choiceBtns.children).forEach(button => {
        if(button.dataset.correct === 'true'){
            button.classList.add('correct')
        }
        button.disabled = true
         })
      nextBtn.style.display = "block"
}
//Displaying the next question

function handleNextBtn(){
  curQuestionCount++
  if(curQuestionCount < questions.length){
    showQuestion()
  }
  else{
    showScore()
  }
}
//Displaying the result by removing the last question first

function showScore(){
    resetState()
    questionEl.textContent = `You Scored ${score} out of ${questions.length}! `
    nextBtn.textContent = "Play Again"
    nextBtn.style.display = "block"
}

nextBtn.addEventListener('click', () => {
    if(curQuestionCount < questions.length){
        handleNextBtn()
    }else{
        startQuiz()
    }
})

//Quiz starting point 

startQuiz()