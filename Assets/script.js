var city = $("#city").val();

var apiKey = "&appid=d7ea103782caf604118a57f32d78ef2f";

$("#searchBtn").on("click", function (event) {
    event.preventDefault();
    city = $("#city").val();
    $("#city").val("");

    var queryUrl = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey;

    $.ajax({
        url: queryUrl,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.city.name);
        console.log(response.list[0].weather[0].icon);
        var tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;
        console.log(Math.floor(tempF));
        console.log(response.list[0].main.humidity);
        console.log(response.list[0].wind.speed);

        currentWeather(response);
        currentForcast(response);
        makeList();
    });
});

function makeList() {
    var listItem = $("<li>").addClass("list-group-item").text(city);
    $(".list").append(listItem);
};

function currentWeather(response) {
    let tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;
    tempF = Math.floor(tempF);
    $("#city").empty();

    var card = $("<div>").addClass("card");
    var cardBody = $("<div>").addClass("card-body");
    var currentCity = $("<h4>").addClass("card-title").text(response.city.name);
    var cityDate = $("<h4>").addClass("card-title").text(response.list.dt);
    var temperature = $("<p>").addClass("card-text current-temp").text("Temperature: " + tempF + " °F");
    var humidity = $("<p>").addClass("card-text current-humidity").text("Humidity: " + response.list[0].main.humidity + "%");
    var wind = $("<p>").addClass("card-text current-wind").text("Wind Speed: " + response.list[0].wind.speed + "MPH");
    var image = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png");

    currentCity.append(cityDate, image);
    cardBody.append(currentCity, temperature, humidity, wind);
    card.append(cardBody);
    $("#currentCity").append(card);
};

function currentForcast() {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + city + apiKey,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.list[0].dt);
        $("#forecast").empty();

        var results = response.list;
        console.log(results);

        for (let i = 0; i < results.length; i++) {
            var day = Number(results[i].dt_txt.split("-")[2].split(" ")[0]);
            var hour = results[i].dt_txt.split("-")[2].split(" ")[1];
            console.log(day);
            console.log(hour);

            if (results[i].dt_txt.indexOf("12:00:00") !== -1) {
                var temp = (results[i].main.temp - 273.15) * 1.80 + 32;
                var tempF = Math.floor(temp);

                var card = $("<div>").addClass("card col-md-2 ml-4 bg-primary text-white");
                var cardBody = $("<div>").addClass("card-body p-3 forcastBody");
                var cityDate = $("<h4>").addClass("card-title").text(response.list.dt);
                var temperature = $("<p>").addClass("card-text forecastTemp").text("Temperature: " + tempF + " °F");
                var humidity = $("<p>").addClass("card-text forecastHumidity").text("Humidity: " + results[i].main.humidity + "%");
                var image = $("<img>").attr("src", "https://openweathermap.org/img/wn/" + results[i].weather[0].icon + "@2x.png");

                cardBody.append(cityDate, image, temperature, humidity);
                card.append(cardBody);
                $("#forecast").append(card);
            };
        };
    });
};
