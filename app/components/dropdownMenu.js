document.addEventListener('DOMContentLoaded', function() {
    const tabButton = document.querySelector('.tab-button');
    const dropdownContent = document.querySelector('.dropdown-content');
    const userNameElement = document.querySelector('#user-name');
    const saveCollegeButton = document.querySelector('#save-college');
    const collegeInput = document.querySelector('#college-input');
    const leaderboard = document.querySelector('#leaderboard');

    // Ensure the elements exist
    if (!tabButton || !dropdownContent || !userNameElement || !saveCollegeButton || !collegeInput || !leaderboard) {
        console.error('One or more required elements are missing.');
        return;
    }

    // Example user name
    const userName = "User";

    // Insert user name into the first dropdown item
    userNameElement.textContent = userName;

    // Toggle dropdown visibility when the tab button is clicked
    tabButton.addEventListener('click', function() {
        dropdownContent.classList.toggle('show');
    });

    // Close dropdown if clicked outside of it
    window.addEventListener('click', function(event) {
        if (!event.target.matches('.tab-button') && !event.target.closest('.dropdown-content')) {
            if (dropdownContent.classList.contains('show')) {
                dropdownContent.classList.remove('show');
            }
        }
    });

    // Handle the college name saving and leaderboard update
    saveCollegeButton.addEventListener('click', function() {
        const collegeName = collegeInput.value.trim();
        if (collegeName) {
            alert('College name saved: ' + collegeName);
            updateLeaderboard(collegeName);
        } else {
            alert('Please enter a college name.');
        }
    });

    // Function to update the leaderboard with the given college name
    function updateLeaderboard(collegeName) {
        leaderboardtitel.textContent = `Leaderboard for ${collegeName}`;
    }

    // Log the college name when it's saved
    console.log('collegeName:', collegeInput.value);
});
