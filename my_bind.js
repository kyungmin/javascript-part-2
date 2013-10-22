Function.prototype.myBind = function(scope) {
	this.apply(scope);
}

function Cat(name) {
	this.name = name;
}

Cat.prototype.sayCat = function() {
	console.log("my name is " + this.name);
};

var sayDog = function() {
	console.log("my name is " + this.name);
};

var bobby = new Cat("bobby");
var gizmo = new Cat("gizmo");

bobby.sayCat.myBind(bobby);
sayDog.myBind(gizmo);







