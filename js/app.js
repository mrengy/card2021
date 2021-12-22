$(document).foundation();

$( document ).ready(function() {

  // sliding functions

  // initial variables
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
      correctAnswer: "a",
      correctness: false
    },
    {
      question:"You see three pieces of crispy donut-shaped food in front of you, alongside a container of soup. How do you eat this meal?",
      answers:{
        a: "One piece at a time, eating the whole piece before moving to the next one",
        b: "One piece at a time, taking little bites in a circular formation around the perimiter",
        c: "Take one bite out of each piece",
        d: "Dip the piece into the soup and then eat the whole piece"
      },
      correctAnswer: "c",
      correctness: false
    }
  ]

  // build quiz and show results functions
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
          `<div class="slide cell">
            <div class="question">
              ${currentQuestion.question}
            </div>
            <div class="answers">
              ${answers.join('')}
            </div>
          </div>`
        );
      }
    );

    // combine our output list into one string of HTML and put it on the page
    quizContainer.html(output.join(''));
  }

  function showResults(){
    // gather answers from our quiz
    const answerContainers = $('.answers');

    //keep track of user's answers
    let numCorrect = 0;

    //clear old classes
    $('.correct, .incorrect').removeClass('correct incorrect');

    // for each question
    myQuestions.forEach( (currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // resetting correctness attribute
      currentQuestion['correctness'] = false;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;

          // add correct class
          $(answerContainers[questionNumber]).addClass('correct');
          currentQuestion['correctness'] = true;
      }
      else{
          // add incorrect class
          $(answerContainers[questionNumber]).addClass('incorrect');
          currentQuestion['correctness'] = false;
      }
      console.log(currentQuestion);

    });

    //show number of correct answers out of total
    resultsContainer.html(`${numCorrect} out of ${myQuestions.length}`);
  }

  // display quiz right away
  buildQuiz();

  // pagination
  const previousButton = $('#previous');
  const nextButton = $('#next');
  const slides = $('.slide');
  let currentSlide = 0;

  function setQuizHeight(){
    divHeight = $('.active-slide').height();
    $('#quiz').css({'height' : divHeight});
  }

  function showSlide(n) {
    //reset classes
    slides[currentSlide].classList.remove('active-slide');
    $('button').removeClass('none');
    slides[n].classList.add('active-slide');

    setQuizHeight();

    currentSlide = n;
    if(currentSlide === 0){
      previousButton.addClass('none');
    }
    if(currentSlide === slides.length-1) {
      nextButton.addClass('none');
    } else {
      submitButton.addClass('none');
    }
  }

  function showNextSlide(){
    showSlide(currentSlide + 1);
  }

  function showPreviousSlide(){
    showSlide(currentSlide - 1);
  }
  // show first slide
  showSlide(currentSlide);

  // event listeners
  previousButton.on('click', showPreviousSlide);
  nextButton.on('click', showNextSlide);
  submitButton.on('click', showResults);
  $(window).resize(setQuizHeight);
});
