import { useState, useEffect } from 'react';
import {
	projectAuth,
	projectFirestore,
	projectStorage,
} from '../firebase/config';
import { useAuthContext } from './useAuthContext';

export const useSignup = () => {
	const [isCancelled, setIsCancelled] = useState(false);
	const [isPending, setIsPending] = useState(false);
	const [error, setError] = useState(null);

	const { dispatch } = useAuthContext();

	const signup = async (email, password, displayName, thumbnail) => {
		setError(null);
		setIsPending(true);

		try {
			// signup
			const res = await projectAuth.createUserWithEmailAndPassword(
				email,
				password
			);

			if (!res) {
				throw new Error('Could not complete signup');
			}

			const uploadPath = `thumbnails/${res.user.uid}/${thumbnail.name}`;
			const img = await projectStorage.ref(uploadPath).put(thumbnail);
			const imgUrl = await img.ref.getDownloadURL();

			// add display name and photoURL to user
			await res.user.updateProfile({ displayName, photoURL: imgUrl });

			// create a user doc
			await projectFirestore
				.collection('users')
				.doc(res.user.uid)
				.set({ online: true, displayName, photoURL: imgUrl });

			// login action
			dispatch({ type: 'LOGIN', payload: res.user });

			if (!isCancelled) {
				setIsPending(false);
				setError(null);
			}
		} catch (err) {
			setIsPending(false);
			setError(err.message);
		}
	};

	useEffect(() => {
		return () => setIsCancelled(true);
	}, []);

	return { signup, isPending, error };
};
