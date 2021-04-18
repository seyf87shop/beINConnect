	var isChrome = {
	    Chrome: function() {
	        return navigator.userAgent.match(/Chrome/i);
	    },
	};
	var isVivo = {
	    Vivo: function() {
	        return navigator.userAgent.match(/Vivo/i);
	    },
	};
	var browserCheck = {
	    Opera: function() {
	        return navigator.userAgent.match(/Opera Mini/i);
	    },
	    Mozilla: function() {
	       return navigator.userAgent.match(/Mozilla/i);
	    },
		Chrome: function() {
			return navigator.userAgent.match(/Chrome/i);
	    },	
	    any: function() {
	        return (browserCheck.Opera() || browserCheck.Mozilla() || browserCheck.Chrome());
	    }
	};
	var hls;
	var jako="";
	var i;
	var j;
	function showChannels (gaolVanus, channel){
		clear(document.getElementById("channels"));
		data = JSON.parse (performGet('https://ak.janjua.pw/mobile/channels/live/'+sn));
		var title = document.createElement ("h1");
		title.innerHTML="Please select channel to play";
		title.style.color="#0e0e0e";
		document.getElementById('channels').appendChild(title);
		jako = gaolVanus.substring(0,2) + gaolVanus.substring(3,gaolVanus.length);
		for (var i=0; i<data.channelsList.length; i++){
			var mcaDiv = document.createElement ("div");
			mcaDiv.setAttribute("id","stream_id_" + i);
			mcaDiv.setAttribute("class","mca_box2");
		
			var link = document.createElement ("a");
			link.setAttribute ("data-transition","fade");
			if (data.channelsList[i].streamsList && data.channelsList[i].streamsList.length>0){
		 		var title = document.createElement ("h1");
				title.innerHTML="Please select video quality";
				document.getElementById('streams').appendChild(title);	
				var link = document.createElement ("a");
				link.setAttribute ("href", "#pagetwo");
				link.setAttribute ("onclick","showLinks("+i+")");			
				link.setAttribute("color", "black");
				link.setAttribute ("class","ui-btn2 ui-shadow ui-corner-all");
				link.innerHTML=data.channelsList[i].caption;
				link.setAttribute ("data-transition","slide");
				var clearDiv = document.createElement("div");
				clearDiv.setAttribute("class", "clear");
				mcaDiv.appendChild(link);
				mcaDiv.appendChild(clearDiv);
				document.getElementById('streams').appendChild(mcaDiv);	
			} else {
				var mcaDiv = document.createElement ("div");
				mcaDiv.setAttribute("class","mca_box2");
				mcaDiv.setAttribute("id","stream_id_" + i);
				link.setAttribute ("href","#future_channel"+data.channelsList[i].channelId);		
				createOfflineLinks(i);
				link.setAttribute ("class","ui-btn2 ui-shadow ui-corner-all");
				link.setAttribute ("data-rel","dialog");
				link.innerHTML=data.channelsList[i].caption;
				mcaDiv.appendChild(link);
				mcaDiv.appendChild(clearDiv);
				document.getElementById('streams').appendChild(mcaDiv);
			}

			var clearDiv = document.createElement("div");
			clearDiv.setAttribute("class", "clear");
			mcaDiv.appendChild(link);
			mcaDiv.appendChild(clearDiv);
			document.getElementById('channels').appendChild(mcaDiv);
		}
	}
	
	function createOfflineLinks(channel) {
		var offlineDiv = document.createElement ("div");
		offlineDiv.setAttribute("data-role","page");
		offlineDiv.setAttribute("id", "future_channel"+data.channelsList[channel].channelId);
		var header = document.createElement ("div");
		header.setAttribute("data-role","header");
		var title = document.createElement ("h1");
		title.innerHTML=data.channelsList[channel].caption;
		title.setAttribute("style", "font-size: 2em;");
		header.appendChild(title);
		offlineDiv.appendChild(header);
		var innerDiv = document.createElement ("div");
		innerDiv.setAttribute("class","ui-content");
		innerDiv.setAttribute("data-role","main");
		var text = document.createElement ("p");
		text.setAttribute("style", "padding-left:10px; background: #0e0e0e;");
		text.innerHTML = "Channel is currently offline";
		innerDiv.appendChild(text);
		var link = document.createElement("a");
		link.setAttribute("href", "#pageone");
		link.setAttribute("class", "ui-btn ui-btn-inline ui-shadow ui-corner-all");
		var imageLink = document.createElement("IMG");
		imageLink.setAttribute("src", "https://www.arabickoora.com/images/goback.png");
		imageLink.setAttribute("width","120");
		imageLink.setAttribute("height","46");
		imageLink.setAttribute("alt","");
		imageLink.setAttribute("style","padding-top:20px;");
		link.appendChild(imageLink);
		innerDiv.appendChild(link);
		offlineDiv.appendChild(innerDiv);
		document.body.appendChild(offlineDiv);
	}
	
	function showLinks (channel){
		clear(document.getElementById("streams"));
		
		var title = document.createElement ("h1");
		title.innerHTML="Please select video quality";
		document.getElementById('streams').appendChild(title);
		
		for (var i=0; i < data.channelsList[channel].streamsList.length; i++){
			var mcaDiv = document.createElement ("div");
			mcaDiv.setAttribute("id","stream_id_" + i);
			mcaDiv.setAttribute("class","mca_box2");
			
			var link = document.createElement ("a");

			link.setAttribute ("href", "#video");
			link.setAttribute ("class","ui-btn2 ui-shadow ui-corner-all");
			link.setAttribute ("onclick", "createVideo("+channel+", "+i+")");	
			link.innerHTML=data.channelsList[channel].streamsList[i].caption;
			link.setAttribute ("data-transition","slide");
			var clearDiv = document.createElement("div");
			clearDiv.setAttribute("class", "clear");
			mcaDiv.appendChild(link);
			mcaDiv.appendChild(clearDiv);
			document.getElementById('streams').appendChild(mcaDiv);
		}
	}
	
	function createVideo(i, j) {
			//ea = data.channelsList[channel].fmsUrl;
			if (Hls.isSupported()) {
				clear(document.getElementById("videoDiv"));
				videoPlayer = document.createElement("video");
				videoPlayer.setAttribute("id", "videoplayer");
				videoPlayer.setAttribute("width", "100%");
				videoPlayer.setAttribute("height", "auto");
				videoPlayer.setAttribute("poster", "https://www.smartcric.com/resources/images/black.jpg");	
				videoPlayer.setAttribute("controls", true);		
				videoPlayer.setAttribute("autoplay", true);
				hls = new Hls({fLoader: vidictLoader});							
				hls.attachMedia(videoPlayer);
				hls.on(Hls.Events.MEDIA_ATTACHED, function () {
					var hlsUrl = "https://"+ea+":8088/live/"+data.channelsList[i].streamsList[j].streamName+"/playlist.m3u8?id="+data.channelsList[i].streamsList[j].streamId+"&pk=" + jako;
            	   	hls.loadSource(hlsUrl);
               		hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {});
				});		
                videoPlayer.play();
			} else {
				url = "https://"+ea+":8088/live/"+data.channelsList[i].streamsList[j].streamName+"/playlist.m3u8?id="+data.channelsList[i].streamsList[j].streamId+"&pk=" + jako;
				clear(document.getElementById("videoDiv"));
			
				videoPlayer = document.createElement("video");
				videoPlayer.setAttribute("id", "videoplayer");
				var source = document.createElement("source");
				videoPlayer.setAttribute("width", "100%");
				videoPlayer.setAttribute("height", "auto");
				videoPlayer.setAttribute("poster", "https://www.smartkanal.com/images/black.jpg");	
				videoPlayer.setAttribute("controls", true);		
				videoPlayer.setAttribute("autoplay", true);
				source.setAttribute("src", url);
				source.setAttribute("type", "video/mp4");
				videoPlayer.appendChild(source);
					
				var em = document.createElement("em");
				em.innerHTML = "Sorry, your browser doesn't support HTML5 video.";
				videoPlayer.appendChild(em);
			   }		  
			document.getElementById("videoDiv").appendChild(videoPlayer);

	}
