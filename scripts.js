//request variable
var req= new XMLHttpRequest();


//creating the HTTP Request
req.open('GET','https://api.themoviedb.org/3/trending/movie/week?api_key=417064dd158a1f2fd09d9d30c872e628', true);

req.onload = function()
{
	var data = JSON.parse(this.response);
	var dataSTR = JSON.stringify(data);
	document.getElementById("demo").innerHTML = dataSTR;
}
req.send();
