// firebase/leaderboardService.js
import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, orderBy, query } from "firebase/firestore";

// Save user leaderboard data
export async function saveUserToLeaderboard(username, timeWasted) {
  try {
    await addDoc(collection(db, "leaderboard"), {
      username,
      timeWasted,
      timestamp: new Date(),
    });
    console.log("User added to leaderboard!");
  } catch (error) {
    console.error("Error saving leaderboard data:", error);
  }
}

// Fetch leaderboard (sorted by most time wasted)
export async function fetchLeaderboard() {
  try {
    const q = query(collection(db, "leaderboard"), orderBy("timeWasted", "desc"));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    return [];
  }
}
''