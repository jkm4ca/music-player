
jQuery(function($) {
	/*Parse.initialize("V3gBkkMqZltQkG5erEOUiMLsUAwesu4uRfMY6apX", "55GQihe3OQkyyOk4ws0uUOBWgHsQeX2cJ9zFGh6b");

	var query = new Parse.Query("playlist");
	query.find({
  		success: function(results) {
  			console.log(results);
    	// results is an array of Parse.Object.
  		},
  		error: function(error) {
    	// error is an instance of Parse.Error.
  		}
	});
	//Search through folders to generate list of tracks
	var playlist = [];
	var count = 1;
	//For each song in folder, create song obj to put into playlist
		var songObj = {
			track: count,
			name: "untitled",
			file: "no filepath",
		};
		playlist.push(songObj);
	*/
	var list =[
		{"track":1,"name":"Crossfire","file":"crossfire"},
		{"track":2,"name":"Wedding March Variation 1","file":"02_Wedding_March_1"},
		{"track":3,"name":"lol","file":"03_Happy_Birthday_Variation_In_The"}
	];
	var i = 0;
	while (list[i]){
		$("#list").append("<li>" + list[i].name + "</li>");
		i++;
	};

	var supportsAudio = !!document.createElement('audio').canPlayType;
	if(supportsAudio) {
		var index = 0,
		playing = false;
		mediaPath = 'audio/',
		extension = '',
		tracks = [
		{"track":1,"name":"Crossfire","file":"crossfire"},
		{"track":2,"name":"Wedding March Variation 1","file":"02_Wedding_March_1"},
		{"track":3,"name":"lol","file":"03_Happy_Birthday_Variation_In_The"}
		],
		trackCount = tracks.length,
		//Link status to HTML
		npAction = $('#npAction'),
		npTitle = $('#npTitle'),

		audio = $('#audio1').bind('play', function() {
			playing = true;
			npAction.text('Now Playing:');
		}).bind('pause', function() {
			playing = false;
			npAction.text('Paused:');
			//Autoplay Functionality
		}).bind('ended', function() {
			npAction.text('Paused:');
			if((index + 1) < trackCount) {
				index++;
				loadTrack(index);
				audio.play();
			} else {
				audio.pause();
				index = 0;
				loadTrack(index);
			}
		}).get(0),

		//PREV button
		btnPrev = $('#btnPrev').click(function() {
			if((index - 1) > -1) {
				index--;
				loadTrack(index);
				if(playing) {
					audio.play();
				}
			} else {
				audio.pause();
				index = 0;
				loadTrack(index);
			}
		}),

		//NEXT button
		btnNext = $('#btnNext').click(function() {
			if((index + 1) < trackCount) {
				index++;
				loadTrack(index);
				if(playing) {
					audio.play();
				}
			} else {
				audio.pause();
				index = 0;
				loadTrack(index);
			}
		}),

		//Song Selection to Play
		li = $('#plUL li').click(function() {
			var id = parseInt($(this).index());
			if(id !== index) {
				playTrack(id);
			}
		}),

		loadTrack = function(id) {
			$('.plSel').removeClass('plSel');
			$('#plUL li:eq(' + id + ')').addClass('plSel');
			npTitle.text(tracks[id].name);
			index = id;
			audio.src = mediaPath + tracks[id].file + extension;
		},

		playTrack = function(id) {
			loadTrack(id);
			audio.play();
		};
		if(audio.canPlayType('audio/ogg')) {
			extension = '.ogg';
		}
		if(audio.canPlayType('audio/mpeg')) {
			extension = '.mp3';
		}
		loadTrack(index);
	}
});      