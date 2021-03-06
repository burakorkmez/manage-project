import { useEffect, useState } from 'react';
import { projectAuth, projectFirestore } from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useLogout = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [error, setError] = useState(null);
	const [isPending, setIsPending] = useState(false);

	const { dispatch, user } = useAuthContext();

	const logout = async () => {
		setError(null);
		setIsPending(true);
		try {
			// update online stat
			await projectFirestore
				.collection('users')
				.doc(user.uid)
				.update({ online: false });

			await projectAuth.signOut();

			dispatch({ type: 'LOGOUT' });

			if (!isCancelled) {
				setIsPending(false);
				setError(null);
			}
		} catch (err) {
			setError(err.message);
			setIsPending(false);
		}
	};

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { isPending, error, logout };
};
