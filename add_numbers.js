var readline = require('readline');

reader = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

var addNumbers = function (sum, numsLeft, completionCallback) {
	if (numsLeft > 0) {
		reader.question("What's your number?", function (num) {
			var num1 = parseInt(num);
			sum += num1;
			console.log(sum);
			numsLeft--;
			addNumbers(sum, numsLeft, completionCallback);
		});
	} else if (numsLeft === 0) {
		completionCallback(sum);
	}
}

addNumbers(0, 3, function(sum) {
	console.log("Total Sum: " + sum );
	reader.close();
});

