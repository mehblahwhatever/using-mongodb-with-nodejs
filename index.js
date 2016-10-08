// Let's load the mongoose module in our program
var mongoose = require('mongoose');

// Let's connect to our database using the DB server URL.
mongoose.connect('mongodb://localhost/my_database_name');

// Let's define our model for user entity. This model represents a collection in the database.
// We define the possible schema of user document and data types of each field.
var User = mongoose.model('User', {name: String, roles: Array, age: Number});

// Let's use our Models

// Lets create a new user
var user1 = new User({name: 'modulus admin', age: 42, roles: ['admin', 'moderator', 'user']});

// Some modifications in user object
user1.name = user1.name.toUpperCase();

// Let's try to print and see it. You will see _id is assigned.
console.log(user1);

// Let's save it
user1.save(function (err, userObj) {
	if(err) {
		console.log(err);
	} else {
		console.log('saved successfully: ', userObj);
	}
});

console.log('\n\n\n');

// Let's try to find a user
User.findOne({name: 'modulus admin'}, function (err, userObj) {
	if(err) {
		console.log(err);
	} else if(userObj) {
		console.log('Found: ', userObj);

		// For demo purposes let's update the user on condition.
		if(userObj.age != 30) {
			// some demo manipulation
			userObj.age += 30;

			// let's save it
			userObj.save(function (err) {
				if(err) {
					console.log(err);
				} else {
					console.log('Updated: ', userObj);
				}
			});
		}
	} else {
		console.log('User not found');
	}
});