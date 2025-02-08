// firebase/screenTimeService.js
import { db } from "./firebaseConfig";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";

// Save user screen time to Firestore
export async function saveScreenTime(userId, timeWasted) {
  try {
    await addDoc(collection(db, "screenTime"), {
      userId,
      timeWasted,
      timestamp: new Date(),
    });
    console.log("Screen time saved!");
  } catch (error) {
    console.error("Error saving screen time:", error);
  }
}

// Fetch screen time from Firestore
export async function getUserScreenTime(userId) {
  try {
    const q = query(collection(db, "screenTime"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    
    let totalTime = 0;
    querySnapshot.forEach(doc => {
      totalTime += doc.data().timeWasted;
    });

    return totalTime;
  } catch (error) {
    console.error("Error fetching screen time:", error);
    return 0;
  }
}
