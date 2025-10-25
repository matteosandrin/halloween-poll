import { useEffect, useState } from 'react';
import { collection, onSnapshot, doc, updateDoc, increment, addDoc, query, getDocs } from 'firebase/firestore';
import { db } from '../firebase/config';
import type { PollOption } from '../types';

export const usePollData = () => {
  const [options, setOptions] = useState<PollOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'poll-options'),
      (snapshot) => {
        const pollOptions: PollOption[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          text: doc.data().text,
          votes: doc.data().votes,
        }));
        setOptions(pollOptions.sort((a, b) => b.votes - a.votes));
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  const vote = async (optionId: string) => {
    try {
      const optionRef = doc(db, 'poll-options', optionId);
      await updateDoc(optionRef, {
        votes: increment(1),
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to vote');
    }
  };

  const addCustomOption = async (text: string) => {
    try {
      // Check if option already exists (case-insensitive)
      const q = query(collection(db, 'poll-options'));
      const snapshot = await getDocs(q);
      const exists = snapshot.docs.some(
        (doc) => doc.data().text.toLowerCase() === text.toLowerCase()
      );

      if (exists) {
        throw new Error('This option already exists');
      }

      await addDoc(collection(db, 'poll-options'), {
        text,
        votes: 0,
      });
    } catch (err) {
      throw err;
    }
  };

  return { options, loading, error, vote, addCustomOption };
};
