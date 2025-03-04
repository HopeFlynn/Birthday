// Correct answers for the quiz
const correctAnswers = {
    q1: "D",  // Favorite color (Purple)
    q2: "A",  // Fame via a viral TikTok
    q3: "True",  // I have, Big bang.
    q4: "True",  // I do.
    q5: "B",  // Staying up the whole day doing nothing productive
    q6: "B",  // Early bird
    q7: "C",  //  I prefer in-person shopping for the experience.
    q8: "C",  //  A mix of both, depending on the mood.
    q9: "False",  //I only edit videos
    q10: "D", //  None of the above
    q11: "D", // Re-watch every single time
    q12: "B",  // Go-to food: Spaghetti
    q13: "D", // I turn them all off.
    q14: "D", //Say "aww" out loud.
    q15: "B", //I tend to avoid it after saying my piece.
  };
  
  function submitQuiz() {
    let score = 0;
    let totalQuestions = Object.keys(correctAnswers).length;
    let userAnswers = {};
  
    // Evaluate each answer
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
    let message = document.getElementById("message-box").value;
  
    // Save score and message to localStorage leaderboard
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    let playerName = prompt("Enter your name:");
    leaderboard.push({ name: playerName, score, message });
    leaderboard.sort((a, b) => b.score - a.score);
    localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
  
    // Display quiz results
    let resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = `<h2>Your Score: ${score} / ${totalQuestions}</h2>`;
    resultsDiv.innerHTML += "<h3>Correct Answers:</h3>";
    Object.keys(correctAnswers).forEach(q => {
      resultsDiv.innerHTML += `<p><strong>${q.toUpperCase()}:</strong> ${correctAnswers[q]}</p>`;
    });
  
    // Refresh leaderboard display
    updateLeaderboard();
  }
  
  function updateLeaderboard() {
    let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
    let leaderboardList = document.getElementById("leaderboard");
    leaderboardList.innerHTML = "";
    leaderboard.forEach(entry => {
      leaderboardList.innerHTML += `<li><strong>${entry.name}:</strong> ${entry.score} points - "${entry.message}"</li>`;
    });
  }
  
  function resetLeaderboard() {
    localStorage.removeItem("leaderboard");
    updateLeaderboard();
  }
  
  // Display leaderboard on page load
  window.onload = updateLeaderboard;
  