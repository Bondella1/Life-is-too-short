function createPieChart() {
  // Placeholder function for creating a pie chart
  const ctx = document.createElement('canvas');
  ctx.style.maxWidth = '600px'; // Increase the maximum width
  ctx.style.maxHeight = '600px'; // Increase the maximum height
  document.getElementById('piechart').appendChild(ctx);

  // Example data
  const data = {
    labels: ['Sleep', 'Work', 'Leisure'],
    datasets: [{
      data: [8, 8, 8],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  };

  // Create the pie chart
  new Chart(ctx, {
    type: 'pie',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  });
}

// Call the function to display the placeholder pie chart
createPieChart();
