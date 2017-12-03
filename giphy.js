//Create empty array to hold reactions
var reactions = ["yep", "nope", "cute", "surprise", "awesome", "noice"];

//Function to render buttons from reactions array
function renderButtons() {
	$("#buttons-view").empty();
	$.each(reactions, function(index, value) {
    	$("#buttons-view").append($('<input type="button" value="' + value + '">'));
    });
}

//Event listener on submit button to add new phrase to array and render buttons
$("#new-reaction").on("click", function(event) {
	event.preventDefault();
	var added = $("#reaction").val().trim();
	reactions.push(added);
	console.log(added);
	renderButtons();
});
renderButtons();

//Event listener on reaction buttons to return Giphy API info
$("#buttons-view").on("click", "input", function() {
	var APIKey = "6aOkv6LRvqkdZ11Si26rObsAGid0vj5H";
	var searchterm = $(this).val();
	var xhr = $.get("https://api.giphy.com/v1/gifs/search?q=" + searchterm + "&api_key=" + APIKey + "&limit=10");
	xhr.done(function(response) { 
		var data = response.data; 
		$("#gif-view").empty();
		$.each(data, function(i, image) {
			var $div = $("<div>")
			var $img = $("<img/>")
			var $rating = $("<h5>").text("Rating: " + image.rating)
			$img.data("original", image.images.fixed_height.url)
			$img.data("still", image.images.fixed_height_still.url)
			$img.attr("src", $img.data("still"));
			$div.append($img,$rating);
			$("#gif-view").append($div);
		});
	});       
});

//Event listener on gifs to animate 
$("#gif-view").on("click", "img", function() {
	if(this.src === $(this).data("still")) {
		$(this).attr("src", $(this).data("original"))
	} else {
		$(this).attr("src", $(this).data("still"))
	}
})



