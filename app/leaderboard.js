function displayLeaderboard() {
  // Placeholder function for displaying the leaderboard
  const leaderboard = [
    { name: 'Alice', score: 100 },
    { name: 'Bob', score: 90 },
    { name: 'Charlie', score: 80 }
  ];

  const leaderboardElement = document.getElementById('leaderboard');


  const table = document.createElement('table');
  table.className = 'leaderboard';

  const thead = document.createElement('thead');
  const headerRow = document.createElement('tr');
  const nameHeader = document.createElement('th');
  nameHeader.innerText = 'Name';
  const scoreHeader = document.createElement('th');
  scoreHeader.innerText = 'Score';
  headerRow.appendChild(nameHeader);
  headerRow.appendChild(scoreHeader);
  thead.appendChild(headerRow);
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  leaderboard.forEach(entry => {
    const row = document.createElement('tr');
    const nameCell = document.createElement('td');
    nameCell.innerText = entry.name;
    const scoreCell = document.createElement('td');
    scoreCell.innerText = entry.score;
    row.appendChild(nameCell);
    row.appendChild(scoreCell);
    tbody.appendChild(row);
  });
  table.appendChild(tbody);

  leaderboardElement.appendChild(table);
}

// Call the function to display the placeholder leaderboard
displayLeaderboard();
