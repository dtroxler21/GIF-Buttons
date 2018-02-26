var topics = ["lebron", "shaq", "unc", "yankees", "baseball", "soccer"]

function displaySportsInfo() {

        var sportsTerm = $(this).attr("data-name");
        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + sportsTerm + "&api_key=NwAIVNWh53NmQhvtI8Cj2vAUyuK09THV&limit=10";

        // Creating an AJAX call for the specific movie button being clicked
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

	          // Storing the rating data
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
		    }
	      }
        });

      }
      
      // Function for displaying movie data
      function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#sports-buttons").empty();

        // Looping through the array of movies
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie-btn to our button
          a.addClass("sports-btn");
          // Adding a data-attribute
          a.attr("data-name", topics[i]);
          // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#sports-buttons").append(a);
        }
      }

      // This function handles events where a movie button is clicked
      $("#add-sports").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var sportsInput = $("#sports-input").val().trim();

        // Adding movie from the textbox to our array
        topics.push(sportsInput);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

        //Clearing input box
        $("#sports-input").val("");
      });

      // // Adding a click event listener to all elements with a class of "movie-btn"
      $(document).on("click", ".sports-btn", displaySportsInfo);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();