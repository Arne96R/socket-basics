var socket = io();

socket.on('connect', function () {
	console.log('connected to socket.io server!');
});

socket.on('message', 'timestamp', function (message, timestamp) {
	var momentTimestamp = moment.utc(timestamp);
	var timeVis = momentTimestamp.local().format('h:mm a')
	console.log('New message:');
	console.log('['+ timeVis + ']' + message.text);

	jQuery('.messages').append('<p>' + '['+ timeVis + ']' + message.text + '</p>');
});

// Handles submitting of new message
var $form = jQuery('#message-form');

$form.on('submit', function (event) {
	event.preventDefault();

	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val()
	});

	$message.val('');
});