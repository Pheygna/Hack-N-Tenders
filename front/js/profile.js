fetch('/user-progress')
  .then(res => res.json())
  .then(data => {
      document.getElementById("username").textContent = data.username;
      document.getElementById("email").textContent = data.email;
      document.getElementById("total-score").textContent = data.totalScore;

      const list = document.getElementById("lesson-stats");
      data.progress.forEach(item => {
          const li = document.createElement("li");
          li.textContent = `${item.lesson_name}: ${item.completed ? "✅" : "❌"} (${item.score} pts)`;
          list.appendChild(li);
      });
  });
