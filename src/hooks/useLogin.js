import { useEffect, useState } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);

	const { dispatch } = useAuthContext();

	const login = async (email, password) => {
		setError(null);
		setIsPending(true);

		// sign the user in
		try {
			const res = await projectAuth.signInWithEmailAndPassword(email, password);

			await projectFirestore
				.collection('users')
				.doc(res.user.uid)
				.update({ online: true });

			dispatch({ type: 'LOGIN', payload: res.user });

			if (!isCancelled) {
				setError(null);
				setIsPending(false);
			}
		} catch (err) {
			if (!isCancelled) {
				setIsPending(false);
				setError(err.message);
			}
		}
	};
	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { login, isPending, error };
};
