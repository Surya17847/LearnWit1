const questions= [
    {
      question: "What is the CAP theorem, and how does it relate to database systems?",
      options: ["Consistency, Availability, Partition Tolerance; trade-offs in distributed systems.", "Concurrency, Atomicity, Parallelism; principles for transaction processing.", "Criticality, Availability, Performance; benchmarks for database systems.", "Capacity, Architecture, Performance; factors affecting database design."],
      answer: 0,
    },
    {
      question: "Explain the concept of database normalization in detail, including its different normal forms.",
      options: ["1NF, 2NF, 3NF, BCNF; progressively reducing data redundancy.", "Normalization is not relevant in modern databases.", "Normalization only applies to NoSQL databases.", "Normalization is a technique for increasing data redundancy."],
      answer: 0,
    },
    {
      question: "Discuss the advantages and disadvantages of denormalization in a database.",
      options: ["Denormalization improves query performance but increases data redundancy.", "Denormalization is always beneficial for large databases.", "Denormalization is only used in OLAP systems.", "Denormalization is the same as normalization."],
      answer: 0,
    },
    {
      question: "What are database triggers, and how are they used in DBMS?",
      options: ["Special stored procedures that automatically respond to events in the database.", "Indexes that trigger when a query is executed.", "Constraints that trigger when data is updated.", "Views that trigger when a table is modified."],
      answer: 0,
    },
    {
      question: "Explain the concept of database sharding and its benefits in a distributed database environment.",
      options: ["Dividing a database into smaller, more manageable pieces for improved scalability and performance.", "Combining multiple databases into a single, unified structure.", "Sharding is only relevant for NoSQL databases.", "Sharding is a synonym for partitioning."],
      answer: 0,
    },
    {
     question: "Which of the following is not a property of a relational database?",
      options: [
        "ACID properties",
        "Referential integrity",
        "Normalization",
        "Hierarchical structure"
      ],
      answer:3,
    },
    {
     question: "In database terminology, what does the acronym OLAP stand for?",
      options: [
        "Online Application Programming",
        "Optimized Logical Application Processing",
        "Online Analytical Processing",
        "Optimized Logical Analytical Programming"
      ],
      answer: 2,
    },
    {
     question: "What is the purpose of a database index?",
      options: [
        "To ensure data redundancy",
        "To optimize query performance",
        "To enforce referential integrity",
        "To define table relationships"
      ],
      answer: 1,
    },
    {
     question: "Which normal form deals with non-prime attributes dependent on a superkey?",
      options: [
        "First Normal Form (1NF)",
        "Second Normal Form (2NF)",
        "Third Normal Form (3NF)",
        "Boyce-Codd Normal Form (BCNF)"
      ],
      answer: 1,
    },
    {
     question: "What is the primary role of a DBMS transaction?",
      options: [
        "To ensure data integrity",
        "To optimize database design",
        "To regulate data access permissions",
        "To facilitate data migration"
      ],
      answer: 0,
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
     <a href="subject.html" id="home"><button id="home-btn">HOME</button></a>
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
 
 