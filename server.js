const express = require("express");
const app = express();
const pets = require("./data.js");

// Get all pets and return HTML to display the pets (.map())
app.get('/pets', (req, res) => {
	// loop through array to display raw text / send
  res.send(`
		<h1>
    Dog Breeds: ${pets.map((pet) => ' ' + pet.breed)}
		</h1>
	`);
});

// Retrieve a single pet using the owner's name with a query string and display the pet.
app.get('/pets/owner', (req, res) => {
	const name = req.query.name;
	const petOwnerName = pets.map((pet) => pet.owner);
	const petName = pets.map((pet) => pet.name);
	if (petOwnerName.includes(name)) {
		const index = petOwnerName.indexOf(name);
		res.send(`<h1>${petName[index]} is the name of ${petOwnerName[index]}'s dog.</h1>`)
	} else {
		res.send(`<h1>${name} doesn't have a dog. :( </h1>`);
	}
});

// Retrieve a single pet using a name parameter and display the single pet.
app.get('/pets/:name', (req, res) => {
	const name = req.params.name;
	const petName = pets.map((pet) => pet.name);
	petName.includes(name) ? res.send(`<h1>${name} was found.</h1>`) : res.send(`<h1>${name} was not found.</h1>`);
});

const PORT = 3000;
app.listen(PORT, () => {
  `listening on port ${PORT}`;
});
