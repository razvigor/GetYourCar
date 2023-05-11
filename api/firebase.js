import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

import {
	getFirestore,
	collection,
	doc,
	getDocs,
	getDoc,
	query,
	where,
} from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyDJ625GgMRFI_1Xlxcv2rYJsB2EP8m3Vnw',
	authDomain: 'rent-a-car-2e818.firebaseapp.com',
	projectId: 'rent-a-car-2e818',
	storageBucket: 'rent-a-car-2e818.appspot.com',
	messagingSenderId: '1011829961730',
	appId: '1:1011829961730:web:9b5520a65a04a610b3631b',
	measurementId: 'G-LXVBT2WMGP',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const storage = getStorage(app);

const carsCollectionRef = collection(db, 'cars');

export async function getAllCars() {
	const querySnapshot = await getDocs(carsCollectionRef);
	const dataArr = querySnapshot.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));
	return dataArr;
}

export async function getCar(id) {
	const docRef = doc(db, 'cars', id);
	const carSnapshot = await getDoc(docRef);
	return {
		...carSnapshot.data(),
		id: carSnapshot.id,
	};
}

export async function getHostCars() {
	const q = query(carsCollectionRef, where('hostId', '==', '123'));
	const querySnapshot = await getDocs(q);
	const dataArr = querySnapshot.docs.map((doc) => ({
		...doc.data(),
		id: doc.id,
	}));
	return dataArr;
}
export { storage };
