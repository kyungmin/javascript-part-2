var readline = require('readline');
reader = readline.createInterface();


var askLessThan = function(el1, el2, callback) {
	console.log("thing1: " + el1);
	console.log("thing2: " + el2);
	reader.question("Is thing1 less than thing2?", function(answer) {
		if (answer === "yes") {
			callback(true);
		} else {
			callback(false);
		}
	});

};

var performSortPass = function(arr, i, madeAnySwaps, callback) {
	if (i < arr.length - 1) {
		askLessThan(arr[i], arr[i+1], function(lessThan) {
			if (lessThan) {
				var el1 = arr[i];
				var el2 = arr[i+1];
				arr[i] = el2;
				arr[i+1] = el1;
				madeAnySwaps = true;
			}
			i++;
			performSortPass(arr, i, madeAnySwaps, callback);
		});
	} else if (i === arr.length - 1) {
		callback(madeAnySwaps);
	}


	if (madeAnySwaps) {
		performSortPass(arr, i, false, callback);
	}
};


var crazyBubbleSort = function(arr, sortCompletionCalback) {

	var sortPassCallback = function() {

	};

	var passCallback = function(condition) {
		if (condition) {
			sortPassCallback();
		}
	}

};
