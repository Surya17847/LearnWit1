const questions=[
  { question: "What is the time complexity of linear search?", options: ["O(1)", "O(n)", "O(log n)", "O(n^2)"], answer: 1, },
  { question: "Which notation is used to represent the best-case time complexity?", options: ["Big-O", "Theta", "Omega", "Little-O"], answer: 3, },
  { question: "What does 'n' represent in time complexity analysis?", options: ["Number of elements", "Number of comparisons", "Number of loops", "Number of operations"], answer: 0, },
  { question: "What is the purpose of the 'Big-O' notation?", options: ["Best-case complexity", "Worst-case complexity", "Average-case complexity", "All of the above"], answer: 3, },
  { question: "Which sorting algorithm has a time complexity of O(n log n) in the average and worst cases?", options: ["Bubble Sort", "QuickSort", "Insertion Sort", "Selection Sort"], answer: 1, },
    {
    question: "What is the time complexity of bubble sort algorithm?",
    options: [
    "O(n)",
    "O(n log n)",
    "O(n^2)",
    "O(log n)"
    ],
    answer:3,
    },
    {
    question: "Which sorting algorithm has the best average-case time complexity?",
    options: [
    "Quick sort",
    "Merge sort",
    "Insertion sort",
    "Selection sort"
    ],
    answer:1,
    },
    {
    question: "What is the space complexity of merge sort algorithm?",
    options: [
    "O(n)",
    "O(log n)",
    "O(n log n)",
    "O(1)"
    ],
    answer:0,
    },
    {
    question: "Which data structure is typically used in implementing breadth-first search?",
    options: [
    "Queue",
    "Stack",
    "Array",
    "Linked List"
    ],
    answer:0,
    },
    {
    question: "What is the worst-case time complexity of binary search algorithm?",
    options: [
    "O(n)",
    "O(log n)",
    "O(n log n)",
    "O(n^2)"
    ],
    answer:1,
    },
    ];
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
