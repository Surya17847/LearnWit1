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

const prevBtn = document.querySelector("#prev");
const quiz = document.querySelector("#quiz");
const ansElement = document.querySelectorAll(".answer");
const [queElement, option1, option2, option3] = document.querySelectorAll("#question", "#option1", "#option2", "#option3");
const nextBtn = document.querySelector("#next");

let curQuestion = 0;
let score = 0;
let timer;
let timings = [];

const displayPrevButton = () => {
  prevBtn.style.display = curQuestion === 0 ? "none" : "block";
};

const displayQuestion = () => {
  const { question, options } = questions[curQuestion];
  queElement.innerText = `${curQuestion + 1}: ${question}`;
  options.forEach((curOption, index) => {
      window[`option${index + 1}`].innerText = curOption;
      ansElement[index].checked = false; // Reset radio button state
  });
  startTimer();
  displayPrevButton();
};

const startTimer = () => {
  let seconds = getStoredTime();
  timer = setInterval(() => {
      timerElement.innerText = `Time Spent: ${formatTime(seconds)}`;
      seconds++;
  }, 1000);
};

const getStoredTime = () => {
  if (curQuestion == 0) {
      return 0;
  } else {
      return timings[curQuestion];
  }
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

const showNextQuestion = () => {
  const selectedOption = getSelectedOption();
  // Check if no option is selected
  if (selectedOption === undefined) {
      // Proceed to the next question without checking the answer
      timings[curQuestion] = getStoredTime();
      curQuestion++;
      if (curQuestion === questions.length) {
          stopTimer();
          displayResult();
      } else {
          displayQuestion();
      }
      return;
  }
  if (selectedOption === questions[curQuestion].answer) {
      score++;
  }
  timings[curQuestion] = getStoredTime();
  curQuestion++;
  if (curQuestion === questions.length) {
      stopTimer();
      displayResult();
  } else {
      displayQuestion();
  }
};

const showPrevQuestion = () => {
  timings[curQuestion] = getStoredTime();
  curQuestion--;
  displayQuestion();
};

nextBtn.addEventListener("click", showNextQuestion);
prevBtn.addEventListener("click", showPrevQuestion);

displayQuestion();
