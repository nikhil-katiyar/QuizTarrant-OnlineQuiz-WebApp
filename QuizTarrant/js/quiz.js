const quesText = document.querySelector("#question");
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

let questions = [];

//Fetching Questions from Api Database Link 
//fetch returns a promise and then .json() method converts its body to json file
//then this returned json of questions is stored in loadedQuestions variable
//then we assign the questions array to loadedQuestions and start the game
fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy")
  .then((res) => {
    // console.log(res);
    return res.json();
  })
  .then((loadedQuestions) => {
    console.log(loadedQuestions.results);
    questions = loadedQuestions.results.map((loaded_ques) => {
      //Created a formatted ques object to make it the type of object which we actualy use in the app
      const formatted_ques = {
        question: loaded_ques.question,
      };
      const answerChoices = [...loaded_ques.incorrect_answers];

      // Generates the random index for our correct answer
      formatted_ques.answer = Math.floor(Math.random() * 4) + 1;

      //We here use splice method to insert the correct answer in our answerchoices array
      answerChoices.splice(
        formatted_ques.answer - 1,
        0,
        loaded_ques.correct_answer
      );

      //Inserting new properties as choiceq, choice2, choice3 and choice4 in our object
      answerChoices.forEach((choice, index) => {
        formatted_ques["choice" + (index + 1)] = choice;
      });
      return formatted_ques;
    });
    startGame();
  })
  .catch((err) => {
    console.error(err);
  });

const CORRECT_BONUS = 5;
let MAX_QUESTIONS = 3;

end.addEventListener("click", function () {
  end.setAttribute("href", "../QuizTarrant/end.html");
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
    return window.location.assign("../QuizTarrant/end.html");
  }
  ques_count++;
  //Update question number
  question_no.innerText = `${ques_count}/${MAX_QUESTIONS}`;

  //Update the progress bar
  progressBar.style.width = `${(ques_count / MAX_QUESTIONS) * 100}%`;

  //Selecting random question from availiable questions array
  let q_no = Math.floor(Math.random() * available_ques.length);
  curr_ques = available_ques[q_no];

  //Displaying selected question to the question text
  quesText.innerText = curr_ques.question;

  //Displaying choices text to every choice number using data-* attribute
  choices.forEach((choice) => {
    const number = choice.dataset["number"];
    choice.innerText = curr_ques["choice" + number];
  });

  //Delete the current displayed question from available questions array
  available_ques.splice(q_no, 1);
  acceptingAnswers = true;
};

incrementScore = (num) => {
  score += num;
  scoreText.innerText = score;
};

choices.forEach((choice) => {
  choice.addEventListener("click", (el) => {
    // console.log(el.target);
    if (!acceptingAnswers) return;
    acceptingAnswers = false;

    //.target gives us the element which is clicked
    const selectedChoice = el.target;

    // picking up the data-number attribute of selected choice
    const selectedAnswer = selectedChoice.dataset["number"];

    //Setting class to apply correct/incorrect on basis of if data-number of selected choice matches the answer of curr question
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
