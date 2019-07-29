// TODO: Fill in the constructor function
function GorillaError(message) {
  // Your code here..
  this.message = message;
}

GorillaError.prototype = Object.create(Error.prototype);
GorillaError.prototype.constructor = GorillaError; 

export default GorillaError;
