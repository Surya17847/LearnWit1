const questions=[
  {
    question: "How do you define a function in Python?",
    options: ["func myFunction():", "def myFunction():", "define myFunction():", "function myFunction():"],
    answer: 1,
  },
  {
    question: "What is Python primarily known for?",
    options: ["Web development", "Data science and machine learning", "Game development", "All of the above"],
    answer: 3,
  },
  {
    question: "What is Python?",
    options: ["A type of snake", "A programming language", "A data structure", "A software application"],
    answer: 1,
  },
  {
    question: "How do you write a comment in Python?",
    options: ["//This is a comment", "/*This is a comment*/", "#This is a comment", "'This is a comment'"],
    answer: 2,
  },
  {
    question: "Which function is used to get user input in Python?",
    options: ["get()", "input()", "user_input()", "read()"],
    answer: 1,
  },
  {
    question: "What is the correct way to write a Python function named 'multiply' that takes two parameters?",
    options: ["function multiply(a, b):", "def multiply(a, b):", "define multiply(a, b):", "func multiply(a, b):"],
    answer: 2,
  },
  {
    question: "Which data type is used to store a sequence of characters in Python?",
    options: ["int", "float", "str", "list"],
    answer: 2,
  },
]
;

const quiz = document.querySelector("#quiz");
const ansElement = document.querySelectorAll(".answer");
const [queElement, option1, option2, option3] = document.querySelectorAll("#question", ".option1", "option2", ".option3");
const nextBtn = document.querySelector("#next");
const submitBtn = document.querySelector("#submit");
// const reviewBtn = document.querySelector("#review");
const timerElement = document.querySelector("#timer");

let curQuestion = 0;
let score = 0;
let timer; // Declare timer variable
let timings = [];

const displayQuestion = () => {
startTimer();
const { question, options } = questions[curQuestion];
queElement.innerText = `${curQuestion + 1}: ${question}`;
options.forEach((curOption, index) => (window[`option${index + 1}`].innerText = curOption));

// startTimer(); // Start the timer when displaying a new question
};

const startTimer = () => {
let seconds = 0;
timer = setInterval(() => {
  timerElement.innerText = `Time Spent: ${formatTime(seconds)}`;
  seconds++;
}, 1000);
};

const formatTime = (seconds) => {
const minutes = Math.floor(seconds / 60);
const remainingSeconds = seconds % 60;
return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const stopTimer = () => {
clearInterval(timer);
};

const getSelectedOption = () => {
let ansIndex;
ansElement.forEach((curOption, index) => {
  if (curOption.checked) {
    ansIndex = index;
  }
});
return ansIndex;
};
// const getSelectedAnswer = (index) => {
//   const selectedOptionIndex = getSelectedOption();
//   return selectedOptionIndex !== undefined ? questions[index].options[selectedOptionIndex] : 'Not attempted';


// };

const deselectAnswers = () => {
ansElement.forEach((curElem) => (curElem.checked = false));
};


const displayResult = () => {
const totalQuestions = questions.length;
const marksObtained = score;
const incorrectAnswers = totalQuestions - marksObtained;
const correctPercentage = ((marksObtained / totalQuestions) * 100).toFixed(2);
const incorrectPercentage = ((incorrectAnswers / totalQuestions) * 100).toFixed(2);

quiz.innerHTML = `
  <link rel="stylesheet" type="text/css" href="styles.css"></link>
  <div class="result">
    <h3>Your score is ${marksObtained}/${totalQuestions}</h3>
    <button class="reload-button" onclick="location.reload()">Play Again</button>
    <a href="index.html" id="home"><button id="home-btn">HOME</button></a>
    <canvas id="pieChart" width="250" height="250"></canvas>
  
  </div>
`;

// const reviewBtn = document.querySelector("#review-btn");
// reviewBtn.addEventListener("click", displayReview);

// Generate the pie chart
const pieChartCanvas = document.getElementById("pieChart");
const ctx = pieChartCanvas.getContext("2d");
new Chart(ctx, {
  type: "pie",
  data: {
    labels: ["Correct", "Incorrect"],
    datasets: [{
      label: "Quiz Result",
      data: [marksObtained, incorrectAnswers],
      backgroundColor: ["green", "red"]
    }]
  },
  options: {
    responsive: false,
    title: {
      display: true,
      text: "Quiz Result"
    }
  }
});
// const reviewBtn = document.querySelector("#review-btn");
// reviewBtn.addEventListener("click", displayReview);
};




// const displayReview = () => {
//   let reviewHTML = '';
//   questions.forEach((question, index) => {
//     reviewHTML += `
//       <div class="review-question">
//         <p>${index + 1}. ${question.question}</p>
//         <p>Correct Answer: ${question.options[question.answer]}</p>
//         <p>Your Answer: ${getSelectedAnswer(index)}</p>
//         <p>Time Spent: ${timings[index]}</p>
//       </div>
//     `;
//   });

//   quiz.innerHTML += reviewHTML;
// };

// const getSelectedAnswer = (index) => {
//   const selectedOptionIndex = questions[index].answer;
//   return ansElement[selectedOptionIndex].checked ? questions[index].options[selectedOptionIndex] : 'Not attempted';
// };

// const getSelectedAnswer = (index) => {
//   const selectedOptionIndex = getSelectedOption();
//   return selectedOptionIndex !== undefined ? questions[index].options[selectedOptionIndex] : 'Not attempted';


// };

const displayNextButton = () => {
if (curQuestion === questions.length - 1) {
  submitBtn.style.display = "block";
  nextBtn.style.display = "none";
} else {
  submitBtn.style.display = "none";
  nextBtn.style.display = "block";
}
};

nextBtn.addEventListener("click", () => {
stopTimer(); // Stop the timer when moving to the next question
const selectedOptionIndex = getSelectedOption();
if (selectedOptionIndex === questions[curQuestion].answer) {
  score++;
}
timings.push(timerElement.innerText);
curQuestion++;
if (curQuestion < questions.length) {
  deselectAnswers();
  displayQuestion();
  displayNextButton(); // Display next button if it's not the last question
} else {
  displayResult();
}
});

submitBtn.addEventListener("click", () => {
const selectedOptionIndex = getSelectedOption();
if (selectedOptionIndex === questions[curQuestion].answer) {
  score++;
}
timings.push(timerElement.innerText);
timerElement.style.display = "None"; 
stopTimer(); // Stop the timer when submitting answer
displayResult();
});

const startQuiz = () => {

displayQuestion();
displayNextButton();
};

// Start the quiz when the page loads
startQuiz();
