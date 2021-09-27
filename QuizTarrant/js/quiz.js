const ques = document.querySelector("#question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
let question_no = document.getElementById("ques-no");
let scoreText = document.getElementById("score");
let progressBar = document.getElementById("progressBarFull");
const end = document.querySelector("#submit-btn");

let curr_ques = {};
let acceptingAnswers = false;
let score = 0;
let ques_count = 0;
let available_ques = [];

let questions = [
  {
    question: "Inside which HTML element do we put the JavaScript??",
    choice1: "<script>",
    choice2: "<javascript>",
    choice3: "<js>",
    choice4: "<scripting>",
    answer: 1,
  },
  {
    question:
      "What is the correct syntax for referring to an external script called 'xxx.js'?",
    choice1: "<script href='xxx.js'>",
    choice2: "<script name='xxx.js'>",
    choice3: "<script src='xxx.js'>",
    choice4: "<script file='xxx.js'>",
    answer: 3,
  },
  {
    question: " How do you write 'Hello World' in an alert box?",
    choice1: "msgBox('Hello World');",
    choice2: "alertBox('Hello World');",
    choice3: "msg('Hello World');",
    choice4: "alert('Hello World');",
    answer: 4,
  },
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

end.addEventListener("click", function () {
  end.setAttribute("href", "../QuizGame/end.html");
});

const startGame = () => {
  ques_count = 0;
  score = 0;
  available_ques = [...questions];
  getNewQuestion();
};

const getNewQuestion = () => {
  if (available_ques.length === 0 || ques_count >= MAX_QUESTIONS) {
    //go to the end page
    return window.location.assign("../QuizGame/end.html");
  }
  ques_count++;
  question_no.innerText = `${ques_count}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBar.style.width = `${(ques_count / MAX_QUESTIONS) * 100}%`;
  let q_no = Math.floor(Math.random() * available_ques.length);
  curr_ques = available_ques[q_no];
  ques.innerText = curr_ques.question;

  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = curr_ques["choice" + number];
  });
  available_ques.splice(q_no, 1);
  acceptingAnswers = true;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (el) => {
    // console.log(el.target);
    if (!acceptingAnswers) return;
    acceptingAnswers = false;
    const selectedChoice = el.target;
    const selectedAnswer = selectedChoice.dataset["number"];
    const classToApply =
      selectedAnswer == curr_ques.answer ? "correct" : "incorrect";
    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }
    selectedChoice.classList.add(classToApply);

    // A higher order function in JS to set delay for a code, second parameter is delay in ms
    setTimeout(() => {
      selectedChoice.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

startGame();
