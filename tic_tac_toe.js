( function (root) {

	var TicTacToe = root.TicTacToe = (root.TicTacToe || {});

	var readline = require('readline');
	reader = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	});

	function Board () {
		this.grid = [ ["__", "__", "__"],
									["__", "__", "__"],
									["__", "__", "__"] ];
	}

	Board.prototype.render = function() {
		for (var i = 0; i < this.grid.length; i++){
			console.log(this.grid[i]);
		}
	}

	function Player (name, mark) {
		this.name = name;
		this.mark = mark;
	}

	function TTTGame () {
		this.board = new Board();
		this.players = [ ];
		this.activePlayer;
	}

	TTTGame.prototype.getPlayerNames = function(callback) {
		reader.question("Player1, what's your name?", function(player1name) {
			reader.question("Player2, what's your name?", function(player2name) {
				callback(player1name, player2name);
			});
		});
	}

	TTTGame.prototype.makePlayers = function(player1name, player2name) {
		this.players.push(new Player(player1name, "_X"));
		this.players.push(new Player(player2name, "_O"));
		this.activePlayer = this.players[0];
		this.oneTurn();
	}

	TTTGame.prototype.parseMove = function (move) {
		var move = parseInt(move);
		if (move < 1 || move > 9) {
			console.log("Invalid move.");
			this.getMove(this.activePlayer, this.makeMove);
		} else {
			var squareCounter = 1;
			for (var i = 0; i < 3; i++){
				for (var j = 0; j < 3; j++) {
					if (move === squareCounter) {
						return [i, j];
					} else {
						squareCounter++;
					}
				}
			}
		}
	}

	TTTGame.prototype.getMove = function(player, callback) {
		var that = this;
		reader.question(player.name + ", where do you want to move?", function(move) {
			callback.call(that, player, move);
		});
	}

	TTTGame.prototype.makeMove = function(player, move) {
		move = this.parseMove(move);
		if (this.board.grid[move[0]][move[1]] === "__"){
				this.board.grid[move[0]][move[1]] = player.mark;
				if (this.gameWon()){
					this.board.render();
					console.log(this.activePlayer.name + "wins!");
					reader.close();
				} else {
					this.switchActivePlayer();
					this.oneTurn();
				}
		} else {
			console.log("Occupied already.");
			this.getMove(player, this.makeMove);
		}
	}

	TTTGame.prototype.gameWon = function(){
		return false;
	}

	TTTGame.prototype.switchActivePlayer = function() {
		this.activePlayer =
		(this.activePlayer === this.players[0] ? this.players[1] : this.players[0]);
	}

	TTTGame.prototype.oneTurn = function () {
		console.log(this.activePlayer);
		this.board.render();
		this.getMove(this.activePlayer, this.makeMove);
	}

	TTTGame.prototype.play = function() {
		this.getPlayerNames(this.makePlayers());
	}

	var game = new TTTGame();
	game.play();


})(this);