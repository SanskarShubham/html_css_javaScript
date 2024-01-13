const questions = [
  {
    question: "Who is the Prime minister of India ?",
    answers: [
      { text: "Rahul Gandhi", correct: false },
      { text: "Narendra Modi", correct: true },
      { text: "Nitish Kumar", correct: false },
      { text: "Rahul Gandhi", correct: false },
    ],
  },
  {
    question: "Which is the largest animal in the earth ?",
    answers: [
      { text: "shark", correct: false },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
      { text: "Blue whale", correct: true },
    ],
  },
  {
    question: "which is the dippest ocean  ?",
    answers: [
      { text: "Indian Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
      { text: "Arctic Ocean", correct: false },
      { text: "Atlantic Ocean", correct: false },
    ],
  },
  {
    question: "How many colours in Indian flag Tiranga ?",
    answers: [
      { text: "1", correct: false },
      { text: "2", correct: false },
      { text: "3", correct: true },
      { text: "4", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  clearState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNO = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNO + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function clearState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
} 

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
     
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}
function showScore(){
    clearState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML ='Play Again'
    nextButton.style.display ='block';
}
function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    }else{
        showScore();
    }

}
nextButton.addEventListener('click',()=>{
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    }else{
        startQuiz();
    }
})

startQuiz();