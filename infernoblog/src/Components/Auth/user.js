import { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useAuth } from './AuthContext';
import { onAuthStateChanged } from 'firebase/auth';


const useUserData = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const db = getFirestore();
      const userRef = doc(db, 'users', currentUser.uid);

      const unsubscribe = onAuthStateChanged(currentUser, async (user) => {
        if (user) {
          try {
            const userSnapshot = await getDoc(userRef);
            if (userSnapshot.exists()) {
              const userData = userSnapshot.data();
              setUserData(userData);
            } else {
              setError('User data not found.');
            }
          } catch (error) {
            setError('Error fetching user data: ' + error.message);
          }
        }
      });

      return () => unsubscribe();
    }
  }, [currentUser]);

  return { userData, error };
};

export default useUserData;
