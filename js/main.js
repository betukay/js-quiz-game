var questions = [
  new Question("What is six times eight?", ["56", "42", "54", "48"], "48"),
  new Question("What is the capital of Michigan?", ["Detroit", "Grand Rapids", "Ann Arbor","Lansing"],"Lansing"),
  new Question("Who invented the telephone?", ["Alexander Graham Bell", "Thomas Edison", "Nikola Tesla", "Michael Faraday"], "Alexander Graham Bell"),
  new Question("What's the largest planet in our solar system?", ["Uranus", "Saturn", "Jupiter", "the Sun"], "Jupiter"),
  new Question("How many continents are there?",["6", "7", "8", "10"],"7"),
  new Question("Which country is largest by land mass?", ["Canada", "China", "Russia", "United States"], "Russia"),
  new Question("What essential element do trees provide?", ["hydrogen", "oxygen", "nitrogen", "carbon"], "carbon"),
  new Question("Which ocean is the largest?", ["Pacific Ocean", "Atlantic", "Indian Ocean", "Arctic Ocean"], "Pacific Ocean"),
  new Question("Which year was Pearl Harbor bombed?", ["1940", "1941", "1942", "1943"], "1941"),
  new Question("What is the capital of North Carolina", ["Charlotte", "Durham", "Raleigh", "Charleston"], "Raleigh"),
]

var quiz = new Quiz (questions);

//----------------------------------------------------
//              Quiz Constructor
//----------------------------------------------------

function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function (){
  return this.questions[this.questionIndex];
}

Quiz.prototype.isEnded = function (){
  return this.questions.length === this.questionIndex;
}

Quiz.prototype.guess = function(answer){
  if(this.getQuestionIndex().rightAnswer(answer)){
    this.score += 10;
  }
  this.questionIndex++;
}

//----------------------------------------------------
//              Question Constructor/ Functions
//----------------------------------------------------

function Question(text, choices, answer){
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.rightAnswer = function(choice){
  return choice === this.answer;
}

function populate(){
  if(quiz.isEnded()){
    showScores();
  }
  else {
    //show questions
    var el = document.getElementById("question");
    el.innerHTML = quiz.getQuestionIndex().text;

    //show choices
    var choices = quiz.getQuestionIndex().choices;
    for(var i = 0; i< choices.length; i++){
      var element = document.getElementById("choice" + i);
      element.innerHTML = choices[i];
      guess("btn" + i, choices[i]);
    }

    showProgress();
  }
}

function guess(id, guess){
  var button = document.getElementById(id);
  button.onclick = function() {
    quiz.guess(guess);
    populate();
  }
}

function showProgress(){
  var currentQuestionNum = quiz.questionIndex + 1;
  var el = document. getElementById("progress");
  el.innerHTML = "Question " + currentQuestionNum + " of " + quiz.questions.length
}

//----------------------------------------------------
//              Score Function
//----------------------------------------------------

function showScores(){
  var gameOver = "<h1>Result</h1>";
  gameOver +=  "<h2 id='score'> Your score: " + quiz.score + "%" + "</h2>";

  if(quiz.score > 10 && quiz.score <= 40){
    gameOver += "<p>Time to hit the books!</p>"
  }

  if(quiz.score > 40 && quiz.score <= 60){
    gameOver += "<p>Better luck next time!</p>"
  }

  if(quiz.score > 60 && quiz.score <= 90){
    gameOver += "<p>You still got it!</p>"
  }

  if(quiz.score === 100){
    gameOver += "<p>Wow! You're an exceptional student!</p>"
  }

  var el = document.getElementById("quiz");
  el.innerHTML = gameOver;

  var el2 = document. getElementById("progress");
  el2.innerHTML = "";
}

populate();
