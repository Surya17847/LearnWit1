const questions=[{
    question: "What is the significance of Von Neumann architecture in microprocessors?",
    options: ["Parallel processing", "Pipelining", "Separate data and instruction memory", "Integrated graphics processing"],
    answer: 2,
  },
  {
    question: "What is the role of a cache memory in a microprocessor?",
    options: ["Temporary storage of frequently used data", "Long-term storage of data", "Real-time processing", "Virtual memory management"],
    answer: 0,
  },
  {
    question: "Which microprocessor introduced the x86 architecture?",
    options: ["Intel 8086", "Motorola 68000", "Zilog Z80", "ARM Cortex-A9"],
    answer: 0,
  },
  {
    question: "What is the purpose of the control unit in a microprocessor?",
    options: ["Arithmetic operations", "Data storage", "Instruction execution control", "Input/output operations"],
    answer: 2,
  },
  {
    question: "Which microprocessor had a significant impact on the development of personal computers?",
    options: ["Intel 4004", "Zilog Z80", "Motorola 68000", "AMD Ryzen"],
    answer: 0,
  },
  {
    question: "Which of the following is not a characteristic of RISC (Reduced Instruction Set Computing) architecture?",
    options: [
    "Large set of instructions",
    "Simplified instruction set",
    "Single cycle execution",
    "Higher clock frequencies"
    ],
    answer:0,
    },
    {
    question: "Which of the following addressing modes is typically not found in microprocessor architectures?",
    options: [
    "Direct addressing mode",
    "Indexed addressing mode",
    "Indirect addressing mode",
    "Complex addressing mode"
    ],
    answer: 3,
    },
    {
    question: "In microprocessor design, what does the term 'pipeline stall' refer to?",
    options: [
    "An advanced feature for optimizing pipeline throughput",
    "A situation where the pipeline must wait for a preceding instruction to complete",
    "A technique to reduce pipeline hazards",
    "A condition where the pipeline speed exceeds the memory bandwidth"
    ],
    answer: 1,
    },
    {
    question: "Which of the following is a common technique used for reducing power consumption in microprocessors?",
    options: [
    "Increasing clock frequency",
    "Increasing transistor count",
    "Implementing dynamic voltage and frequency scaling (DVFS)",
    "Adding more pipeline stages"
    ],
    answer: 2,
    },
    {
    question: "What is the purpose of the Memory Management Unit (MMU) in a microprocessor?",
    options: [
    "To manage the cache hierarchy",
    "To handle interrupts and exceptions",
    "To translate virtual addresses to physical addresses",
    "To control the data flow between the CPU and peripherals"
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

