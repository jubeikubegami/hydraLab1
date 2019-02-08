//References Based on the Moviedb requests CodePen Project by Kristiyan https://codepen.io/Gochev/pen/rwYxKB
//This feature is for the movie searching
(function(){
    String.format = function () {
    var s = arguments[0];
    for (var i = 0; i < arguments.length - 1; i++) {
        var reg = new RegExp("\\{" + i + "\\}", "gm");
        s = s.replace(reg, arguments[i + 1]);
    }
    return s;
}

var searchKeyword;
var key;
var urlTemplate = "https://api.themoviedb.org/3/search/movie?api_key={0}&language=en-US&query={1}&include_adult=false&page={2}";
var settings = {
    async: true,
    crossDomain: true,
    method: "GET",
    headers: {},
    dataType: "json"
};
$("#jsGrid").jsGrid({
    height: "auto",
    width: "100%",
    paging: true,
    autoload: true,
    pageSize: 20,
    pageLoading: true,

    controller: {
        loadData: function (filter) {

            var d = $.Deferred();

            if (!searchKeyword || !key) {
                return;
            }

            settings.url = String.format(urlTemplate, key, searchKeyword, filter.pageIndex);

            $.ajax(settings).done(function (response) {
                var data = {
                    data: response.results,
                    itemsCount: response.total_results
                };

                d.resolve(data);
            });

            return d.promise();
        }
    },
    fields: [
        { name: "id", type: "text", css: "movie-id", width: 0 },
        { name: "title", type: "text", valueField: "id", textField: "Title" },
        { name: "original_title", type: "text" },
        { name: "release_date", type: "text" },
    ]
});

$("#pager").on("change", function () {
    var page = parseInt($(this).val(), 10);
    $("#jsGrid").jsGrid("openPage", page);
});

$('#btn').click(function () {
    $("#tableBody").empty();
    searchKeyword = $("#input").val();
    key = $("#key").val();

    $("#jsGrid").jsGrid("search");
});

//POPUP WINDOW

$(document).on('click', ".jsgrid-table tr", function () {
    var movieid = $(this).children(".movie-id").first().html();
    var key = $("#key").val();
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://api.themoviedb.org/3/movie/" + movieid + "?api_key=" + key,
        "method": "GET",
        "headers": {},
    }
    $.ajax(settings).done(function (response) {
        $("#detailsContainer").empty();
        var movie = response;
        var imgUrl = 'http://image.tmdb.org/t/p/w200/';
        var $modal = $('#myModal');
        var $span = $(".close")[0];
        var details = [movie.title, movie.original_title, movie.release_date, movie.spoken_languages, movie.production_countries, movie.overview];
        var currentImage = imgUrl + movie.poster_path;
        console.log(movie);

        if (currentImage == "http://image.tmdb.org/t/p/w320/null") {
            currentImage = "http://wonkville.net/wp-content/uploads/2016/04/No-image-available.jpg"
        };

        $("#image").attr("src", currentImage);

        appendLiElements();

        $('#secondDetailsContainer ul li').each(function (i) {
            $(this).empty();
            var data = details[i];
            var dataToInsert;
            if (!data) {
                data = "No data were found";
            }

            if (data instanceof Array) {
                if (data.length > 0) {
                    data = data
                } else {
                    data = "No data were found";
                }
                for (var t = 0; t < data.length; t++) {
                    if (dataToInsert) {
                        if (data.length > t) {
                            dataToInsert += ", ";
                        }

                        dataToInsert += data[t].name;
                    }
                    else {
                        dataToInsert = data[t].name;
                    }
                }
            }
            if (!dataToInsert) {
                dataToInsert = data;
            }


            $(this).append(dataToInsert);

        });
        $modal.css("display", "block");
        $span.onclick = function () {
            $modal.css("display", "none");
        };

        window.onclick = function (event) {
            var modal = document.getElementById('myModal');
            if (event.target == modal) {
                modal.style.display = "none";
            }
        };
    }).fail(function (jqxhr, textStatus, error) {
        var err = jqxhr.responseText + ", " + error;
        alert("Request Failed: " + err);
    });


    function appendLiElements() {
        var $listcontainer = $("<ul />")
        $("#detailsContainer")
            .append($listcontainer);
        $listcontainer
            .append($("<li />")
                .text("Title:").css({ "font-weight": "bold" }));
        $listcontainer
            .append($("<li />")
                .text("Original Title:").css({ "font-weight": "bold" }));
        $listcontainer
            .append($("<li />")
                .text("Release Date:").css({ "font-weight": "bold" }));
        $listcontainer
            .append($("<li />")
                .text("Spoken Languages:").css({ "font-weight": "bold" }));
        $listcontainer
            .append($("<li />")
                .text("Production Countries:").css({ "font-weight": "bold" }));
        $listcontainer
            .append($("<li />")
                .text("Overview:").css({ "font-weight": "bold" }));
    };
});

}());
