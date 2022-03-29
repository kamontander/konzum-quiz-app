//  ▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
//  Parallax
//  ▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀

var scene = document.getElementById( 'scene' );
var parallaxInstance = new Parallax( scene, {
  // relativeInput: true
} );

// selecting all required elements
const welcomeScreen = document.querySelector( '.welcome-screen' );
const startBtn = document.querySelector( '.welcome-screen button' );
const infoBox = document.querySelector( '.info-box' );
const exitBtn = infoBox.querySelector( '.buttons .quit' );
const continueBtn = infoBox.querySelector( '.buttons .restart' );
const quizBox = document.querySelector( '.quiz-box' );
const resultBox = document.querySelector( '.result-box' );
const optionList = document.querySelector( '.option-list' );
const timeLine = document.querySelector('header .time-line' );
const timeText = document.querySelector( '.timer .time-left-txt' );
const timeCount = document.querySelector( '.timer .timer-sec' );

// if startQuiz button clicked
startBtn.onclick = ()=>{
  welcomeScreen.classList.remove( 'visible' ); // hide welcome screen
  infoBox.classList.add( 'visible' ); // show info box
}

// if exitQuiz button clicked
exitBtn.onclick = ()=>{
  infoBox.classList.remove( 'visible' ); // hide info box
  welcomeScreen.classList.add( 'visible' ); // show welcome screen
}

// if continueQuiz button clicked
continueBtn.onclick = ()=>{
  infoBox.classList.remove( 'visible' ); //hide info box
  quizBox.classList.add( 'visible' ); // show quiz box
  showQuestions( 0 ); // calling showQestions function
  queCounter( 1 ); // passing 1 parameter to queCounter
  startTimer( 15 ); // calling startTimer function
  startTimerLine( 0 ); // calling startTimerLine function
}

let timeValue =  15;
let totalTime = 0;
let queCount = 0;
let queNumb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const quitQuiz = resultBox.querySelector( '.buttons .quit' );
// const restartQuiz = resultBox.querySelector( '.buttons .restart' );

// // if restartQuiz button clicked
// restartQuiz.onclick = ()=>{
//   quizBox.classList.add( 'visible' ); // show quiz box
//   resultBox.classList.remove( 'visible' ); // hide result box
//   timeValue = 15;
//   totalTime = 0;
//   queCount = 0;
//   queNumb = 1;
//   userScore = 0;
//   widthValue = 0;
//   showQuestions( queCount ); // calling showQestions function
//   queCounter( queNumb ); // passing queNumb value to queCounter
//   clearInterval( counter ); // clear counter
//   clearInterval( counterLine ); // clear counterLine
//   startTimer( timeValue ); // calling startTimer function
//   startTimerLine( widthValue ); // calling startTimerLine function
//   timeText.textContent = 'Preostalo vrijeme'; // change the text of timeText to Time Left
//   nextBtn.classList.remove( 'show' ); // hide the next button
// }

// if quitQuiz button clicked
quitQuiz.onclick = ()=>{
  window.location.reload(); // reload the current window
}

const nextBtn = document.querySelector( 'footer .next-btn' );
const bottomQuesCounter = document.querySelector( 'footer .total-que' );

// if next question button clicked
nextBtn.onclick = ()=>{
  totalTime += timeValue - parseInt( timeCount.textContent );
  if ( queCount < questions.length - 1 ) { // if question count is less than total question length
    queCount++; // increment the queCount value
    queNumb++; // increment the queNumb value
    showQuestions( queCount ); // calling showQestions function
    queCounter( queNumb ); // passing queNumb value to queCounter
    clearInterval( counter ); // clear counter
    clearInterval( counterLine ); // clear counterLine
    startTimer( timeValue ); // calling startTimer function
    startTimerLine( widthValue ); // calling startTimerLine function
    timeText.textContent = 'Vrijeme'; // change the timeText to Time Left
    nextBtn.classList.remove( 'show' ); // hide the next button
  } else {
    clearInterval( counter ); // clear counter
    clearInterval( counterLine ); // clear counterLine
    showResult(); // calling showResult function
  }
}

// getting questions and options from array
function showQuestions( index ) {
  const queText = document.querySelector( '.que-text' );

  // creating a new span and div tag for question and option and passing the value using array index
  let queTag = '<span>'+ questions[ index ].question +'</span>';
  let optionTag = '';
  for ( let j = 0; j < questions[ index ].options.length; j++ ) {
    optionTag += '<div class="option"><span>'+ questions[ index ].options[ j ] +'</span></div>';
  }
  queText.innerHTML = queTag; // adding new span tag inside queTag
  optionList.innerHTML = optionTag; // adding new div tag inside optionTag

  const option = optionList.querySelectorAll( '.option' );

  // set onclick attribute to all available options
  for( i = 0; i < option.length; i++ ) {
    option[ i ].setAttribute( 'onclick', 'optionSelected(this)' );
  }
}
// creating the new div tags for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

// if user clicked on option
function optionSelected( answer ) {
  clearInterval( counter ); // clear counter
  clearInterval( counterLine ); // clear counterLine
  let userAns = answer.textContent; // getting user selected option
  let correcAns = questions[ queCount ].answer; // getting correct answer from array
  const allOptions = optionList.children.length; // getting all option items

  if ( userAns == correcAns ) { // if user selected option is equal to array's correct answer
    userScore += 1; // upgrading score value with 1
    answer.classList.add( 'correct' ); // adding green color to correct selected option
    // answer.insertAdjacentHTML( 'beforeend', tickIconTag ); // adding tick icon to correct selected option
    // console.log( 'Correct Answer' );
    // console.log( 'Your correct answer = ' + userScore );
  } else {
    answer.classList.add( 'incorrect' ); // adding red color to correct selected option
    // answer.insertAdjacentHTML( 'beforeend', crossIconTag ); // adding cross icon to correct selected option
    // console.log( 'Wrong answer' );

    for ( i = 0; i < allOptions; i++ ) {
      if( optionList.children[ i ].textContent == correcAns ) { // if there is an option which is matched to an array answer
        optionList.children[ i ].setAttribute( 'class', 'option correct' ); // adding green color to matched option
        // optionList.children[ i ].insertAdjacentHTML( 'beforeend', tickIconTag ); // adding tick icon to matched option
        // console.log( 'Auto selected correct answer.' );
      }
    }
  }
  for( i = 0; i < allOptions; i++ ) {
    optionList.children[ i ].classList.add( 'disabled' ); // once user select an option then disabled all options
  }
  nextBtn.classList.add( 'show' ); // show the next button if user selected any option
}

function showResult() {
  infoBox.classList.remove( 'visible' ); // hide info box
  quizBox.classList.remove( 'visible' ); // hide quiz box
  resultBox.classList.add( 'visible' ); // show result box
  const scoreText = resultBox.querySelector( '.score-text' );
  let scoreTag = '';
  if ( userScore > Math.ceil( questions.length * .3 ) ) { // if user scored more than 30%
    // creating a new span tag and passing the user score number and total question number
    scoreTag = '<p>Čestitamo! 🎉<br>Točno ste odgovorili na <span>' + userScore + '</span>&nbsp;od&nbsp;<span>' + questions.length + '</span>&nbsp;pitanja.</p>';
  } else if ( userScore > 1 ) { // if user scored more than 1
    scoreTag = '<p>Čestitamo! 😎<br>Točno ste odgovorili na <span>' + userScore + '</span>&nbsp;od&nbsp;<span>' + questions.length + '</span>&nbsp;pitanja.</p>';
  } else if ( userScore == 1 ) { // if user scored equals 1
    scoreTag = '<p>Ups! 😐<br>Točno ste odgovorili na samo <span>jedno</span>&nbsp;od&nbsp;<span>' + questions.length + '</span>&nbsp;pitanja.</p>';
  } else {
    scoreTag = '<p>Ups! 😒<br>Netočno ste odgovorili na sva pitanja.</p>';
  }
  scoreTag += '<p>Utrošeno vrijeme: <span>' + totalTime + '</span> sek.</p>';
  scoreText.innerHTML = scoreTag;
}

function startTimer( time ) {
  counter = setInterval( timer, 1000 );
  function timer() {
    timeCount.textContent = time; // changing the value of timeCount with time value
    time--; // decrement the time value
    if( time < 9 ) { // if timer is less than 9
      let addZero = timeCount.textContent;
      timeCount.textContent = '0' + addZero; // add a 0 before time value
    }
    if( time < 0 ) { // if timer is less than 0
      clearInterval( counter ); // clear counter
      timeText.textContent = 'Vrijeme je isteklo'; // change the time text to time off
      const allOptions = optionList.children.length; // getting all option items
      let correcAns = questions[ queCount ].answer; // getting correct answer from array
      for( i = 0; i < allOptions; i++ ) {
        if( optionList.children[ i ].textContent == correcAns ) { // if there is an option which is matched to an array answer
          optionList.children[ i ].setAttribute( 'class', 'option correct' ); // adding green color to matched option
          // optionList.children[ i ].insertAdjacentHTML( 'beforeend', tickIconTag ); // adding tick icon to matched option
          // console.log( 'Time Off: Auto selected correct answer.' );
        }
      }
      for( i = 0; i < allOptions; i++ ) {
        optionList.children[ i ].classList.add( 'disabled' ); // once user select an option then disabled all options
      }
      nextBtn.classList.add( 'show' ); // show the next button if user selected any option
    }
  }
}

function startTimerLine( time ) {
  let counterLineWidth = quizBox.offsetWidth;
  let counterLineInterval = timeValue * 1000 / counterLineWidth;
  counterLine = setInterval( timer, counterLineInterval );
  function timer() {
    time += 1; // upgrading time value with 1
    timeLine.style.width = time + "px"; // increasing width of timeLine with px by time value
    if( time > ( counterLineWidth - 1 ) ) { // if time value is greater than 549
      clearInterval( counterLine ); // clear counterLine
    }
  }
}

function queCounter( index ) {
  // creating a new span tag and passing the question number and total question
  let totalQueCounTag = '<span><p>'+ index +'.</p> od <p>'+ questions.length +'</p> pitanja</span>';
  bottomQuesCounter.innerHTML = totalQueCounTag;  // adding new span tag inside bottomQuesCounter
}
