class Vector2 {
	constructor(x, y){
		this.x = typeof(x) == "number" ? x : 0;
    	this.y = typeof(y) == "number" ? y : 0;
	}

	set(x, y){
		if(typeof(x) == "number") this.x = x;
		if(typeof(y) == "number") this.y = y;
	}

	add(x, y){
		if(x instanceof Vector2) {
			this.x += x.x;
			this.y += x.y;
		} else {
			if(typeof(x) == "number") {
				this.x += x;
				if(typeof(y) != "number") {
					this.y += x;
				}
			}
			if(typeof(y) == "number") this.y += y;
		}

		return this;
	}

	subtract(x, y){
		if(x instanceof Vector2) {
			this.x -= x.x;
			this.y -= x.y;
		} else {
			if(typeof(x) == "number") {
				this.x -= x;
				if(typeof(y) != "number") {
					this.y -= x;
				}
			}
			if(typeof(y) == "number") this.y -= y;
		}

		return this;
	}

	cross(x, y){
		if(x instanceof Vector2) {
			return this.x * x.y - this.y * x.x;
		} else {
			if(typeof(x) == "number") {
				if(typeof(y) != "number") {
					return this.x * x - this.y * x;
				} else {
					return this.x * y - this.y * x;
				}
			}
		}

		return null;
	}

	dot(x, y){
		if(x instanceof Vector2) {
			return this.x * x.x + this.y * x.y;
		} else {
			if(typeof(x) == "number") {
				if(typeof(y) != "number") {
					return this.x * x + this.y * x;
				} else {
					return this.x * x + this.y * y;
				}
			}
		}

		return null;
	}

	multiply(x, y){
		if(x instanceof Vector2) {
			this.x *= x.x;
			this.y *= x.y;
		} else {
			if(typeof(x) == "number") {
				this.x *= x;
				if(typeof(y) != "number") {
					this.y *= x;
				}
			}
			if(typeof(y) == "number") this.y *= y;
		}

		return this;
	}

	divide(x, y){
		if(x instanceof Vector2) {
			this.x /= x.x;
			this.y /= x.y;
		} else {
			if(typeof(x) == "number") {
				this.x /= x;
				if(typeof(y) != "number") {
					this.y /= x;
				}
			}
			if(typeof(y) == "number") this.y /= y;
		}

		return this;
	}

	clone(){
		return new Vector2(this.x, this.y);
	}

	normalise(){
		this.set(this.normalised.x, this.normalised.y);
		return this;
	}

	get magnitude(){
		return Math.sqrt(this.squareMagnitude); 
	}

	get squareMagnitude(){
		return this.x * this.x + this.y * this.y;
	}

	get normalised(){
		return Vector2.normalised(this);
	}

	get absolute(){
		let abs = this.clone();
		abs.x = abs.x < 0 ? -abs.x : abs.x;
		abs.y = abs.y < 0 ? -abs.y : abs.y;
		return abs;
	}
}

Vector2.normalised = function(vector){
	let scale = 1 / copy.magnitude;
	return Vector2.multiply(vector, scale);
}

Vector2.zero = new Vector2(0, 0);

Vector2.right = new Vector2(1, 0);

Vector2.left = new Vector2(-1, 0);

Vector2.up = new Vector2(0, 1);

Vector2.down = new Vector2(0, -1);

Vector2.one = new Vector2(1, 1);

//Angle in radians
Vector2.from_polar = function(angle, radius){
	return new Vector2(radius * Math.cos(angle), radius * Math.sin(angle));
}

Vector2.distance_raw = function(a, b){
	return Vector2.subtract(b, a);
}

Vector2.to_angle = function(vector){
	return Math.atan2(vector.y, vector.x);
}

Vector2.distance = function(a, b){
	return Vector2.distance_raw(a, b).absolute.magnitude;
}

Vector2.add = function(a, b){
	return a.clone().add(b);
}

Vector2.substract = function(a, b){
	return a.clone().subtract(b);
}

Vector2.multiply = function(a, b){
	return a.clone().multiply(b);
}

Vector2.divide = function(a, b){
	return a.clone().divide(b);
}

Vector2.cross = function(a, b){
	return a.cross(b);
}

Vector2.dot = function(a, b){
	return a.dot(b);
}

module.exports = Vector2;