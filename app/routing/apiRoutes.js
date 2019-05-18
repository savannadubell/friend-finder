// Pull in required dependencies
var path = require('path');

// Import the list of friend entries
var friends = require('../data/friends');

// Export API routes
module.exports = function(app) {
	// console.log('___ENTER apiRoutes.js___');

	// Total list of friend entries
	app.get('/api/friends', function(req, res) {
		res.json(friends);
	});

	// Add new friend entry
	app.post('/api/friends', function(req, res) {
		// Capture the user input object
		var userInput = req.body;
		// console.log('userInput = ' + JSON.stringify(userInput));

		for(var i = 0; i < userInput.scores.length; i++) {
			userInput.scores[i] = parseInt(userInput.scores[i]);
		  }
		// console.log('userResponses = ' + userResponses);

		// Compute best friend match
		var bestFriendIndex = 0;
    	var minimumDifference = 50// Make the initial value big for comparison

		// Examine all existing friends in the list
		for (var i = 0; i < friends.length; i++) {
			// console.log('friend = ' + JSON.stringify(friends[i]));

			// Compute differenes for each question
			for(var i = 0; i < friends.length; i++) {
				var totalDifference = 0;
				for(var j = 0; j < friends[i].scores.length; j++) {
				  var difference = Math.abs(userInput.scores[j] - friends[i].scores[j]);
				  totalDifference += difference;
				};
			// console.log('diff = ' + diff);

			// If lowest difference, record the friend match
		
				// console.log('Closest match found = ' + diff);
				// console.log('Friend name = ' + friends[i].name);
				// console.log('Friend image = ' + friends[i].photo);

			if(totalDifference < minimumDifference) {
					bestFriendIndex = i;
					minimumDifference = totalDifference;
			};
		};
		
		// Add new user
		friends.push(userInput);

		// Send appropriate response
		res.json(friends[bestFriendIndex]);
		};
	});
};