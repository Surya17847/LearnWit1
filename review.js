const analyzeBtn = document.getElementById("analyze-btn");
analyzeBtn.addEventListener("click", () => {
    const getUserActivity = (userEmail) => {
        return JSON.parse(localStorage.getItem(userEmail)) || {};
    };

    const displayUserActivity = (userEmail) => {
        const userData = getUserActivity(userEmail);
        const correctQuestionsContainer = document.getElementById('correct-questions');
        const wrongQuestionsContainer = document.getElementById('wrong-questions');
        const graphContainer = document.getElementById('graph');

        if (userData && userData.questions && userData.questions.length > 0) {
            let totalCorrect = 0;
            let totalWrong = 0;

            userData.questions.forEach(q => {
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
            wrongQuestionsContainer.innerHTML = "<p>No quiz data available for review.</p>";
        }
    };

    const userEmail = localStorage.getItem("userEmail");
    displayUserActivity(userEmail);
});
