// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
//Solution implemented using closure recursion
var getElementsHelper = function(e, n) { //e = element, n = target class name
  var subResults = [];
  //first, check if the current element has the class we're looking for.
  var sublist = e.classList;
  for (let i = 0; i < sublist.length; i++) {
    if (sublist[i] === n) {
      subResults.push(e); //add e to results
      break;
    }
  }
  //next, check if the element contains any children which have the class we're looking for.
  var subChildren = e.childNodes; //recur on inner children
  for (let i = 0; i < subChildren.length; i++) {
    if (subChildren[i].nodeType === Node.ELEMENT_NODE) { //make sure we're only analyzing node elements
      subResults = subResults.concat(getElementsHelper(subChildren[i], n)); //recur on children
    }
  }
  return subResults;
};

//driver function that offloads the main process to the helper function.
var getElementsByClassName = function(className) {
  var b = document.body;
  return getElementsHelper(b, className);
};
