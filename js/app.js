$(document).foundation();

$( document ).ready(function() {

    // define initial variables
    const quizContainer = $('#quiz');
    const resultsContainer = $('#results');
    const submitButton = $('#submit');
    const myQuestions =[
      {
        question:"You encounter a rectangular shaped container with wood sides and dirt in the middle. There are some plants growing from the dirt. What do you do first?",
        answers:{
          a: "Look for worms",
          b: "Find a watering can and pretend to water the dirt",
          c: "Pick up and throw the dirt as far as you can",
          d: "Pull out plants"
        },
        correctAnswer: "a"
      },
      {
        question:"You see three pieces of crispy donut-shaped food in front of you, alongside a container of soup. How do you eat this meal?",
        answers:{
          a: "One piece at a time, eating the whole piece before moving to the next one",
          b: "One piece at a time, taking little bites in a circular formation around the perimiter",
          c: "Take one bite out of each piece",
          d: "Dip the piece into the soup and then eat the whole piece"
        },
        correctAnswer: "c"
      }
    ]

    function buildQuiz(){
      const output = [];

      //for each question
      myQuestions.forEach((currentQuestion, questionNumber)=> {

          //variable to store possible answers
          const answers =[];

          //for each available answers
          for(letter in currentQuestion.answers){

            //add html radio button
            answers.push(
              `<label>
                <input type="radio" name="question${questionNumber}" value="${letter}">
                ${letter} :
                ${currentQuestion.answers[letter]}
              </label>`
            );
          }

          //add this question and its answers to the output
          output.push(
            `<div class="question">
              ${currentQuestion.question}
            </div>
            <div class="answers">
              ${answers.join('')}
            </div>`
          );
        }
      );

      // combine our output list into one string of HTML and put it on the page
      quizContainer.html(output.join(''));
    }

    function showResults(){

    }

    //display quiz right away
    buildQuiz();

    //on submit, show results
    submitButton.on('click', showResults);
});
