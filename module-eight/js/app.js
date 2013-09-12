var source   = $("#body-template").html();
var template = Handlebars.compile(source);
var source2   = $("#body-template2").html();
var template2 = Handlebars.compile(source2);
var counter = 0;
$('.checkboxes').click(function(){
	counter = 0;
	var response = { movies:[]};
	var chkctr = 0;
	var chkctr2 = 0;
	if ($('#search').prop("checked")||$('#box').prop("checked")||$('#showing').prop("checked")||$('#soon').prop("checked")){
		$("#tbody > tr").remove();
		$("#tbody > center").remove();
	}
	if ($('#search').prop("checked")){
		chkctr++;
		if ($("#inp").val() == ""){
			$("#tbody").html($("#tbody").html()+template2());
		} else {
			var input = $("#inp").val();
			var url = 'http://api.rottentomatoes.com/api/public/v1.0/movies.json';
			var pglimit = 50;
			iSearch(url,input,undefined,undefined,pglimit);
		}
	}
	if ($('#box').prop("checked")){
		chkctr++;
		var url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/box_office.json';
		var country = 'ph';
		var limit = 50;
		iSearch(url,undefined,country,limit,undefined);
	}
	if ($('#showing').prop("checked")){
		chkctr++;
		var url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/in_theaters.json';
		var country = 'ph';
		var pglimit = 50;
		iSearch(url,undefined,country,undefined,pglimit);
	}
	if ($('#soon').prop("checked")){
		chkctr++;
		var url = 'http://api.rottentomatoes.com/api/public/v1.0/lists/movies/upcoming.json';
		var country = 'ph';
		var pglimit = 50;
		iSearch(url,undefined,country,undefined,pglimit);
	}
	function iSearch(url,input,country,limit,pglimit){
		var url2 = url
		if (input != undefined){
			var input2 = input;
		} else {
			var input2 = "";
		}
		if (country != undefined){
			var country2 = country;
		} else {
			var country2 = "";
		}
		if (limit != undefined){
			var limit2 = limit; 
		} else {
			var limit2 = "";
		}
		if (pglimit != undefined){
			var pglimit2 = pglimit;
		} else {
			var pglimit2 = "";
		}
		var tosend = {
			url: url2,
			data: {
				q: input2,
				apiKey: '57f23edw8gv78nskp3n9s9mn',
				country: country2,
				limit: limit2,
				page_limit: pglimit2
			},
			dataType: 'jsonp',
			success: addMovies
		};
		$.ajax(tosend);
	}
	function addMovies(res){
		chkctr2++;
		if (chkctr2 === 1){
			response.movies = response.movies.concat(res.movies);
		} else {
			var response2 = new Object({ movies:[]});
			for (var i=0;i<response.movies.length; i++){
				for (var j=0;j<res.movies.length; j++){
					if (response.movies[i].title==res.movies[j].title){
						response2.movies = response2.movies.concat(res.movies[j]);
					}
				}
			}
			response = new Object({ movies:[]});
			response.movies = response.movies.concat(response2.movies);
		}
		if (chkctr === chkctr2){
			showMovies(response);
		}		
	}
});
function showMovies(response) {
	if (response.movies.length === 0){
		$("#tbody").html($("#tbody").html()+template2());
	}
	for (var i=0;i<response.movies.length; i=i+5){
		var movie1 = response.movies[i];
		var movie2 = response.movies[i+1];
		var movie3 = response.movies[i+2];
		var movie4 = response.movies[i+3];
		var movie5 = response.movies[i+4];
		var pic1 = image(i);
		var data = { movies: [
			{iden: 'movie'+counter, title: movie1.title, poster: pic1}
			]};
		if (response.movies[i+1]!=undefined){
			var pic2 = image(i+1);
			data.movies = data.movies.concat([{iden: 'movie'+(counter+1), title: movie2.title, poster: pic2}]);
		} 
		if (response.movies[i+2]!=undefined){
			var pic3 = image(i+2);
			data.movies = data.movies.concat([{iden: 'movie'+(counter+2), title: movie2.title, poster: pic3}]);
		} 
		if (response.movies[i+3]!=undefined){
			var pic4 = image(i+3);
			data.movies = data.movies.concat([{iden: 'movie'+(counter+3), title: movie2.title, poster: pic4}]);
		} 
		if (response.movies[i+4]!=undefined){
			var pic5 = image(i+4);
			data.movies = data.movies.concat([{iden: 'movie'+(counter+4), title: movie2.title, poster: pic5}]);
		}
		function image(ctr){
			if (response.movies[ctr].posters.detailed!=undefined){
				return response.movies[ctr].posters.detailed;
			} else if (response.movies[ctr].posters.profile!=undefined){
				return response.movies[ctr].posters.profile;
			} else if (response.movies[ctr].posters.original!=undefined){
				return response.movies[ctr].posters.original;
			} else if (response.movies[ctr].posters.thumbnail!=undefined){
				return response.movies[ctr].posters.thumbnail;
			} else {
				return undefined;
			}
		}
		$("#tbody").html($("#tbody").html()+template(data));
		$('#movie'+counter).attr({'data-title':movie1.title});
		$('#movie'+counter).attr({'data-content':movie1.synopsis});
		if (response.movies[i+1]!=undefined){
			$('#movie'+(counter+1)).attr({'data-title':movie2.title});
			$('#movie'+(counter+1)).attr({'data-content':movie2.synopsis});
		}
		if (response.movies[i+2]!=undefined){
			$('#movie'+(counter+2)).attr({'data-title':movie3.title});
			$('#movie'+(counter+2)).attr({'data-content':movie3.synopsis});
		}
		if (response.movies[i+3]!=undefined){
			$('#movie'+(counter+3)).attr({'data-title':movie4.title});
			$('#movie'+(counter+3)).attr({'data-content':movie4.synopsis});
		}
		if (response.movies[i+4]!=undefined){
			$('#movie'+(counter+4)).attr({'data-title':movie5.title});
			$('#movie'+(counter+4)).attr({'data-content':movie5.synopsis});
		}
		counter = counter+5;
	}
	$('.hoverme').mouseenter(function(){
		$('#'+this.id).popover({placement:'bottom'});
		$('#'+this.id).popover('show');
	});
	$('.hoverme').mouseleave(function(){
		$('#'+this.id).popover('hide');
	});
	$('.hoverme').css("height","300px");
	$('.hoverme').css("width","auto");
}