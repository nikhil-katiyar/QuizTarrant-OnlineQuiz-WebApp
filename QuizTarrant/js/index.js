const start = document.getElementById('start');




start.addEventListener("click", function (){
    start.setAttribute('href',"../QuizTarrant/quiz.html");
});


let inputs1 = {
    numberques : 10,
    category : "GK",
    difficulty : "1"
};

console.log(inputs1);