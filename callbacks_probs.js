function Clock() {
};

Clock.prototype.run = function() {
	this.currentTime = new Date();
	this.displayTime();
	setInterval( this.tick.bind(this) , 5000);
};

Clock.prototype.incrementTime = function() {
	this.currentTime = new Date(this.currentTime.getTime() + 5000);
};

Clock.prototype.displayTime = function() {
	this.currentHour = this.currentTime.getHours();
	this.currentMinutes = this.currentTime.getMinutes();
	this.currentSeconds = this.currentTime.getSeconds();

	console.log(this.currentHour + ":" + this.currentMinutes + ":" + this.currentSeconds);
};

Clock.prototype.tick = function() {
	this.incrementTime();
	this.displayTime();
}

var clock = new Clock();
clock.run();