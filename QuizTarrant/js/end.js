let score;
let percent;
const finalScore = document.getElementById('final-score');
const percentageText = document.getElementById('percentText');
let progressBar = document.getElementById("progressBarFull");

let locallist = window.localStorage.getItem("score");
if (locallist) {
  score = JSON.parse(locallist);
}

locallist = window.localStorage.getItem("percentage");
if (locallist) {
  percent = JSON.parse(locallist);
}

localStorage.clear();

finalScore.innerText = score;
percentageText.innerText = percent + "%";
progressBar.style.width = `${percent}%`;