



const reviewBtn = document.getElementById("review-btn");
reviewBtn.addEventListener("click", () => {
    const getUserActivity = (userEmail) => {
        return JSON.parse(localStorage.getItem(userEmail)) || {};
    };

    const displayUserActivity = (userEmail) => {
        const userData = getUserActivity(userEmail); // Pass userEmail parameter
        const reviewContainer = document.getElementById('review-container');

        if (userData && userData.questions && userData.questions.length > 0) {
            reviewContainer.innerHTML = `
                <h2>Review Your Quiz</h2>
                
                <ol>
                    ${userData.questions.map((q, index) => `
                        <li>
                            <p>Total Time Spent: ${q.timer}</p>
                            <p>${q.question}</p>
                            <p>Correct Answer: ${q.answer}</p>
                            <p>Your Answer: ${q.selectedOption}</p> <!-- Assuming the selected option is stored as 'selectedOption' -->
                        </li>
                    `).join('')}
                </ol>
            `;
        } else {
            reviewContainer.innerHTML = "<p>No quiz data available for review.</p>";
        }
    };

    // Call displayUserActivity function with the user's email
    const userEmail = localStorage.getItem("userEmail");
    displayUserActivity(userEmail);
});
