var topics = ["lebron", "shaq", "unc", "yankees", "baseball", "soccer"]

function displaySportsInfo() {

        var sportsTerm = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + sportsTerm + "&api_key=NwAIVNWh53NmQhvtI8Cj2vAUyuK09THV&limit=10";

        // Creating an AJAX call for when a button is clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

          console.log(response);

          var results = response.data

          // Emptying div for the new gifs to be displaying by themselves
          $("#gif-view").empty();

          for (var i = 0; i < results.length; i++) {

          	if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

	          // Creating a div to hold the gifs
	          var gifDiv = $("<div>");

	          // Storing the rating in a variable
	          var rating = results[i].rating;

	          // Creating an element to have the rating displayed
	          var ratingP = $("<p>").text("Rating: " + rating);

	          // Displaying the rating
	          gifDiv.append(ratingP);

            // Creating an image for the gifs
            var sportImage = $("<img class='gif'>")
            
            // Giving image attribute to store still gif
            sportImage.attr("src", results[i].images.original_still.url);
            sportImage.attr("data-still", results[i].images.original_still.url);

            // Storing the original gif            
            var originalGIF = results[i].images.original.url;
            console.log(originalGIF);

            // Giving the image an attribute for the original gif
            sportImage.attr("date-animate", originalGIF);
            console.log(sportImage.attr("date-animate"));

            // Giving the image an attribute for data-state to be used later
            sportImage.attr("data-state", "still");

            // Displaying the gifs
            gifDiv.append(sportImage);

            // Putting the gifs at the top of the div
	          $("#gif-view").prepend(gifDiv);
		        };
	        };
        });

      };
      
      // Function for displaying the buttons
      function renderButtons() {

        // Deleting the prior buttons to avoid repeats
        $("#sports-buttons").empty();

        for (var i = 0; i < topics.length; i++) {

          // Dynamicaly generating buttons for each sports term in the array
          var gifButton = $("<button>");
          // Adding a class of sports-btn to our button
          gifButton.addClass("sports-btn");
          // Adding a data-attribute
          gifButton.attr("data-name", topics[i]);

          // Providing the button text
          gifButton.text(topics[i]);
          // Adding the button to the buttons div
          $("#sports-buttons").append(gifButton);
        };
      };

      // This function handles events where someone adds a button
      $("#add-sports").on("click", function(event) {
        event.preventDefault();
        // Grabbing the input from the textbox
        var sportsInput = $("#sports-input").val().trim();

        // Adding the topic from the textbox to our array
        topics.push(sportsInput);

        // Calling renderButtons to add the new button
        renderButtons();

        // Clearing input box
        $("#sports-input").val("");
      });

      // Adding a click event listener to all elements with a class of "sports-btn"
      $(document).on("click", ".sports-btn", displaySportsInfo);
      
      $(document).on("click", ".gif", function() {
              var state = $(this).attr("data-state");
              console.log(state);

              if (state === "still") {
                $(this).attr("src", $(this).attr("data-animate"));
                console.log($(this).attr("src"));
                $(this).attr("data-state", "animate");
              } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
              }
            });

      // Calling the renderButtons function to display the intial buttons
      renderButtons();