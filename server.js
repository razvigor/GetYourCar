import { createServer, Model, Response } from 'miragejs';

createServer({
	models: {
		cars: Model,
		users: Model,
	},

	seeds(server) {
		server.create('car', {
			id: '1',
			name: 'Modest Explorer',
			price: 60,
			description:
				'The Modest Explorer is a van designed to get you out of the house and into nature. This beauty is equipped with solar panels, a composting toilet, a water tank and kitchenette. The idea is that you can pack up your home and escape for a weekend or even longer!',
			imageUrl: 'gs://rent-a-car-2e818.appspot.com/modest-explorer.png',
			type: 'simple',
			hostId: '123',
		});
		server.create('car', {
			id: '2',
			name: 'Beach Bum',
			price: 80,
			description:
				"Beach Bum is a van inspired by surfers and travelers. It was created to be a portable home away from home, but with some cool features in it you won't find in an ordinary camper.",
			imageUrl: 'gs://rent-a-car-2e818.appspot.com/beach-bum.png',
			type: 'rugged',
			hostId: '123',
		});
		server.create('car', {
			id: '3',
			name: 'Reliable Red',
			price: 100,
			description:
				"Reliable Red is a van that was made for travelling. The inside is comfortable and cozy, with plenty of space to stretch out in. There's a small kitchen, so you can cook if you need to. You'll feel like home as soon as you step out of it.",
			imageUrl: 'gs://rent-a-car-2e818.appspot.com/reliable-red.png',
			type: 'luxury',
			hostId: '456',
		});
		server.create('car', {
			id: '4',
			name: 'Dreamfinder',
			price: 65,
			description:
				'Dreamfinder is the perfect van to travel in and experience. With a ceiling height of 2.1m, you can stand up in this van and there is great head room. The floor is a beautiful glass-reinforced plastic (GRP) which is easy to clean and very hard wearing. A large rear window and large side windows make it really light inside and keep it well ventilated.',
			imageUrl: 'gs://rent-a-car-2e818.appspot.com/dreamfinder.png',
			type: 'simple',
			hostId: '789',
		});
		server.create('car', {
			id: '5',
			name: 'The Cruiser',
			price: 120,
			description:
				'The Cruiser is a van for those who love to travel in comfort and luxury. With its many windows, spacious interior and ample storage space, the Cruiser offers a beautiful view wherever you go.',
			imageUrl: 'gs://rent-a-car-2e818.appspot.com/the-cruiser.png',
			type: 'luxury',
			hostId: '789',
		});
		server.create('car', {
			id: '6',
			name: 'Green Wonder',
			price: 70,
			description:
				"With this van, you can take your travel life to the next level. The Green Wonder is a sustainable vehicle that's perfect for people who are looking for a stylish, eco-friendly mode of transport that can go anywhere.",
			imageUrl: 'gs://rent-a-car-2e818.appspot.com/green-wonder.png',
			type: 'rugged',
			hostId: '123',
		});
		server.create('user', {
			id: '123',
			email: 'kamaradsasa@gmail.com',
			password: 'p123',
			name: 'Sasa',
		});
	},

	routes() {
		this.namespace = 'api';
		this.passthrough('https://firestore.googleapis.com/**');
		this.logging = false;
		// this.timing = 2000

		this.get('/cars', (schema, request) => {
			// return new Response(400, {}, {error: "Error fetching data"})
			return schema.vans.all();
		});

		this.get('/cars/:id', (schema, request) => {
			const id = request.params.id;
			return schema.vans.find(id);
		});

		this.get('/host/cars', (schema, request) => {
			// Hard-code the hostId for now
			return schema.vans.where({ hostId: '123' });
		});

		this.get('/host/cars/:id', (schema, request) => {
			// Hard-code the hostId for now
			const id = request.params.id;
			return schema.vans.findBy({ id, hostId: '123' });
		});

		this.post(
			'/login',
			(schema, request) => {
				const { email, password } = JSON.parse(request.requestBody);
				// This is an extremely naive version of authentication. Please don't
				// do this in the real world, and never save raw text passwords
				// in your database 😇
				const foundUser = schema.users.findBy({ email, password });
				if (!foundUser) {
					return new Response(
						401,
						{},
						{ message: 'No user with those credentials found!' }
					);
				}

				// At the very least, don't send the password back to the client 😅
				foundUser.password = undefined;
				return {
					user: foundUser,
					token: "Enjoy your car, here's your tokens.",
				};
			},
			{ timing: 2000 }
		);
	},
});
