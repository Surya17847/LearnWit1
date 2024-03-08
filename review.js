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

        if (userData && userData.questions && userData.questions.length > 0) {
            const correctAnswers = userData.questions.filter(q => q.correct);
            const wrongAnswers = userData.questions.filter(q => !q.correct);

            const correctQuestionsHTML = correctAnswers.map(q => `
                <li class="correct-answer">
                    <p>Total Time Spent: ${q.timer}</p>
                    <p>${q.question}</p>
                    <p>Correct Answer: ${q.answer}</p>
                    <p>Your Answer: ${q.selectedOption}</p>
                </li>
            `).join('');

            const wrongQuestionsHTML = wrongAnswers.map(q => `
                <li class="wrong-answer">
                    <p>Total Time Spent: ${q.timer}</p>
                    <p>${q.question}</p>
                    <p>Correct Answer: ${q.answer}</p>
                    <p>Your Answer: ${q.selectedOption}</p>
                </li>
            `).join('');

            const totalCorrect = correctAnswers.length;
            const totalWrong = wrongAnswers.length;

            reviewContainer.innerHTML = `
                <div class="review-container">
                    <div class="correct-questions">
                        <h2>Correct Answers (${totalCorrect})</h2>
                        <ol>${correctQuestionsHTML}</ol>
                    </div>
                    <div class="wrong-questions">
                        <h2>Wrong Answers (${totalWrong})</h2>
                        <ol>${wrongQuestionsHTML}</ol>
                    </div>
                </div>
            `;
        } else {
            correctQuestionsContainer.innerHTML = "<p>No quiz data available for review.</p>";
            wrongQuestionsContainer.innerHTML = "<p>No quiz data available for review.</p>";
        }
    };

    const userEmail = localStorage.getItem("userEmail");
    displayUserActivity(userEmail);
});
