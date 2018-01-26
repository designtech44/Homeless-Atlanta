$(document).ready(function () {

    jQuery.ajaxPrefilter(function (options) {
        if (options.crossDomain && jQuery.support.cors) {options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
        }
    });

    $("button").on("click", function () {
        validateUserZip();
    });



    /*-----------------------------------------FUNCTIONS--------------------------------------*/
        function validateUserZip(){
            var zipCode = $("#zip-input").val().trim();

            var zipCodePattern = /^\d{5}$/.test(zipCode);

             if (zipCodePattern === true){
                getEvents(zipCode);
             } else {
                errorAlert();
             }


/*            if (zipCode == ""){
                errorAlert();
            } else if (isNaN(zipCode)){
                errorAlert();
            } else {
                getEvents(zipCode);
            }*/
        }

        function getEvents(userZip){
            var eventDiv = $("<div class='event'>");

            $("#event-view").empty(eventDiv);

            var queryURL = "https://api.meetup.com/2/open_events/?text=homeless&zip=" + userZip + "&key=121028602b27a7f3d6e3b25533506b";

            $.ajax({
                url: queryURL,
                method: "GET"
            }).done(function (response) {

                var results = response.results;

                for (var i = 0; i < response.results.length; i++) {
                    var city = results[i].venue.city;

                    var eventURL = results[i].event_url;

                    var eventName = results[i].name;

                    var groupName = results[i].group.name;


                    $(eventDiv).append("<br>Event: " + eventName + "<br>Group Name: " + groupName + "<br>City: " + city + "<br> <a href='" + eventURL + "'>View More Details</a>");

                    $("#event-view").append(eventDiv);

                }
            });
        }

        function errorAlert(){
            var errorDiv = $("<div class='error'>");

            $("#input-error").empty(errorDiv);

            $(errorDiv).append("<p>Please Enter a Valid Zip Code</p>");

            $("#input-error").append(errorDiv);
        }


});