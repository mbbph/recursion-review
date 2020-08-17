// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
//we're dealing with these types of objects:
//array []
//plain object {}
//null
//function
//these objects can contain numbers, booleans, and strings
var stringifyJSON = function(obj) {
  //array
  if (Array.isArray(obj)) { //if our object is an array
    let result = '['; //start with '[' (and later close with ']')
    for (let i = 0; i < obj.length; i++) { //iterate through array elements
      let val = obj[i];
      let string = stringifyJSON(val); //recur on each element and get the result
      if (string === 'undefined') {
        result = result + null + ','; //replace value with null, because deleting elements from arrays is not permitted and undefined is not a valid JSON value.
      } else {
        result = result + string + ',';
      }
    }
    //we're always tacking on a comma after every array element, so we will end up with a comma before the closing bracket. We must delete it.
    if (result.charAt(result.length - 1) === ',') {
      result = result.slice(0, result.length - 1); //get rid of extra comma
    }
    return result + ']'; //add our closing bracket
  //null
  } else if (obj === null) { //null has type object so needs to be checked before plain object
    return 'null';
  //plain object
  } else if (typeof obj === 'object') {
    let result = '{';
    for (const key in obj) { //iterate through (key, value) pairs
      let val = obj[key];
      let string = stringifyJSON(val); //recur on the value
      if (string !== 'undefined') { //only add it to our resulting string if the element is not undefined.
        result = result + '\"' + key + '\"' + ':' + string + ',';
      }
    }
    //delete the extra comma
    if (result.charAt(result.length - 1) === ',') {
      result = result.slice(0, result.length - 1);
    }
    return result + '}';
  //base cases
  //Stringify turns functions and undefined values both into undefined.
  } else if ((typeof obj === 'function') || (typeof obj === 'undefined')) {
    return 'undefined';
  } else if ((typeof obj === 'number') || (typeof obj === 'boolean')) { //number: ex: 9, true
    return '' + obj;
  } else { //(typeof obj === 'string')
    return '\"' + obj + '\"';
    //Note: There is the possibility that an element could be the string "undefined" rather than truly undefined. These two are differentiated in that strings get double quotes tacked onto both ends of them.
  }
};
