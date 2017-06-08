

function openStream(){
	const config = {audio: true, video: true};
	return navigator.mediaDevices.getUserMedia(config);
}



function playStream(idVideoTag, stream){
	const video = document.getElementById(idVideoTag);
	video.srcObject = stream;
	video.play;
}

// openStream()
// .then( stream => playStream('localStream', stream));

var peer = new Peer({key: 'hc37ps7y08gp66r'});

peer.on('open', id => $('#my-peer').append(id));

$('#btnCall').click(() => {
	var id = $('#remoteId').val();
	console.log(id);
	openStream()
	.then(stream => {
		playStream('localStream', stream);

		const call = peer.call(id, stream);
		call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
	});
});

peer.on('call', call => {
	openStream()
	.then(stream => {
		call.answer(stream);
		playStream('localStream', stream);
		call.on('stream', remoteStream => playStream('remoteStream', remoteStream));
	});
});