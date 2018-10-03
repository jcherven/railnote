// Initialize Firebase
var config = {
    apiKey: "AIzaSyDxZjT7nt5Nf7HG6f_QBis0T2kf_9JsafQ",
    authDomain: "homework07-railnote.firebaseapp.com",
    databaseURL: "https://homework07-railnote.firebaseio.com",
    projectId: "homework07-railnote",
    storageBucket: "homework07-railnote.appspot.com",
    messagingSenderId: "221464291324"
};
firebase.initializeApp(config);

var database = firebase.database();

// handle event for submit button
$('#submit-button').on('click', function(event) {
    event.preventDefault();

    // capture user input
    var trainNameInput = $('#train-name-input').val().trim();
    var destinationInput = $('#destination-input').val().trim();
    var frequencyInput = $('#frequency-input').val().trim();
    var nextArrivalInput = $('#next-arrival-input').val().trim();

    //create local temp object for the new train data
    var newRecord = {
        name: trainNameInput,
        destination: destinationInput,
        frequency: frequencyInput,
        nextArrival: nextArrivalInput
    };

    // write to firebase
    database.ref().push(newRecord);

    // clear text boxes
    $('#train-name-input').val('');
    $('#destination-input').val('');
    $('#frequency-input').val('');
    $('#next-arrival-input').val('');

    // Get the current timestamp
    var currentTime = moment().format('HH:mm');
    console.log(currentTime);
    // Calculate difference between timestamp and next arrival
    console.log(nextArrivalInput);

}); // End submit button listener

// create firebase event for adding new train record to the db, add a row in the railnote container
database.ref().on('child_added', function(childSnapshot) {
    // store values in variables
    var trainName = childSnapshot.val().name;
    var destination = childSnapshot.val().destination;
    var frequency = childSnapshot.val().frequency;
    var nextArrival = childSnapshot.val().nextArrival;

    // append new row to the table
    var newRow = $('<tr>').append(
        $('<td>').text(trainName),
        $('<td>').text(destination),
        $('<td>').text(frequency),
        $('<td>').text(nextArrival)
    );

    $('#my-railnote > tbody').append(newRow);
}); // End Firebase data write/retrieve event

