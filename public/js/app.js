var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room');

var socket = io();

console.log(name + ' wants to join ' + room);

socket.on('connect', function () {
	console.log('connected to socket.io server!');
});

socket.on('message', function (message) {
	var momentTimestamp = moment.utc(message.timestamp);
	var timeVis = '[' + momentTimestamp.local().format('h:mm a') + '] ';
	
	var $message = jQuery('.messages')

	console.log('New message:');
	console.log(message.text);

	$message.append('<p><strong>' + message.name + ' ' + timeVis + '</strong></p>');
	$message.append('<p>' + message.text + '</p>');
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		name: name,
		text: $message.val()
	});

	$message.val('');
});