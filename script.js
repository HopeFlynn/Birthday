const correctAnswers = {
    q1: "D",  // Favorite color (Purple)
    q2: "A",  // If I got famous overnight,it would be for a viral tiktok
    q3: "True",  // I’ve rewatched Big Bang so many times that I can quote entire scenes
    q4: "True",  // I have a playlist for literally every possible mood and situation.
    q5: "B",  // My ultimate guilty pleasure is staying up whole day doing nothing productive
    q6: "B", //Early Bird
    q7:
};

function submitQuiz() {
    let score = 0;
    let totalQuestions = Object.keys(correctAnswers).length;
    let userAnswers = {};

    // Check answers
    Object.keys(correctAnswers).forEach(question => {
        let selected = document.querySelector(`input[name="${question}"]:checked`);
        if (selected) {
            userAnswers[question] = selected.value;
            if (selected.value === correctAnswers[question]) {
                score++;
            }
        }
    });

    // Get the message
    let message = document.getElementById("message-box").value;

    // Save score & message in local storage (could be a database)
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    let playerName = prompt("Enter your name:");
    leaderboard.push({ name: playerName, score, message });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

    // Display results
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `<h2>Your Score: ${score} / ${totalQuestions}</h2>`;
    resultsDiv.innerHTML += "<h3>Correct Answers:</h3>";
    Object.keys(correctAnswers).forEach(q => {
        resultsDiv.innerHTML += `<p>${q.toUpperCase()}: ${correctAnswers[q]}</p>`;
    });

    // Update leaderboard
    updateLeaderboard();
}

function updateLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    let leaderboardList = document.getElementById("leaderboard");
    leaderboardList.innerHTML = "";
    leaderboard.forEach((entry, index) => {
        leaderboardList.innerHTML += `<li><b>${entry.name}:</b> ${entry.score} points - "${entry.message}"</li>`;
    });
}

// Load leaderboard on page load
window.onload = updateLeaderboard;
