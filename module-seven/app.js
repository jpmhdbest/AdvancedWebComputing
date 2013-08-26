$("#search").keyup(function(e) {
    var input = $("#search").val();
	var url = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json';
	$.ajax({
		url: url,
		data: {
			q: input,
			apiKey: '57f23edw8gv78nskp3n9s9mn'
		},
		dataType: 'jsonp',
		success: showMovies
	});
	function showMovies(response) {
		if (response.total>0 || response.total<undefined){
			$('.response').remove();
			$('#left').append('<div class="response" id="table"><a href="#" id="hide" class="btn-primary btn-mini">Hide List</a><br>Click a movie to hold it. Click it again to unhold<table class="table table-bordered"><thead><tr><th>Year</th><th>Title</th></tr></thead><tbody></tbody></table></div>');
			for (var i=0;i<response.movies.length; i++){
				var movie = response.movies[i];
				$('tbody').html($('tbody').html()+'<tr id="movie'+i+'aa"><td class="picks" id="movie'+i+'">'+movie.year+'</td><td class="picks" id="movie'+i+'">'+movie.title+'</td></tr>');
				$('#right').append('<div class="response" id="movie'+i+'a"><center><h3>'+movie.year+' - '+movie.title+'</h3><br><br><img src="'+movie.posters.detailed+'"><br><br>'+movie.synopsis+'<br><br>'+movie.critics_consensus+'<br><br></div>');
				$("#movie"+i+"a").hide();
			}
			$('.picks').click(function() {
				if ($("#"+this.id+"a").hasClass("current")==false){
			    	removecurrent();
					$("#"+this.id+"a").show("blind");
					$("#"+this.id+"a").addClass("current");
					$("#"+this.id+"aa").addClass("current2");
					$("#"+this.id+"aa").css("background-color","blue");
				} else{
					removecurrent();
				}
				function removecurrent(){
					$('.current').hide("slow");
					$('.current2').css("background-color","white");
					$('.current').removeClass("current");
					$('.current2').removeClass("current2");
				}
			});
			$('.picks').mouseenter(function() {
				if ($("#"+this.id+"a").hasClass("current")==false){
					$("#"+this.id+"aa").css("background-color","yellow");
				}
				if ($(".current").length===0){
					$("#"+this.id+"a").show("blind");
				}
			});
			$('.picks').mouseleave(function() {
				if ($("#"+this.id+"a").hasClass("current")==false){
					$("#"+this.id+"aa").css("background-color","white");
				}
				if ($(".current").length===0){
					$("#"+this.id+"a").hide("slow");
				}
			});
			$('#hide').click(function(){
				$('#left').hide("slow");
				$('#right').css("width","100%");
				$('#right').css("margin-left","0");
				$('#right').prepend('<a href="#" id="show" class="btn-primary btn-mini">Show List</a>');
				$('#show').click(function(){
					$('#right').css("width","70%");
					$('#right').css("margin-left","30%");
					$('#left').show("blind");
					$('#show').remove();
				});
			});
		} else{
			$('.response').remove();
			$('#left').append('<div class="response">Your search '+input+' did not match any movies.');
		}	
	}	
});