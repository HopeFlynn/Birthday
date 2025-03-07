// Correct answers for the quiz
const correctAnswers = {
  q1: "D",  // Favorite color (Purple)
  q2: "A",  // Fame via a viral TikTok
  q3: "True",  // I have, Big bang.
  q4: "True",  // I do.
  q5: "B",  // Staying up the whole day doing nothing productive
  q6: "B",  // Early bird
  q7: "C",  // I prefer in-person shopping for the experience.
  q8: "C",  // A mix of both, depending on the mood.
  q9: "False",  // I only edit videos
  q10: "D", // None of the above
  q11: "D", // Re-watch every single time
  q12: "B",  // Go-to food: Spaghetti
  q13: "D", // I turn them all off.
  q14: "C", // Say "aww" out loud.
  q15: "B", // I tend to avoid it after saying my piece.
};

// Function to handle quiz submission
function submitQuiz() {
  let score = 0;
  let totalQuestions = Object.keys(correctAnswers).length;
  let userAnswers = {};

  // Loop through each question and check answers
  Object.keys(correctAnswers).forEach(question => {
    let selected = document.querySelector(`input[name="${question}"]:checked`);
    if (selected) {
      userAnswers[question] = selected.value;
      if (selected.value === correctAnswers[question]) {
        score++;
      }
    }
  });

  // Retrieve the birthday message
  let message = document.getElementById("message-box").value.trim() || "No message";

  // Prompt for player's name
  let playerName = prompt("Enter your name:");
  if (!playerName || playerName.trim() === "") {
    alert("You must enter your name to submit the quiz.");
    return; // Stop submission if no name is entered
  }

  // Save score and message to localStorage leaderboard
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push({ name: playerName.trim(), score, message });
  leaderboard.sort((a, b) => b.score - a.score);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

  
  // Refresh leaderboard display
  updateLeaderboard();
}

// Function to update the leaderboard
function updateLeaderboard() {
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  let leaderboardList = document.getElementById("leaderboard");

  // Check if leaderboard exists
  if (!leaderboardList) {
    console.error("Leaderboard element not found in HTML.");
    return;
  }

  leaderboardList.innerHTML = "";
  if (leaderboard.length === 0) {
    leaderboardList.innerHTML = "<p>No scores yet. Be the first to play!</p>";
  } else {
    leaderboard.forEach(entry => {
      leaderboardList.innerHTML += `<li><strong>${entry.name}:</strong> ${entry.score} points - "${entry.message}"</li>`;
    });
  }
}


// Ensure the leaderboard updates when the page loads
document.addEventListener("DOMContentLoaded", function () {
  updateLeaderboard();
});
