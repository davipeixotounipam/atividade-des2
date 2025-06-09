import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { db } from '../services/credenciaisFirebase';
import { doc, getDoc } from 'firebase/firestore';
import auth from '../services/credenciaisFirebaseAuth';

export const useTipoUsuario = () => {
  const [tipo, setTipo] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUserId(user.uid);
        const docRef = doc(db, 'usuarios', user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          // Certifique-se que o campo tipo pode ser 'admin', 'avaliador' ou 'normal'
          setTipo(docSnap.data().tipo);
        } else {
          setTipo(null);
        }
      } else {
        setTipo('administrador');
        setUserId(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { tipo, userId, loading };
};