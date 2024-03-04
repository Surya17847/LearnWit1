const questions=[{
  question: "In microprocessor terminology, what does the term 'pipeline' refer to?",
  options: ["A series of tubes", "A sequence of instructions", "Parallel processing units", "Data transfer speed"],
  answer: 2,
},
{
  question: "Which microprocessor architecture is commonly used in modern computers?",
  options: ["CISC", "RISC", "VLIW", "MISC"],
  answer: 1,
},
{
  question: "What is a microcode?",
  options: ["Low-level programming language", "Firmware controlling the microprocessor", "Random number generator", "Cache memory"],
  answer: 1,
},
{
  question: "Which instruction in assembly language is used for unconditional jump?",
  options: ["JZ", "JMP", "CALL", "RET"],
  answer: 1,
},
{
  question: "What is the purpose of the MMU (Memory Management Unit)?",
  options: ["Data encryption", "Memory protection and translation", "Floating-point arithmetic", "DMA control"],
  answer: 1,
},
{
  question: "Which of the following is not a typical function of the control unit in a microprocessor?",
  options: [
  "Fetching instructions from memory",
  "Decoding instructions",
  "Executing arithmetic operations",
  "Storing results in memory"
  ],
  answer: 2,
  },
  {
  question: "What is the purpose of the ALU (Arithmetic Logic Unit) in a microprocessor?",
  options: [
  "To perform mathematical and logical operations",
  "To fetch instructions from memory",
  "To decode instructions",
  "To store data temporarily"
  ],
  answer: 0,
  },
  {
  question: "Which architecture is typically associated with the Intel x86 microprocessors?",
  options: [
  "CISC (Complex Instruction Set Computing)",
  "RISC (Reduced Instruction Set Computing)",
  "MIPS (Microprocessor without Interlocked Pipeline Stages)",
  "ARM (Advanced RISC Machine)"
  ],
  answer: 0,
  },
  {
  question: "What does the term 'clock speed' refer to in the context of microprocessors?",
  options: [
  "The number of instructions executed per second",
  "The time taken to execute an instruction",
  "The speed of data transfer between the microprocessor and memory",
  "The frequency at which the microprocessor executes instructions"
  ],
  answer: 3,
  },
  {
  question: "Which of the following is a characteristic of pipelining in microprocessors?",
  options: [
  "It reduces the complexity of instruction set architecture",
  "It increases the latency of instruction execution",
  "It allows multiple instructions to be processed simultaneously",
  "It eliminates the need for a cache memory"
  ],
  answer: 2,
  }
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
  <link rel="stylesheet" type="text/css" href="SCORE.css"></link>
  <style>
  .quizz{
    padding:110px;
    padding-top:200px;
  }
    .result {
      background-color: #f2f2f2;
      border: 1px solid #ddd;
      border-radius: 5px;
      padding: 20px;
      text-align: center;
    }
    .result h3 {
      color: #333;
      font-size: 24px;
      margin-bottom: 20px;
    }
    .result button {
      background-color: #4CAF50;
      border: none;
      color: white;
      padding: 10px 20px;
      text-align: center;
      text-decoration: none;
      display: inline-block;
      font-size: 16px;
      margin: 4px 2px;
      cursor: pointer;
      border-radius: 5px;
    }
    .result button:hover {
      background-color: #3e8e41;
    }
    #home-btn, #review-btn {
      margin-top: 20px;
      margin-right: 10px;
    }
  </style>
  <div class="result">
    <h3>Your score is ${marksObtained}/${totalQuestions}</h3>
    <button class="reload-button" onclick="location.reload()">Play Again</button>
    <a href="index.html" id="home"><button id="home-btn">HOME</button></a>
    <a href="review.html" id="review"><button id="review-btn">REVIEW</button></a>
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

