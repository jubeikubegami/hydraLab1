//request variable
var req= new XMLHttpRequest();
var req2 = new XMLHttpRequest();


//creating the HTTP Request
req.open('GET','https://api.themoviedb.org/3/trending/movie/week?api_key=417064dd158a1f2fd09d9d30c872e628', true);
req2.open('GET', 'https://api.themoviedb.org/3/trending/tv/week?api_key=417064dd158a1f2fd09d9d30c872e628', true);

req.onload = function()
{
	var mUrls =[];
	var data = JSON.parse(this.response);
	var i = 0;
	while(i<12)
	{
		//Future work for image display
		mUrls[i]= data.results[i].poster_path;
		var mPoster = document.createElement("IMG");
		mPoster.src="http://image.tmdb.org/t/p/w200"+mUrls[i];
		mPoster.className = "trendPoster";
		mPoster.setAttribute("width", "100");
		mPoster.setAttribute("height", "150");
		mPoster.setAttribute("alt", data.results[i].title);
		//document.getElementById("demo").innerHTML += "<div class ='trendBlock'>";
		document.getElementById("demo").appendChild(mPoster);
		//document.getElementById("demo").innerHTML += "<div class ='trendTitle'>"+data.results[i].title +"</div>"+"</div>";
		i ++;
	}
	/*mUrls[i]= data.results[i].poster_path;
	mPoster.src="http://image.tmdb.org/t/p/w200"+mUrls[i];
	mPoster.setAttribute("width", "200");
	mPoster.setAttribute("height", "300");
	mPoster.setAttribute("alt", "Movie image");
	document.getElementById("demo").appendChild(mPoster);
	document.getElementById("demo").innerHTML += data.results[i].title+".";*/

}
req.send();
req2.onload = function()
{
	var data2 = JSON.parse(this.response);
	var i = 0;
	var tUrls = [];
	while(i<12)
	{
		tUrls[i]= data2.results[i].poster_path;
		var tPoster = document.createElement("IMG");
		tPoster.src="http://image.tmdb.org/t/p/w200"+tUrls[i];
		tPoster.setAttribute("width", "100");
		tPoster.setAttribute("height", "150");
		tPoster.setAttribute("alt", data2.results[i].name);
		//document.getElementById("demo2").innerHTML += "<div class ='trendBlock'>";
		document.getElementById("demo2").appendChild(tPoster);
		//document.getElementById("demo2").innerHTML += "<div class ='trendTitle'>"+data2.results[i].name+"</div>"+"</div>";
		i ++;
	}
	/*tUrls[i]= data2.results[i].poster_path;
	tPoster.src="http://image.tmdb.org/t/p/w200"+tUrls[i];
	tPoster.setAttribute("width", "200");
	tPoster.setAttribute("height", "300");
	tPoster.setAttribute("alt", "Movie image");
	document.getElementById("demo").appendChild(tPoster);
	document.getElementById("demo2").innerHTML += data2.results[i].name;*/
}
req2.send();
