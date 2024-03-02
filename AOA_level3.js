const questions=[
  {
    question: "What does the term 'asymptotic analysis' refer to in algorithm analysis?",
    options: ["Best-case scenario", "Worst-case scenario", "Average-case scenario", "Performance as input approaches infinity"],
    answer: 3,
  },
  {
    question: "Which algorithm is commonly used for finding the shortest path in a weighted graph?",
    options: ["Breadth-First Search", "Depth-First Search", "Dijkstra's Algorithm", "Prim's Algorithm"],
    answer: 2,
  },
  {
    question: "What is the primary goal of divide and conquer algorithms?",
    options: ["Reduce problem size", "Increase problem complexity", "Minimize memory usage", "Maximize code readability"],
    answer: 0,
  },
  {
    question: "What is the space complexity of an algorithm?",
    options: ["Amount of time it takes to run", "Amount of memory it uses", "Number of iterations", "Length of the code"],
    answer: 1,
  },
  {
    question: "Which algorithm is known for its efficiency in searching sorted arrays?",
    options: ["Linear Search", "Binary Search", "Hashing", "Quick Sort"],
    answer: 1,
  },

  {
    question: "What is the main advantage of using memoization in dynamic programming?",
    options: ["Reduced code complexity", "Improved runtime performance", "Easier debugging", "Enhanced code readability"],
    answer: 1,
  },
  {
    question: "Which sorting algorithm has the worst-case time complexity of O(n^2)?",
    options: ["Bubble Sort", "Insertion Sort", "Quick Sort", "Merge Sort"],
    answer: 0,
  },
  {
    question: "What does NP-completeness imply for an algorithm problem?",
    options: ["Polynomial time complexity", "Non-polynomial time complexity", "No efficient solution exists", "Only applicable to sorting algorithms"],
    answer: 2,
  },
  {
    question: "What is the primary purpose of the Master Theorem in algorithm analysis?",
    options: ["Memory optimization", "Time complexity analysis", "Code debugging", "Input validation"],
    answer: 1,
  },
  {
    question: "In algorithm design, what is the 'Greedy' strategy known for?",
    options: ["Optimal solution", "Efficiency in space usage", "Divide and conquer approach", "Randomized algorithm"],
    answer: 0,
  },

]
;
const quiz=document.querySelector("#quiz");
 const ansElement=document.querySelectorAll(".answer");
const [queElement,option1,option2,option3]=document.querySelectorAll("#question",".option1","option2",".option3");
 const submitbtn=document.querySelector("#submit");
  let curquestion=0;
 let score=0;
 const displayquestion=() =>{
   //curquestion++;
   const {question,options}=questions[curquestion];
   queElement.innerText=`${curquestion+1}:${question}`;
   options.forEach(
     (curOption,index)=>(window[`option${index+1}`].innerText=curOption)
     );
//    console.log(question);
 };
 displayquestion();
const getSelectedOption =()=>{
   let ansindex;
   ansElement.forEach((curOption,index)=>{
 
    if(curOption.checked){
       ansindex=index;
   }
  //  console.log(ansindex);
 });
 return ansindex;
 //let answerElement=Array.from(ansElement);
//return  answerElement.findIndex((curElem,index)=>curElem.checked);
 };
 const deselectedAnswers=()=>{
   ansElement.forEach((curElem)=>curElem.checked=false)
 }
submitbtn.addEventListener('click',()=>{
const selectedoptionIndex=getSelectedOption();
if(selectedoptionIndex===questions[curquestion].answer){
  score++;
}
curquestion++;
 if(curquestion<questions.length){
   deselectedAnswers();
  displayquestion();
 } else{
   //const addhtml=document.querySelectorAll(".quize-section");
   quiz.innerHTML = `
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
     <h3>SCORE ${score}/${questions.length}</h3>
     <button class="reload-button" onclick="location.reload()">PLAY AGAIN</button>
     <a href="index.html" id="home"><button id="home-btn">HOME</button></a>
     <a href="review.html" id="review"><button id="review-btn">REVIEW</button></a>
   </div>
 `;
 }
 });
