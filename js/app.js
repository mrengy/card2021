$(document).foundation();

$( document ).ready(function() {

    // define initial variables
    const quizContainer = $('#quiz');
    const resultsContainer = $('#results');
    const submitButton = $('#submit');
    const myQuestions =[
      {
        question:"",
        answers:{
          a: "",
          b: "",
          c: "",
          d: ""
        },
        correctAnswer: "c"
      }
    ]

    function buildQuiz(){

    }

    function showResults(){

    }

    //display quiz right away
    buildQuiz();

    //on submit, show results
    submitButton.on('click', showResults);
});
