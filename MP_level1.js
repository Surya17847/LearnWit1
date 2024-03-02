const questions = [
  {
    question: "What does CPU stand for?",
    options: ["Central Processing Unit", "Computer Processing Unit", "Central Processor Unit", "Central Printed Unit"],
    answer: 0,
  },
  {
    question: "Which company produced the first microprocessor?",
    options: ["Intel", "AMD", "Motorola", "IBM"],
    answer: 0,
  },
  {
    question: "What is the primary function of the ALU (Arithmetic Logic Unit)?",
    options: ["Data storage", "Mathematical operations", "Control flow", "Input/output operations"],
    answer: 1,
  },
  {
    question: "Which microprocessor is often referred to as the 'heart' of the computer?",
    options: ["Intel 8086", "Zilog Z80", "Motorola 68000", "AMD Ryzen"],
    answer: 0,
  },
  {
    question: "What does RAM stand for?",
    options: ["Random Access Memory", "Read-Only Memory", "Run Arithmetic Memory", "Real-time Allocation Memory"],
    answer: 0,
  },
  {
    question: "Microprocessor is a unit that controls ___________.",
    options: [
      "Microcomputer",
      "Macro computer",
      "Input-output devices",
      "System on chip"
    ],
    answer: 0,
  },
  {
    question: "ALU stands for ________.",
    options: [
      "Arithmetic logical unit",
      "Addition logic unit",
      "Adders logic unit",
      "None of the above"
    ],
    answer: 0,
  },
  {
    question: "What is the function of ALU?",
    options: [
      "Used to perform arithmetic operations",
      "To perform adition and substraction only",
      "Both a and b",
      "None of the above"
    ],
    answer: 2,
  },
  {
    question: "Which of the following are the components of a microprocessor?",
    options: [
      "ALU",
      "Register array",
      "Control unit",
      "All the above"
    ],
    answer: 3,
  },
  {
    question: "Which of the following statement is related to the register array?",
    options: [
      "It consists of registers like B, C, D, E, H, L",
      "It consists of an accumulator",
      "Both a and b",
      "None of the above"
    ],
    answer: 2,
  },
];
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
}