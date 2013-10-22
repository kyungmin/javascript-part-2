var readline = require('readline');
reader = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});



function Disc (size) {
	this.size = size;
}



function Stack (discs) {
	this.discs = discs;
}

Stack.prototype.validMove = function (startStack) {
	var topDisc = this.discs[this.discs.length - 1];
	var movingDisc = startStack.discs[startStack.discs.length - 1];

	if (this.discs.length === 0 || movingDisc.size < topDisc.size) {
		return true;
	} else {
		return false;
	}
}

Stack.prototype.displayString = function() {
	var displayString = "";
	for (var i = 0; i < this.discs.length; i++) {
		displayString += this.discs[i].size + " ";
	}
	return displayString;
}


function TowersGame (stack1, stack2, stack3) {
	this.stacks = [stack1, stack2, stack3];
}


TowersGame.prototype.gameWon = function() {
	if (this.stacks[1].discs.length === 4) {
		return true;
	} else if (this.stacks[2].discs.length === 4) {
		return true;
	} else {
		return false;
	}
}

TowersGame.prototype.oneTurn = function() {
	var that = this;
	this.displayStacks();

	if (this.gameWon()) {
		console.log("You win!");
		reader.close();

	} else {
		var startStack;
		var endStack;

		var parseStartStack = function(answer) {
			startStack = that.stacks[(parseInt(answer) - 1)];
		}

		var parseEndStack = function(answer) {
			endStack = that.stacks[(parseInt(answer) - 1)];
			if (endStack.validMove(startStack)) {
				that.moveDisc(startStack, endStack);
				that.oneTurn();
			} else {
				console.log("Can't move a larger disc on to a smaller disc.");
			}
		}
		this.promptForMove(parseStartStack, parseEndStack);
	}
}

TowersGame.prototype.promptForMove = function (callback1, callback2) {
	reader.question("Where do you want to move from?", function (answer1) {
		callback1(answer1);
		reader.question("Where do you want to move to?", function (answer2) {
			callback2(answer2);
		});
	});
}


TowersGame.prototype.displayStacks = function() {
	console.log("Stack 1: " + this.stacks[0].displayString());
	console.log("Stack 2: " + this.stacks[1].displayString());
	console.log("Stack 3: " + this.stacks[2].displayString());
}

TowersGame.prototype.moveDisc = function (startStack, endStack) {
	endStack.discs.push(startStack.discs.pop());
}

TowersGame.prototype.run = function () {
	console.log("Let the game begin!");

	this.oneTurn(false);

}


var disc1 = new Disc(1);
var disc2 = new Disc(2);
var disc3 = new Disc(3);
var disc4 = new Disc(4);

var stack1 = new Stack([disc4, disc3, disc2, disc1]);
var stack2 = new Stack([]);
var stack3 = new Stack([]);

var game = new TowersGame(stack1, stack2, stack3);

game.run();