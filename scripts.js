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
	var dataSTR = JSON.stringify(data);
	var i = 0;
	while(i<6)
	{
		//Future work for image display
		/*mUrls[i]= data.results[i].poster_path;
		var mPoster = document.createElement("IMG");
		mPoster.src="http://image.tmdb.org/t/p/w200"+mUrls[i];
		mPoster.setAttribute("width", "304");
		mPoster.setAttribute("height", "228");
		mPoster.setAttribute("alt", "Movie image");*/
		//document.body.appendChild(mPoster);
		document.getElementById("demo").innerHTML += data.results[i].title+", ";

		i ++;
	}
	document.getElementById("demo").innerHTML += data.results[i].title+".";
	
	/*document.getElementById("demo1").innerHTML = data.results[1].title;
	document.getElementById("demo2").innerHTML = data.results[2].title;
	document.getElementById("demo3").innerHTML = data.results[3].title;
	document.getElementById("demo4").innerHTML = data.results[4].title;*/

}
req.send();
req2.onload = function()
{
	var data2 = JSON.parse(this.response);
	var dataSTR2 = JSON.stringify(data2);
	var i = 0;
	while(i<6)
	{
		document.getElementById("demo2").innerHTML += data2.results[i].name+", ";
		i ++;
	}
	document.getElementById("demo2").innerHTML += data2.results[i].name+".";
}
req2.send();
