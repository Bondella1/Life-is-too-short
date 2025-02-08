import { initializeTestEnvironment } from "@firebase/rules-unit-testing";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";

let testEnv;
let db;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: "demo-project", // Replace with your Firebase project ID
  });

  const context = testEnv.unauthenticatedContext();
  db = getFirestore(context);
});

afterAll(async () => {
  await testEnv.cleanup();
});

test("Firestore should write and read data", async () => {
  const testRef = doc(db, "tests", "testDoc");
  await setDoc(testRef, { message: "Hello, Firestore!" });

  const snapshot = await getDoc(testRef);
  expect(snapshot.exists()).toBe(true);
  expect(snapshot.data().message).toBe("Hello, Firestore!");
});
