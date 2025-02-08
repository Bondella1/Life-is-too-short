// connectionIndicator.js
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

export const initializeConnectionIndicator = () => {
    // Create status indicator element
    const indicator = document.createElement('div');
    
    // Style the indicator
    indicator.style.padding = '10px';
    indicator.style.position = 'fixed';
    indicator.style.top = '10px';
    indicator.style.right = '10px';
    indicator.style.borderRadius = '5px';
    indicator.style.color = 'white';
    indicator.style.fontFamily = 'Arial, sans-serif';
    indicator.style.zIndex = '1000';
    indicator.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    
    // Add indicator to the page
    document.body.appendChild(indicator);

    // Function to check connection
    const checkConnection = async () => {
        try {
            await getDocs(collection(db, 'test-connection'));
            indicator.style.backgroundColor = '#4CAF50';
            indicator.textContent = '🟢 Firebase Connected';
        } catch (error) {
            indicator.style.backgroundColor = '#f44336';
            indicator.textContent = '🔴 Firebase Disconnected';
            console.error('Connection error:', error);
        }
    };

    // Initial check
    checkConnection();
    
    // Check connection every 5 seconds
    const intervalId = setInterval(checkConnection, 5000);

    // Return cleanup function
    return () => {
        clearInterval(intervalId);
        document.body.removeChild(indicator);
    };
};
