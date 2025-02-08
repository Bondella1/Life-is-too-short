import { collection, addDoc, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

// Save user screen time
export async function saveUserStats(username, timeWasted) {
  await addDoc(collection(db, "leaderboard"), { username, timeWasted, timestamp: new Date() });
}

// Fetch leaderboard data
export async function getLeaderboard() {
  const querySnapshot = await getDocs(collection(db, "leaderboard"));
  return querySnapshot.docs.map(doc => doc.data());
}