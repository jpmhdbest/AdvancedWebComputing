$("#button").click(function(){
	var input = $("#search").val();
	var url = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json';
	$.ajax({
		url: url,
		data: {
			q: input,
			apiKey: 'hcrurhsttexasrgfm2y6yahm'
		},
		dataType: 'jsonp',
		success: showMovies
	});
	function showMovies(response) {
		console.log(response);
		$('.table-part').remove();
		$('body').append('<div class="row table-part part1"><div class="offset1 span10 table-part"><table class="table-part table table-bordered table-striped table-condensed table-hover"><thead><tr table-part><th><center>Image</th><th><center>Title</th><th><center>Release Dates</th><th><center>Info</th></tr></thead><tbody></tbody></table></div></div>');
		for (var i=0;i<response.movies.length; i++){
			var movie = response.movies[i];
			$('tbody').html($('tbody').html()+'<tr><td><center><img src="'+movie.posters.detailed+'"></td><td><center><h4>'+movie.title+'</h4></td><td><center>'+movie.year+'</td><td><center>Cast<br>Review<br>Synopsis</td></tr>');
		}
	}
});

$("#search").keypress(function(e) {
    if(e.which == 13) {
        var input = $("#search").val();
		var url = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json';
		$.ajax({
			url: url,
			data: {
				q: input,
				apiKey: 'hcrurhsttexasrgfm2y6yahm'
			},
			dataType: 'jsonp',
			success: showMovies
		});
		function showMovies(response) {
			console.log(response);
			$('.table-part').remove();
			$('body').append('<div class="row table-part"><div class="offset1 span10"><table class="table table-bordered 	table-hover"><thead><tr><th><center>Image</th><th><center>Title</th><th><center>Release Dates</th><th><center>Info</th></tr></thead><tbody></tbody></table></div></div>');
			for (var i=0;i<response.movies.length; i++){
				var movie = response.movies[i];
				$('tbody').html($('tbody').html()+'<tr><td><center><img src="'+movie.posters.detailed+'"></td><td><center><h4>'+movie.title+'</h4></td><td><center>'+movie.year+'</td><td><center><a class="btn btn-info btn-large" id="synopsis'+i+'">Synopsis</a><br><br><a class="btn btn-info btn-large" id="review'+i+'">Review</a></td></tr><tr id="synopsis'+i+'2"><td colspan="4">'+movie.synopsis+'</td></tr><tr id="review'+i+'2"><td colspan="4">'+movie.critics_consensus+'</td></tr>');
				$("#review"+i+"2").hide();
				$("#synopsis"+i+"2").hide();
			}
			$('.btn-info').mouseenter(function() {
			    $("#"+this.id+"2").show("blind");
			});
			$('.btn-info').mouseleave(function() {
			    $("#"+this.id+"2").hide("slow");
			});
		}
    }	
});
