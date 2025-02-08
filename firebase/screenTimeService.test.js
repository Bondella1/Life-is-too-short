// firebase/screenTimeService.test.js
import { saveScreenTime, getUserScreenTime } from './screenTimeService';
import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  addDoc: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
}));

describe('screenTimeService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('saveScreenTime', () => {
    it('should save screen time to Firestore', async () => {
      const userId = 'user123';
      const timeWasted = 120;

      await saveScreenTime(userId, timeWasted);

      expect(collection).toHaveBeenCalledWith(db, 'screenTime');
      expect(addDoc).toHaveBeenCalledWith(expect.any(Object), {
        userId,
        timeWasted,
        timestamp: expect.any(Date),
      });
      expect(console.log).toHaveBeenCalledWith('Screen time saved!');
    });

    it('should log an error if saving screen time fails', async () => {
      const userId = 'user123';
      const timeWasted = 120;
      const error = new Error('Failed to save');

      addDoc.mockRejectedValueOnce(error);

      await saveScreenTime(userId, timeWasted);

      expect(console.error).toHaveBeenCalledWith('Error saving screen time:', error);
    });
  });

  describe('getUserScreenTime', () => {
    it('should fetch and return total screen time for a user', async () => {
      const userId = 'user123';
      const mockDocs = [
        { data: () => ({ timeWasted: 120 }) },
        { data: () => ({ timeWasted: 60 }) },
      ];

      getDocs.mockResolvedValueOnce({
        forEach: (callback) => mockDocs.forEach(callback),
      });

      const totalTime = await getUserScreenTime(userId);

      expect(query).toHaveBeenCalledWith(expect.any(Object), where('userId', '==', userId));
      expect(getDocs).toHaveBeenCalledWith(expect.any(Object));
      expect(totalTime).toBe(180);
    });

    it('should return 0 if fetching screen time fails', async () => {
      const userId = 'user123';
      const error = new Error('Failed to fetch');

      getDocs.mockRejectedValueOnce(error);

      const totalTime = await getUserScreenTime(userId);

      expect(console.error).toHaveBeenCalledWith('Error fetching screen time:', error);
      expect(totalTime).toBe(0);
    });
  });
});