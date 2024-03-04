const questions = [
  {
    question: "In JavaScript, what is the full form of ‘DOM’?",
    options: ["Data Object Model", "Document Object Model", "Dynamic Object Management", "Detailed Object Mapping"],
    answer: 1,
  },
  {
    question: "What does the acronym 'URL' stand for in web addresses?",
    options: ["Uniform Resource Locator", "Universal Reference Link", "Unidirectional Resource Listing", "User Response Language"],
    answer: 0,
  },
  {
    question: "What does HTML stand for?",
    options: ["Hyperlink Text Markup Language", "Hypertext Transfer Protocol", "HyperText Markup Language", "High-Level Text Manipulation Language"],
    answer: 2,
  },
  {
    question: "In Python, what keyword is used to define a function?",
    options: ["func", "define", "def", "function"],
    answer: 2,
  },
  {
    question: "What does the 'HTTP' in 'HTTP Request' stand for?",
    options: ["HyperText Transfer Protocol", "High-Level Text Processing", "Hyperlink Text Transfer Protocol", "High-Level Transfer Process"],
    answer: 0,
  },
  {
    question: "What is the full form of 'JSON' in data interchange formats?",
    options: ["JavaScript Object Notation", "Java Serialized Object Notation", "JavaScript Object Networking", "Java Syntax Object Name"],
    answer: 0,
  },
  {
    question: "In Java, what does 'JVM' stand for in the context of running Java applications?",
    options: ["Java Virtual Machine", "Java Variable Manager", "JavaScript Virtual Module", "Java Visual Monitor"],
    answer: 0,
  },
  {
    question: "Which programming language is often used for creating dynamic and interactive web pages?",
    options: ["Java", "JavaScript", "Python", "C++"],
    answer: 1,
  },
  {
    question: "Which programming language is often used for developing Android apps?",
    options: ["Java", "Python", "C#", "Ruby"],
    answer: 2,
  },
];

const quiz = document.querySelector("#quiz");
const ansElement = document.querySelectorAll(".answer");
const [queElement, option1, option2, option3, option4] = document.querySelectorAll("#question", "#option1", "#option2", "#option3", "#option4");
const submitBtn = document.querySelector("#submit");
const nextBtn = document.querySelector("#next");

let curQuestion = 0;
let score = 0;
let timer;
let timerElement = document.getElementById("timer");
let totalSeconds = 120; // Set total quiz time in seconds
const displayQuestion = () => {
  const { question, options, answer } = questions[curQuestion];
  queElement.innerText = `${curQuestion + 1}: ${question}`;
  option1.innerText = options[0];
  option2.innerText = options[1];
  option3.innerText = options[2];
  option4.innerText = options[3];

  // Check if user has already answered this question
  const selectedOptionIndex = getSelectedOption();
  if (selectedOptionIndex !== undefined) {
    ansElement[selectedOptionIndex].checked = true;
  }
};

const startTimer = () => {
  timer = setInterval(() => {
    totalSeconds--;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    timerElement.innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    if (totalSeconds === 0) {
      clearInterval(timer);
      displayResult();
    }
  }, 1000);
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

const deselectAnswers = () => {
  ansElement.forEach((curElem) => curElem.checked = false);
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
prevBtn.addEventListener("click", () => {
  stopTimer();
  if (curQuestion > 0) {
    const selectedOptionIndex = getSelectedOption();
    if (selectedOptionIndex !== undefined) {
      // Update user's answer for the current question
      questions[curQuestion].userAnswer = selectedOptionIndex;
    }
    curQuestion--;
    displayQuestion();
    displayNextButton();
    startTimer();
  }
});

nextBtn.addEventListener("click", () => {
  stopTimer();
  const selectedOptionIndex = getSelectedOption();
  if (selectedOptionIndex === questions[curQuestion].answer) {
    score++;
  }
  curQuestion++;
  if (curQuestion < questions.length) {
    deselectAnswers();
    displayQuestion();
    displayNextButton();
    startTimer();
  } else {
    displayResult();
  }
});

submitBtn.addEventListener("click", () => {
  stopTimer();
  const selectedOptionIndex = getSelectedOption();
  if (selectedOptionIndex === questions[curQuestion].answer) {
    score++;
  }
  displayResult();
});


const displayResult = () => {
  quiz.innerHTML = `
    <link rel="stylesheet" type="text/css" href="SCORE.css"></link>
    <style>
      /* Your CSS styles for result section */
    </style>
    <div class="result">
      <h3>SCORE ${score}/${questions.length}</h3>
      <button class="reload-button" onclick="location.reload()">PLAY AGAIN</button>
      <a href="index.html" id="home"><button id="home-btn">HOME</button></a>
      <a href="review.html" id="review"><button id="review-btn">REVIEW</button></a>
    </div>
  `;
};

const startQuiz = () => {
  displayQuestion();
  displayNextButton();n
  startTimer();
};

startQuiz();
