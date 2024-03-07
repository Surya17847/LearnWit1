const analyzeBtn = document.getElementById("analyze-btn");

analyzeBtn.addEventListener("click", () => {
    const getUserActivity = (userEmail) => {
        return JSON.parse(localStorage.getItem(userEmail)) || {};
    };

    const displayUserActivity = (userEmail) => {
        const userData = getUserActivity(userEmail);
        const reviewContainer = document.getElementById('review-container');

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
            reviewContainer.innerHTML = "<p>No quiz data available for review.</p>";
        }
    };

    const userEmail = localStorage.getItem("userEmail");
    displayUserActivity(userEmail);
});

const homeBtn = document.getElementById("home-btn");

homeBtn.addEventListener("click", () => {
    window.location.href = "index.html";
});

