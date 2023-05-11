import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Cars = () => {
	const [cars, setCars] = useState([]);
	useEffect(() => {
		fetch('/api/cars')
			.then((res) => res.json())
			.then((data) => setCars(data.cars))
			.catch((err) => console.log(err));
	}, []);

	const carElements = cars.map((car) => (
		<div key={car.id} className='car-tile'>
			<Link to={`/cars/${car.id}`}>
				<img src={car.imageUrl} alt={car.name} />
				<div className='car-info'>
					<h3>{car.name}</h3>
					<p>
						${car.price}
						<span>/day</span>
					</p>
				</div>
				<i className={`car-type ${car.type} selected`}>{car.type}</i>
			</Link>
		</div>
	));
	return (
		<div className='car-list-container'>
			<h1>Explore our car options</h1>
			<div className='car-list'>{carElements}</div>
		</div>
	);
};

export default Cars;
