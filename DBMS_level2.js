const questions = [
  {
    question: "Explain the difference between a primary key and a foreign key.",
    options: ["Primary key uniquely identifies a record in the table, while foreign key links two tables together.", "Foreign key uniquely identifies a record, while primary key establishes relationships.", "Primary key allows duplicate values, while foreign key does not.", "Foreign key is used for indexing, while primary key is used for sorting."],
    answer: 0,
  },
  {
    question: "What is the ACID property in DBMS?",
    options: ["Atomicity, Consistency, Isolation, Durability", "Accuracy, Completeness, Integrity, Durability", "Aggregation, Consistency, Isolation, Dependency", "Atomicity, Connectivity, Isolation, Durability"],
    answer: 0,
  },
  {
    question: "Explain the concept of a view in a database.",
    options: ["A virtual table based on the result of a SELECT query.", "A physical table containing aggregated data.", "A temporary storage for complex queries.", "An index created for faster retrieval."],
    answer: 0,
  },
  {
    question: "What is a stored procedure?",
    options: ["A set of SQL statements stored in the database and executed together.", "A trigger that fires when data is updated.", "A table with pre-defined data.", "A constraint for enforcing data integrity."],
    answer: 0,
  },
  {
    question: "Explain the difference between OLAP and OLTP.",
    options: ["OLAP is for data analysis, OLTP is for transaction processing.", "OLTP is for data analysis, OLAP is for transaction processing.", "OLAP and OLTP are the same.", "OLTP is for indexing, OLAP is for sorting."],
    answer: 0,
  },
  {
    question: "Which of the following is not a type of database model?",
    options: ["Relational", "Hierarchical", "Sequential", "Network"],
    answer: 2,
  },
  {
    question: "In DBMS, which normal form deals with the concept of fully functional dependency?",
    options: ["First Normal Form (1NF)", "Second Normal Form (2NF)", "Third Normal Form (3NF)", "Boyce-Codd Normal Form (BCNF)"],
    answer:2,
  },
  {
    question: "Which SQL command is used to remove a relation schema from an SQL database?",
    options: ["REMOVE SCHEMA", "DROP TABLE", "DELETE TABLE", "REMOVE TABLE"],
    answer: 1,
  },
  {
    question: "In database terminology, what does ACID stand for?",
    options: ["Atomicity, Consistency, Isolation, Durability", "Association, Connection, Interaction, Dependency", "Access, Control, Integrity, Design", "Aggregation, Composition, Inheritance, Dependency"],
    answer: 0,
  },
  {
    question: "Which of the following is not a valid join type in SQL?",
    options: ["INNER JOIN", "OUTER JOIN", "CROSS JOIN", "MATCH JOIN"],
    answer: 3,
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