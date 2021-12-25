$(document).foundation();

$( document ).ready(function() {

  // initial variables
  var validationPassed = true;
  const quizContainer = $('#quiz');
  const resultsContainer = $('#results');
  const submitButton = $('#submit');
  const myQuestions = [
    {
      heading: "dirt",
      questionAlt: "Myron leaning on a raised garden bed",
      answerAlt: "Myron holding a worm",
      question: "You encounter a rectangular shaped container with wood sides and dirt in the middle. There are some plants growing from the dirt. What do you do first?",
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
      heading: "eating",
      questionAlt: "closeup of three pieces of vada",
      answerAlt: "Myron holding a piece of vada, with another piece he bit out of on the plate",
      question: "You see three pieces of crispy donut-shaped food in front of you, alongside a container of soup. How do you eat this meal?",
      answers:{
        a: "One piece at a time, eating the whole piece before moving to the next one",
        b: "One piece at a time, taking little bites in a circular formation around the perimiter",
        c: "Take one bite out of each piece",
        d: "Dip the piece into the soup and then eat the whole piece"
      },
      correctAnswer: "c",
      correctness: false
    },
    {
      heading: "diaper",
      questionAlt: "cloth diapers in a pile",
      answerAlt: "Myron emerging from below pillows on a bed",
      question: "It's morning time. Your mama tells you that it's time to change your diaper and put on different clothes for the day. How do you respond?",
      answers:{
        a: "Run to a far away part of the house",
        b: "Hide among furniture",
        c: "Go upstairs to the diaper changing area",
        d: "Play with toys and pretend not to hear it"
      },
      correctAnswer: "b",
      correctness: false
    },
    {
      heading: "cups",
      questionAlt: "Myron at a dining table with two cups in frnot of him",
      answerAlt: "Myron lifting up one cup on top of another and attempting to drink from the top one",
      question: "There are two cups in front of you. You are thirsty. What do you do?",
      answers:{
        a: "Put one on top of the other. Hold the bottom one and try to drink from the top one.",
        b: "Drink from one of the straws",
        c: "Take the top off one of the cups and try to drink it like a big boy",
        d: "Turn one of the cups over and draw a picture with the liquid that drips out"
      },
      correctAnswer: "a",
      correctness: false
    },
    {
      heading: "table",
      questionAlt: "Myron and Molly sitting on couch, with folding end table visible",
      answerAlt: "Myron standing on upside down table, looking proud",
      question: "There is a folding end table in front of the couch. What do you try to do with it?",
      answers:{
        a: "Stand on it and use it as a surfboard",
        b: "Flip it over and use the legs as a ladder",
        c: "Hide under it",
        d: "Try to keep it upright and push it around the floor"
      },
      correctAnswer: "b",
      correctness: false
    },
    {
      heading: "pants",
      questionAlt: "Myron sitting with no clothes on",
      answerAlt: "Pants with one leg through the top and one leg through the bottom",
      question: "Mamma tells you to put your pants on. Do you:",
      answers:{
        a: "Put both legs through the top of your pants",
        b: "Put one leg through the top and one leg through the bottom",
        c: "Throw the pants on the floor and run away",
        d: "Put the pants on your head"
      },
      correctAnswer: "b",
      correctness: false
    },
    {
      heading: "fish",
      questionAlt: "Guppies swimming in a tank",
      answerAlt: "Myron and daycare classmates looking into fish tank",
      question: "There’s a large glass box with water and small fish swimming in it. How do you engage with it?",
      answers:{
        a: "Face the fish. Try to have a conversation with them by saying \“blub, blub\”.",
        b: "Feed the fish Play-Doh",
        c: "Put your toy truck in the water so that the fish can play with it",
        d: "Try to open the can of blood worms and dump the entire thing into the water"
      },
      correctAnswer: "a",
      correctness: false
    },
    {
      heading: "leaves",
      questionAlt: "Myron in raincoat in front of leaves",
      answerAlt: "Myron throwing leaves",
      question: "Papa is gathering a bunch of leaves into a pile with a long stick that has little hooks on the end of it. What do you do first?",
      answers:{
        a: "Jump in the pile",
        b: "Help gather the leaves, using a small brush",
        c: "Pick up a handful of leaves and throw them at Papa",
        d: "Help gather the leaves, using the long stick"
      },
      correctAnswer: "c",
      correctness: false
    },
    {
      heading: "cookies",
      questionAlt: "Myron watching Mama cut shapes into cookie dough",
      answerAlt: "Myron eating raw cookie dough",
      question: "Mama is making cookies by cutting some dough into shapes. How do you participate?",
      answers:{
        a: "Take a piece of dough and eat it",
        b: "Roll the dough into the shape of a snake and hiss",
        c: "Help flatten the dough with a rolling pin",
        d: "Add some Play-Doh so that you can have another color to work with"
      },
      correctAnswer: "a",
      correctness: false
    },
    {
      heading: "molly",
      questionAlt: "Molly inside a grocery bag",
      answerAlt: "Myron inside one bag, Molly inside another",
      question: "Molly is playing inside a grocery bag. How do you try to play with her?",
      answers:{
        a: "Put your hand in the bag",
        b: "Pick up the bag and carry it upright",
        c: "Pick up the bag and turn it over",
        d: "Get inside another bag next to her"
      },
      correctAnswer: "d",
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

    const questionsLength = myQuestions.length;

    //for each question
    myQuestions.forEach((currentQuestion, questionNumber)=> {

        //human centered question number
        const thisQuestionNumber = questionNumber+1;

        //variable to store possible answers
        const answers =[];

        //for each available answers
        for(letter in currentQuestion.answers){

          //add html radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}" disabled>
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
            <div class="large-12 cell subheader" id="progress">
              #${thisQuestionNumber} out of ${questionsLength}
            </div>
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

    //remove min height so we can make the quiz disappear
    $('.minheight').removeClass('minheight');

    //reset heading
    $('#title').html('Results');

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
                  <span class="answer-label">Your answer</span>, "${currentQuestion.answers[userAnswer]}": <span class="indicator">Correct</span>
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
              <h2 class="heading large-12 cell question-title">
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
                  <span class="answer-label">Your answer</span>, "${currentQuestion.answers[userAnswer]}": <span class="indicator">Incorrect</span>
                </div>
                <div class="correct-answer">
                  <span class="answer-label">Correct answer:</span> "${currentQuestion.answers[currentQuestion.correctAnswer]}"
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

    // hide the quizParent
    $('#quizParent').addClass('hide');

    //calculate percentage correct
    var ratio = (numCorrect / myQuestions.length);
    const percentage = ((numCorrect / myQuestions.length)*100) + '%';
    var resultsMessage = "Not bad.";

    if (ratio <= .5){
      resultsMessage = "The important thing is that you tried."
    } else if (ratio >.5 && ratio <.8){
      resultsMessage = "You did a good job."
    } else{
      resultsMessage = "That was amazing!"
    }

    //add message to top of results page
    output.unshift(
    `<div id="score">
      You got ${percentage} correct. ${resultsMessage} Let's review the answers.
    </div>`
    );

    //display output to html
    resultsContainer.html(output.join(''));
    $('#results-parent').removeClass('hide');

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
    $(slides[currentSlide]).removeClass('active-slide');
    $('button').removeClass('hide');
    $(slides[n]).addClass('active-slide');

    currentSlide = n;
    if(currentSlide === 0){
      previousButton.addClass('hide');
    }
    if(currentSlide === slides.length-1) {
      nextButton.addClass('hide');
    } else {
      submitButton.addClass('hide');
    }

    // for subsequent slides, run immediately
    setQuizHeight();

    // for first slide, wait until image loaded and run again
    $('.active-slide img').on('load', setQuizHeight);

    // enable fields on active slide
    $('.active-slide input').prop('disabled', false);

    //set focus
    $('.active-slide input').first().focus();

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
