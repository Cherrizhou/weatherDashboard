var cityName = $("#cityName").val();
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?appid=0af8c478a01ad29533aeea92fb8979ae&q=" + cityName;

$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    todayData(response);
});

var lat = response.city.coord.lat;
var lon = response.city.coord.lon;
var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=0af8c478a01ad29533aeea92fb8979ae&lat=" + lat + "&lon=" + lon;
$.ajax({
    url: queryURL,
    method: "GET"
}).then(function (response) {
    console.log(response);
    console.log(response.value);
});