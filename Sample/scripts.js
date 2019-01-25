//request variable
var req= new XMLHttpRequest();


//creating the HTTP Request
req.open('GET','https://api.themoviedb.org/3/trending/movie/week?api_key=417064dd158a1f2fd09d9d30c872e628', true);

req.onload = function()
{
	var data = JSON.parse(this.response);
	var dataSTR = JSON.stringify(data);
	//var i = 0;
	//while(i<7)
	//{

	document.getElementById("demo0").innerHTML = data.results[0].title;

		//i ++;
	//}
	
	document.getElementById("demo1").innerHTML = data.results[1].title;
	document.getElementById("demo2").innerHTML = data.results[2].title;
	document.getElementById("demo3").innerHTML = data.results[3].title;
	document.getElementById("demo4").innerHTML = data.results[4].title;

}
req.send();
