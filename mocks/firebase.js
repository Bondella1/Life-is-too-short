// __mocks__/firebase.js
export const auth = jest.fn(() => ({
    signInWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { uid: "12345" } })),
    createUserWithEmailAndPassword: jest.fn(() => Promise.resolve({ user: { uid: "12345" } })),
    signOut: jest.fn(() => Promise.resolve()),
  }));
  
  export const firestore = jest.fn(() => ({
    collection: jest.fn(() => ({
      doc: jest.fn(() => ({
        get: jest.fn(() => Promise.resolve({ exists: true, data: () => ({ name: "Test User" }) })),
        set: jest.fn(() => Promise.resolve()),
        update: jest.fn(() => Promise.resolve()),
        delete: jest.fn(() => Promise.resolve()),
      })),
    })),
  }));
  


































  