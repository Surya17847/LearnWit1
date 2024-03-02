const questions=[
  {
    question: "What is the time complexity matrix multiplication of an algorithm?",
    options: ["Linear", "Constant", "Quadratic", "Logarithmic"],
    answer: 2,
  },
  {
    question: "Which sorting algorithm has an average-case time complexity of O(n log n)?",
    options: ["Bubble Sort", "Insertion Sort", "Quick Sort", "Selection Sort"],
    answer: 2,
  },
  {
    question: "What is the purpose of Big-O notation in algorithm analysis?",
    options: ["Space complexity", "Time complexity", "Algorithm efficiency", "Code readability"],
    answer: 1,
  },
  {
    question: "In algorithm analysis, what does 'Omega' represent?",
    options: ["Best-case time complexity", "Worst-case time complexity", "Average-case time complexity", "Space complexity"],
    answer: 0,
  },
     {
    question: "What is dynamic programming used for in algorithm design?",
    options: ["Optimization problems", "Sorting algorithms", "Graph traversal", "Data encryption"],
    answer: 0,
  },
  {
    question: "What is the time complexity of the best-case scenario for the quicksort algorithm?",
    options: ["O(n log n)", "O(n^2)", "O(n)", "O(log n)"],
    answer:0,
  },
  {
    question: "Which data structure is typically used to implement priority queues?",
    options: ["Linked List", "Heap", "Binary Search Tree", "Array"],
    answer: 1,
  },
  {
    question: "In terms of complexity, what is the worst-case time complexity of the Dijkstra's algorithm?",
    options: ["O(n^2)", "O(n log n)", "O(n + m)", "O(n^3)"],
    answer: 0,
  },
  {
    question: "What is the space complexity of the Boyer-Moore string searching algorithm?",
    options: ["O(n)", "O(m)", "O(n + m)", "O(1)"],
    answer: 3,
  },
  {
    question: "Which of the following sorting algorithms has the highest worst-case time complexity?",
    options: ["Merge Sort", "Bubble Sort", "Selection Sort", "Insertion Sort"],
    answer: 1,
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
