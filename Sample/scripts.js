//request variable
var req= new XMLHttpRequest();


//creating the HTTP Request
req.open('GET','https://api.themoviedb.org/3/trending/movie/week?api_key=417064dd158a1f2fd09d9d30c872e628', true);

req.onload = function()
{
	var data = JSON.parse(this.response);
	var dataSTR = JSON.stringify(data);
	document.getElementById("demo").innerHTML = dataSTR;

	//var i = 0;
	//while(i<7)
	//{

	document.getElementById("demo0").innerHTML = data.results[0].title;

		//i ++;
	//}

req.send();
