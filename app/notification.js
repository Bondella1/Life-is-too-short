document.addEventListener('DOMContentLoaded', function () {
    if (!('Notification' in window)) {
        console.log('This browser does not support notifications.');
        return;
    }

    function showNotificationPrompt() {
        const prompt = document.getElementById('notification-prompt');
        prompt.style.display = 'block';
    }

    function hideNotificationPrompt() {
        const prompt = document.getElementById('notification-prompt');
        prompt.style.display = 'none';
    }

    function showDeniedPopup() {
        const popup = document.getElementById('notification-denied');
        popup.style.display = 'block';
    }

    function hideDeniedPopup() {
        const popup = document.getElementById('notification-denied');
        popup.style.display = 'none';
    }

    function checkNotificationPermission() {
        if (Notification.permission === 'granted') {
            hideNotificationPrompt();
            showNotification('Welcome!', 'Thank you for enabling notifications.');
        } else if (Notification.permission === 'denied') {
            showDeniedPopup();
        } else {
            showNotificationPrompt();
        }
    }

    function showNotification(title, body) {
        const options = {
            body: body,
            icon: 'icon.png' // Optional: Add an icon for the notification
        };
        new Notification(title, options);
    }

    document.getElementById('allow-button').addEventListener('click', function () {
        Notification.requestPermission().then(function (permission) {
            if (permission === 'granted') {
                hideNotificationPrompt();
                showNotification('Welcome!', 'Thank you for enabling notifications.');
            } else if (permission === 'denied') {
                showDeniedPopup();
            }
        });
    });

    document.getElementById('close-popup').addEventListener('click', function () {
        hideDeniedPopup();
    });

    checkNotificationPermission();
});