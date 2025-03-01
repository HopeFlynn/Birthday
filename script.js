// Correct answers for the quiz
const correctAnswers = {
    q1: "B",  // Favorite color (Pink)
    q2: "A",  // Fame via a viral TikTok
    q3: "True",  // Rewatched a show for quotes
    q4: "True",  // Playlist for every mood
    q5: "C",  // Guilty pleasure: Obsessing over memes and viral trends
    q6: "D",  // Random energy bursts
    q7: "A",  // All about online shopping
    q8: "A",  // Prefer texting
    q9: "True",  // Edit photos for flawless aesthetic
    q10: "D", // Level of education not being a leader: None of the above
    q11: "D", // Re-watch every single time
    q12: "A"  // Go-to food: Indomie
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
  