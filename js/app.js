$(document).foundation();

$( document ).ready(function() {

  // initial variables
  var validationPassed = true;
  const quizContainer = $('#quiz');
  const resultsContainer = $('#results');
  const submitButton = $('#submit');
  const myQuestions =[
    {
      heading:"dirt",
      questionAlt: "Myron leaning on a raised garden bed",
      answerAlt: "Myron holding a worm",
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
      heading:"eating",
      questionAlt: "closeup of three pieces of vada",
      answerAlt: "Myron holding a piece of vada, with another piece he bit out of on the plate",
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

  // sets height of parent element to correct layout since there is absolute positioning involved
  function setQuizHeight(){
    divHeight = $('.active-slide').height();
    // set to 0 if undefined (happens if .active-slide is not present, like at end)
    if (typeof divHeight === 'undefined'){
      divHeight = 0;
    }
    $('#quiz').css({'height' : divHeight});
  }

  // avoiding some repetition when building html for respnsive images
  function responsiveImage(imgname, alt){
    return(`
      <img
         alt="${alt}"
         src="img/${imgname}_m.jpg"
         srcset="
            img/${imgname}_s.jpg 600w,
            img/${imgname}_m.jpg 1096w,
            img/${imgname}_l.jpg 1284w,
            img/${imgname}_xl.jpg 1540w,
         "
         sizes="
         (min-width: 1136px) 1096px,
         (min-width: 2048px) 1284px,
         (min-width: 2430px) 1540px,
         100vw
         "
      >
    `);
  }


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

        // get the image tag using this function
        const imageTag = responsiveImage(currentQuestion.heading+"-question", currentQuestion.questionAlt);

        //add this question and its answers to the output
        output.push(
          `<div class="slide grid-x grid-padding-x">
            <h2 class="heading large-12 cell question-title">
              ${currentQuestion.heading}
            </h2>
            <div class="question-image large-8 medium-6 small-12 cell">
              ${imageTag}
            </div>
            <div class="question-business large-4 medium-6 small-12 cell">
              <div class="question">
                ${currentQuestion.question}
              </div>
              <div class="form-error">
                That's not a choice. Please make a choice before continuing. These are your options.
              </div>
              <div class="answers">
                ${answers.join('')}
              </div>
            </div>
          </div>`
        );
      }
    );

    // combine our output list into one string of HTML and put it on the page
    quizContainer.html(output.join(''));

    // set quiz height initially
    setQuizHeight();
  }

  function showResults(){
    //go no further if we haven't passed validation
    validation();
    if(validationPassed == false){
      return false;
    }

    // gather answers from our quiz
    const answerContainers = $('.answers');

    //keep track of user's answers
    let numCorrect = 0;

    // build HTML of all questions and answers
    const output = [];

    // for each question
    myQuestions.forEach( (currentQuestion, questionNumber) => {
      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // resetting correctness attribute
      currentQuestion['correctness'] = false;

      // get the image tag using this function
      const imageTag = responsiveImage(currentQuestion.heading+"-answer", currentQuestion.questionAlt);

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
          // add to the number of correct answers
          numCorrect++;

          // set object as correct
          currentQuestion['correctness'] = true;

          // add question and answer to output
          output.push(
            `<div class="result-slide grid-x grid-padding-x correct">
              <h2 class="heading large-12 cell question-title">
                ${currentQuestion.heading}:
                <span class="indicator">
                  Correct
                </span>
              </h2>
              <div class="answer-image large-8 medium-6 small-12 cell">
                ${imageTag}
              </div>
              <div class="answer-business large-4 medium-6 small-12 cell">
                <div class="question">
                  ${currentQuestion.question}
                </div>
                <div class="user-answer">
                  Your answer, "${currentQuestion.answers[letter]}": <span class="indicator">Correct</span>
                </div>
              </div>
            </div>`
          )
      }
      else{
          // if answer incorrect
          // set object as incorrect
          currentQuestion['correctness'] = false;

          // add question and answer to output
          output.push(
            `<div class="result-slide grid-x grid-padding-x incorrect">
              <h2 class="heading large-12 cell">
                ${currentQuestion.heading}:
                <span class="indicator">
                  Incorrect
                </span>
              </h2>
              <div class="answer-image large-8 medium-6 small-12 cell">
                ${imageTag}
              </div>
              <div class="answer-business large-4 medium-6 small-12 cell">
                <div class="question">
                  ${currentQuestion.question}
                </div>
                <div class="user-answer">
                  Your answer, "${currentQuestion.answers[letter]}": <span class="indicator">Incorrect</span>
                </div>
                <div class="correct-answer">
                  Correct answer: "${currentQuestion.answers[currentQuestion.correctAnswer]}"
                </div>
              </div>
            </div>`
          )
      }

    }); // end of foreach


    // remove active slide class to hide the last question
    $('.active-slide').removeClass('active-slide');
    setQuizHeight();

    // hide all the buttons
    previousButton.addClass('hide');
    submitButton.addClass('hide');

    //calculate percentage correct
    const percentage = ((numCorrect / myQuestions.length)*100) + '%';

    //show number of correct answers out of total
    output.unshift(
    `<div id="score">
      You got ${percentage} correct. The important thing is that you tried. Let's review the answers.
    </div>`
    );

    //display output to html
    resultsContainer.html(output.join(''));

    //scroll to top
    window.scrollTo(0, 0);
  } // end of function

  // first run on page load
  buildQuiz();

  // pagination
  const previousButton = $('#previous');
  const nextButton = $('#next');
  const slides = $('.slide');
  let currentSlide = 0;

  function showSlide(n) {
    //reset classes
    slides[currentSlide].classList.remove('active-slide');
    $('button').removeClass('hide');
    slides[n].classList.add('active-slide');

    currentSlide = n;
    if(currentSlide === 0){
      previousButton.addClass('hide');
    }
    if(currentSlide === slides.length-1) {
      nextButton.addClass('hide');
    } else {
      submitButton.addClass('hide');
    }

    // set quiz height when active slide image is done loading
    $('.active-slide img').on('load', setQuizHeight);
  }

  function validation(){
    if( $('.active-slide input:radio').is(':checked') == false ){
      $('.active-slide .form-error').addClass('is-visible');
      validationPassed = false;
    } else{
      $('.is-visible').removeClass('is-visible');
      validationPassed = true;
    }
    setQuizHeight();
  }

  function showNextSlide(){
    //go no further if we haven't passed validation
    validation();
    if(validationPassed == false){
      return false;
    }

    showSlide(currentSlide + 1);
    $('#intro').addClass('fadeout');
  }

  function showPreviousSlide(){
    showSlide(currentSlide - 1);
  }

  // show first slide
  showSlide(currentSlide);

  // event listeners
  $('.active-slide input:radio').change(validation);
  previousButton.on('click', showPreviousSlide);
  nextButton.on('click', showNextSlide);
  submitButton.on('click', showResults);
  $(window).resize(setQuizHeight);
});
