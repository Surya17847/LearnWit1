// const analyzeBtn = document.getElementById("analyze-btn");

// analyzeBtn.addEventListener("click", () => {
//     const getUserActivity = (userEmail) => {
//         const userData = JSON.parse(localStorage.getItem(userEmail)) || {};
//         const uniqueQuestions = new Set(); // Set to store encountered questions
//         const questions = userData['quick-quiz']?.questions || [];
        
//         const uniqueQuestionData = [];
//         // Iterate through questions array starting from the last index
//         for (let i = questions.length - 1; i >= 0; i--) {
//             const question = questions[i];
//             if (!uniqueQuestions.has(question.question)) {
//                 uniqueQuestions.add(question.question);
//                 uniqueQuestionData.unshift(question); // Add question to the beginning of uniqueQuestionData array
//             }
//         }
        
//         userData['quick-quiz'] = { questions: uniqueQuestionData }; // Update userData with unique questions
//         return userData;
    
    
//     };

//     const displayUserActivity = (userEmail) => {
//         const userData = getUserActivity(userEmail);
//         const reviewContainer = document.getElementById('review-container');

//         // if (userData && userData.questions && userData.questions.length > 0) {
//         //     const correctAnswers = userData.questions.filter(q => q.correct);
//         //     const wrongAnswers = userData.questions.filter(q => !q.correct);

//         if (userData && userData['quick-quiz'] && userData['quick-quiz'].questions && userData['quick-quiz'].questions.length > 0) {
//             const correctAnswers = userData['quick-quiz'].questions.filter(q => q.points === 1);
//             const wrongAnswers = userData['quick-quiz'].questions.filter(q => q.points === 0);




//             const correctQuestionsHTML = correctAnswers.map(q => `
//                 <li class="correct-answer">
//                 <p>${q.question}</p>
//                 <p>Your Answer: ${q.selectedOption}</p>
//                 <p>Total Time Spent: ${q.timer}</p>
//                 <p>Correct Answer: ${q.answer}</p>
                  
//                 </li>
//             `).join('');

//             const wrongQuestionsHTML = wrongAnswers.map(q => `
//                 <li class="wrong-answer">
//                 <p>${q.question}</p>
//                 <p>Your Answer: ${q.selectedOption}</p>
//                 <p>Total Time Spent: ${q.timer}</p>
//                 <p>Correct Answer: ${q.answer}</p>
                  
//                 </li>
//             `).join('');

//             const totalCorrect = correctAnswers.length;
//             const totalWrong = wrongAnswers.length;

//             reviewContainer.innerHTML = `
//                 <div class="review-container">
//                     <div class="correct-questions">
//                         <h2>Correct Answers (${totalCorrect})</h2>
//                         <ol>${correctQuestionsHTML}</ol>
//                     </div>
//                     <div class="wrong-questions">
//                         <h2>Wrong Answers (${totalWrong})</h2>
//                         <ol>${wrongQuestionsHTML}</ol>
//                     </div>
//                 </div>
//             `;
//         } else {
//             reviewContainer.innerHTML = "<p>No quiz data available for review.</p>";
//         }
//     };

//     const userEmail = localStorage.getItem("userEmail");
//     displayUserActivity(userEmail);
// });

// const homeBtn = document.getElementById("home-btn");

// homeBtn.addEventListener("click", () => {
//     window.location.href = "index.html";
// });

const analyzeBtn = document.getElementById("analyze-btn");
analyzeBtn.addEventListener("click", () => {
    const getUserActivity = (userEmail) => {
        
        const userData = JSON.parse(localStorage.getItem(userEmail)) || {};
        const uniqueQuestions = new Set(); // Set to store encountered questions
        const questions = userData['quick-quiz']?.questions || [];
        
        const uniqueQuestionData = [];
        // Iterate through questions array starting from the last index
        for (let i = questions.length - 1; i >= 0; i--) {
            const question = questions[i];
            if (!uniqueQuestions.has(question.question)) {
                uniqueQuestions.add(question.question);
                uniqueQuestionData.unshift(question); // Add question to the beginning of uniqueQuestionData array
            }
        }
        
        userData['quick-quiz'] = { questions: uniqueQuestionData }; // Update userData with unique questions
        return userData;
    };

    const displayUserActivity = (userEmail) => {
        const userData = getUserActivity(userEmail);
        const correctQuestionsContainer = document.getElementById('correct-questions');
        const wrongQuestionsContainer = document.getElementById('wrong-questions');
        const graphContainer = document.getElementById('graph');

        if (userData && userData['quick-quiz'] && userData['quick-quiz'].questions && userData['quick-quiz'].questions.length > 0) {
            let totalCorrect = 0;
            let totalWrong = 0;

            userData['quick-quiz'].questions.forEach(q => {
                const isCorrect = q.answer === q.selectedOption;
                const boxColor = isCorrect ? '#0acb51' : '#b13030';
                const questionHTML = `
                    <div class="question-box" style="background-color: ${boxColor}">
                        <p>Total Time Spent: ${q.timer}</p>
                        <p>${q.question}</p>
                        <p>Correct Answer: ${q.answer}</p>
                        <p>Your Answer: ${q.selectedOption}</p>
                    </div>
                `;

                if (isCorrect) {
                    correctQuestionsContainer.insertAdjacentHTML('beforeend', questionHTML);
                    totalCorrect++;
                } else {
                    wrongQuestionsContainer.insertAdjacentHTML('beforeend', questionHTML);
                    totalWrong++;
                }
            });

            // Update the chart
            const chartData = {
                labels: ['Correct', 'Incorrect'],
                datasets: [{
                    label: 'Score',
                    data: [totalCorrect, totalWrong],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.2)', // Correct color
                        'rgba(255, 99, 132, 0.2)'  // Incorrect color
                    ],
                    borderColor: [
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            };

            const chartOptions = {
                // Options for the chart...
            };

            new Chart(graphContainer, {
                type: 'bar',
                data: chartData,
                options: chartOptions
            });
        } else {
            correctQuestionsContainer.innerHTML = "<p>No quiz data available for review.</p>";
        }
    };

    const userEmail = localStorage.getItem("userEmail");
    displayUserActivity(userEmail);
});
const homeBtn = document.getElementById("home-btn");

homeBtn.addEventListener("click", () => {
    window.location.href = "index.html";
});