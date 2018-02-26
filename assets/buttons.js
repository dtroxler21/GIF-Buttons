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

          for (var i = 0; i < results.length; i++) {

          	if (results[i].rating !== "r" && results[i].rating !== "pg-13") {


	          // Creating a div to hold the gifs
	          var gifDiv = $("<div class='gif'>");

	          // Storing the rating in a variable
	          var rating = results[i].rating;

	          // Creating an element to have the rating displayed
	          var ratingP = $("<p>").text("Rating: " + rating);

	          // Displaying the rating
	          gifDiv.append(ratingP);

            // Storing the still gif
            var sportImage = results[i].images.original_still.url;

            // Displaying the gifs
            gifDiv.append("<img src=" + sportImage + ">");

	          // Putting the gifs at the top of the div
	          $("#gif-view").prepend(gifDiv);
		        };
	        };

            alert("Click a GIF to play the GIF!");


        });

      };


      function playGIF {

      };
      
      // Function for displaying the buttons
      function renderButtons() {

        // Deleting the prior buttons to avoid repeats
        $("#sports-buttons").empty();

        for (var i = 0; i < topics.length; i++) {

          // Dynamicaly generating buttons for each sports term in the array
          var a = $("<button>");
          // Adding a class of sports-btn to our button
          a.addClass("sports-btn");
          // Adding a data-attribute
          a.attr("data-name", topics[i]);
          // Providing the button text
          a.text(topics[i]);
          // Adding the button to the buttons div
          $("#sports-buttons").append(a);
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

      // // Adding a click event listener to all elements with a class of "sports-btn"
      $(document).on("click", ".sports-btn", displaySportsInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();