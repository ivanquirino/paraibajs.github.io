/* 
* @Author: sergiovilar
* @Date:   2014-05-01 10:39:13
* @Last Modified by:   sergiovilar
* @Last Modified time: 2014-05-01 13:45:47
*/

$(document).ready(function(){
   	
	// Pega as fotos dos speakers
	
	$('.talk').each(function(i, item){

		var img = $(item).find('img');
		var email = img.attr('data-email');

		img.attr('src', 'http://www.gravatar.com/avatar/' + CryptoJS.MD5(email) + '?s=64');

	});

	$('.photos').each(function(i, item){

		var id = $(item).attr('data-id');

		$.get('https://graph.facebook.com/'+id+'/photos', function(data){

			var html = '';

			for(var i in data.data){
				html += '<figure class="col-md-4 col-sm-6 col-xs-6"><a href="'+data.data[i].link+'" target="_blank"><img src="'+data.data[i].source+'" /></a></figure>';
			}

			$(item).html(html);

		});

	});

	// Monta o mapa do local
	
	var mapaContainer = $('#mapa');

	if(mapaContainer.length > 0){

		map = new GMaps({
	        div: '#mapa',
	        lat: -12.043333,
	        lng: -77.028333
	    });

		GMaps.geocode({
		  address: mapaContainer.attr('data-endereco'),
		  callback: function(results, status) {
		    if (status == 'OK') {
		      var latlng = results[0].geometry.location;
		      map.setCenter(latlng.lat(), latlng.lng());
		      map.addMarker({
		        lat: latlng.lat(),
		        lng: latlng.lng()
		      });
		    }
		  }
		});

	}	

});