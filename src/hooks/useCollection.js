import { useEffect, useRef, useState } from 'react';
import { projectFirestore } from '../firebase/config';

export const useCollection = (collection, _query, _orderBy) => {
	const [documents, setDocuments] = useState();
	const [error, setError] = useState(null);

	// if we don't use a ref infinite loop will happen in useEffect
	// _query is an array(reference type) and is "different" on every render

	const query = useRef(_query).current;
	const orderBy = useRef(_orderBy).current;

	useEffect(() => {
		let ref = projectFirestore.collection(collection);

		if (query) {
			ref = ref.where(...query);
		}
		if (orderBy) {
			ref = ref.orderBy(...orderBy);
		}

		const unsub = ref.onSnapshot(
			(snapshot) => {
				let results = [];
				snapshot.docs.forEach((doc) => {
					results.push({ ...doc.data(), id: doc.id });
				});

				// update state
				setDocuments(results);
				setError(null);
			},
			(err) => {
				console.log(err);
				setError(err.message);
			}
		);

		// unsubscribe
		return () => unsub();
	}, [collection, query, orderBy]);

	return { documents, error };
};
