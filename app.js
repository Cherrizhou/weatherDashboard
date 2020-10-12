
var todayData = function (data) {
    let cityName = $("#cityName").val().charAt(0).toUpperCase() + $("#cityName").val().slice(1);
    let todayDiv = $("<div>");
    let date = data.list[4].dt_txt.slice(0, 10);
    let icon = data.list[4].weather[0].icon;
    let iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
    let iconEl = $("<img>").attr("src", iconUrl).addClass("icon");
    let title = $("<h4>").text(cityName + "(" + date + ")").append(iconEl).addClass("cityTitle");
    let tempF = (parseFloat(data.list[4].main.temp) - 273.5) * 1.8 + 32;
    let temp = $("<p>").text("Temp: " + tempF.toFixed(1) + "\u00B0F");
    let humidity = $("<p>").text("Humidity: " + data.list[4].main.humidity + "%");
    let wind = $("<p>").text("Wind Speed: " + data.list[4].wind.speed + " MPH");

    todayDiv.append(title, temp, humidity, wind);
    todayDiv.addClass("today");
    $("#today").append(todayDiv);
};

var uvData = function (uvNumber) {
    var uvDiv = $("<div>");
    var uv = $("<p>").text("UV Index: " + uvNumber.value);
    uvDiv.append(uv);
    $("#today").append(uvDiv);

    if (parseFloat(uvNumber.value) < 3) {
        uvDiv.addClass("green");
    } else if (parseFloat(uvNumber.value) >= 3 && parseFloat(uvNumber.value) < 5) {
        uvDiv.addClass("yellow");
    } else if (parseFloat(uvNumber.value) >= 5 && parseFloat(uvNumber.value) < 7) {
        uvDiv.addClass("orange");
    } else if (parseFloat(uvNumber.value) >= 7 && parseFloat(uvNumber.value) < 10) {
        uvDiv.addClass("red");
    } else if (parseFloat(uvNumber.value) >= 10) {
        uvDiv.addClass("purple");
    }

};



$("#search").on("click", function (event) {
    event.preventDefault();

    let cityName = $("#cityName").val();
    let queryURL = "https://api.openweathermap.org/data/2.5/forecast?appid=0af8c478a01ad29533aeea92fb8979ae&q=" + cityName;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {


        let lat = response.city.coord.lat;
        let lon = response.city.coord.lon;
        let uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=0af8c478a01ad29533aeea92fb8979ae&lat=" + lat + "&lon=" + lon;
        $.ajax({
            url: uvQueryURL,
            method: "GET"
        }).then(function (uvResponse) {
            todayData(response);
            uvData(uvResponse);
            futureData(response);

        });

    });

});



var futureData = function (data) {
    let titleDiv = $("<div>");
    let title = $("<h4>").text("5-Day Forcast:")
    titleDiv.append(title);
    $("#title").append(titleDiv);

    let futureDiv = $("<div>");
    let rowDiv = $("<div>");

    for (i = 4; i <= 40; i += 8) {

        let colDiv = $("<div>");
        let cardDiv = $("<div>");
        let date = $("<p>").text(data.list[i].dt_txt.slice(0, 10)).addClass("date");

        let icon = data.list[i].weather[0].icon;
        let iconUrl = "https://openweathermap.org/img/wn/" + icon + "@2x.png";
        let iconEl = $("<img>").attr("src", iconUrl).addClass("iconS");

        let tempF = (parseFloat(data.list[i].main.temp) - 273.5) * 1.8 + 32;
        let temp = $("<p>").text("Temp: " + tempF.toFixed(1) + "\u00B0F");
        let humidity = $("<p>").text("Humidity: " + data.list[i].main.humidity + "%");


        cardDiv.addClass("card");
        colDiv.addClass("col");
        rowDiv.addClass("row");
        futureDiv.addClass("container");
        cardDiv.append(date, iconEl, temp, humidity);
        colDiv.append(cardDiv);
        rowDiv.append(colDiv);
        futureDiv.append(rowDiv);
        $("#future").append(futureDiv);
    }
};









