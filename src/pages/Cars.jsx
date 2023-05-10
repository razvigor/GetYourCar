import { useEffect } from 'react';

const Cars = () => {
	useEffect(() => {
		fetch('/api/cars');
	}, []);
	return <div>Cars</div>;
};

export default Cars;
