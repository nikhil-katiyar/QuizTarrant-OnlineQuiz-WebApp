const start = document.getElementById("start");
const numberques = document.getElementById("number-ques");
const category = document.getElementById("subject");
const difficulty = document.getElementById("difficulty");
let inputs = {
  numberques: numberques,
  category: category,
  difficulty: difficulty,
};
// console.log(inputs.numberques.value)

start.addEventListener("click", function () {
  let a = inputs.category.options[inputs.category.selectedIndex].value;
  let b = inputs.difficulty.options[inputs.difficulty.selectedIndex].value;

  window.localStorage.setItem(
    "formNumber",
    JSON.stringify(inputs.numberques.value)
  );
  window.localStorage.setItem("formCategory", JSON.stringify(a));
  window.localStorage.setItem("formDifficulty", JSON.stringify(b));
  start.setAttribute("href", "../QuizTarrant/quiz.html");
});

// let inputs1 = {
//   numberques: 10,
//   category: "GK",
//   difficulty: "1",
// };

// let inputs1 = {};

// let locallist = window.localStorage.getItem("formInputs");
// if (locallist) {
//   inputs1 = JSON.parse(locallist);
// }

// localStorage.clear();
// console.log(inputs1);
