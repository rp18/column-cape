// user inputs name one at a time.
// each time the user presses submit, it appends it in an array and the current list shows up in the browser
// if the user presses clear list, the array turn into an empty array and the list appearing in the browser disappears
// if the user clicks randomize, a function randomizes groups according to the limits set by the user
// a message pops up saying however many times left to randomize before everyone has been grouped with each other


var testNameArray = ["Kevin", "Evan", "Yuan", "Raymond", "Chris", 
                  "Laquitta", "Michael D.", "Scott", "Julmar", "Ben",
                  "Sarah", "Rose", "Nicholas", "Michael R.", "Nico", 
                  "Nelson", "Pascal", "George", "Vivian", "Gabriel", 
                  "Camila", "Elizabeth"];
var testLocationArray = ["Sacramento, CA", "Orland Park, IL", "Boston, MA", "Oakland, CA", "Phoenix, AZ", 
                      "Vicksburg, MA", "Santa Clarita, CA", "Manchester, NH", "Providence, RI", "Berlin, Germany",
                      "Merced, CA", "Alameda, CA", "Mesa, AZ", "New York, NY", "Midland, MI",
                      "Saratoga, CA", "Kigali, Rwanda", "Mountain View, CA", "Queens, NY", "Bend, OR",
                      "Miami, FL", "Vacaville, CA"];

var nameArray = [];
var locationArray = [];
var usersArray = [];

var myNum = 0
var numInPair = 0;



$('#submit').click(function(){ //clicking the submit button
  myNum += 1 //keeps a tally of the number of times clicked (set to 0 when Clear All clicked)
  nameArray.push(document.querySelector('#nameInput').value); //pushes text inside input to the array
  locationArray.push(document.querySelector('#cityInput').value);
  usersArray = convertToArrayOfObjects(nameArray, locationArray);

  for (var i = 0; i < usersArray.length; i++) {
    myNum += 1
    $('#students').append('<li class = "'+ myNum + '">' + usersArray[i].name + '</li>');
    $('#cities').append('<li class = "'+ myNum + '">' + usersArray[i].city + '</li>');
  }
});

$('#remotePrep').click(function(){ //clicking the submit button
  $('#students').empty()
  $('#cities').empty()
  usersArray = convertToArrayOfObjects(testNameArray, testLocationArray);

  for (var i = 0; i < usersArray.length; i++) {
    myNum += 1
    $('#students').append('<li class = "'+ myNum + '">' + usersArray[i].name + '</li>');
    $('#cities').append('<li class = "'+ myNum + '">' + usersArray[i].city + '</li>');
  }
});

$('#oneDelete').click(function(){ // clicking the delete last button
  usersArray.pop(); // removes last item from the array
  $('.'+myNum).remove(); // removes final item from the list
  myNum -= 1; // lowers tally by 1, so you can continue subtracting from the list, as well as making addition consistent
})

$('#clear').click(function() { // clicking the clear list button
  usersArray.length = 0; // mutates array to empty
  $('#students').html(''); // clears list
  $('#cities').html('');
  myNum = 0; // sets the tally to 0
})

$('#random').click(function() {
  $('#pairs').empty();  // clears pairs
  $('#groups').empty();

  var numInPair = document.getElementById('num').value;
  numInPair = parseInt(numInPair);

  var shuffledArray = shuffleArray(usersArray);

  var pairsArray = chunk(shuffledArray, numInPair);

  for (var i = 0; i < pairsArray.length; i++) {
    $('#groups').append("Group " + (i + 1) +":<br>| ");
    for (var j = 0; j < pairsArray[i].length; j++) {
      $('#groups').append(pairsArray[i][j].name + " | ");
    }
    $('#groups').append("<br>");
  }
})
  

function convertToArrayOfObjects(name, city) {
    i = 0, k = 0,
    output = [];

    for (i = 0; i < name.length; i++) {
        obj = {};
        obj["name"] = name[i];
        obj["city"] = city[i];
        output.push(obj);
    }

    return output;
}


/**
 * Randomize array element order in-place.
 * Using Durstenfeld shuffle algorithm.
 */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}


function chunk (arr, len) {
  var chunks = [];
  i = 0;
  n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }
  return chunks;
}