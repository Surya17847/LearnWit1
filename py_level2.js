const questions=[
  {
    question: "In Python, what keyword is used to define a function?",
    options: ["func", "define", "def", "function"],
    answer: 2,
  },
  {
    question: "What is the purpose of the \"if\" statement in Python?",
    options: ["To create a loop", "To define a function", "To make a decision", "To perform arithmetic operations"],
    answer: 2,
  },
  {
    question: "How do you declare a variable in Python?",
    options: ["var x", "variable x", "x = 5", "declare x"],
    answer: 2,
  },
  {
    question: "Which of the following is a valid way to open and read a file in Python?",
    options: ["file.open(\"example.txt\", \"r\")", "open_file(\"example.txt\", \"read\")", "with open(\"example.txt\", \"r\") as file:", "read_file(\"example.txt\")"],
    answer: 2,
  },
  {
    question: "What does the \"len()\" function do in Python?",
    options: ["Returns the length of a string or list", "Returns the square root of a number", "Converts a string to lowercase", "Creates a new list"],
    answer: 0,
  },
  {
    question: "Which operator is used for exponentiation in Python?",
    options: ["^", "**", "//", "*"],
    answer: 1,
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

