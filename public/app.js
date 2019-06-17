$(document).ready(function () {

    console.log("hello")

    // Grab the articles as a json
    $("#scrape").on("click", function () {
        console.log("scrape clicked")
        $.getJSON("/articles", function (data) {
            // For each one
            for (var i = 0; i < data.length; i++) {
                // Display the apropos information on the page
                $(".articles").append("<div class='card' data-id='" + data[i]._id + "'>" + "<h5 class='card-header'>" +
                    data[i].title + "<div class='card-body'> <a href='" + data[i].link + "' class='btn btn-primary'> See Article</a> <button data-id='" + data[i]._id + "' id='savey'> Save Article</button> </div>");
            }
        });
    }); 

    $(document).on("click", "#savey", function () {
        console.log("clicked");
        $("#modal").css("display", "block");
        var thisId = $(this).attr("data-id");
        console.log(thisId)

        $.ajax({
            method: "GET",
            url: "/articles/" + thisId
        })
            .then(function (data) {
                $("#notes-heading").append(data.title);
                $(".notes-footer").append("<button data-id='" + data._id + "' id='notesaver'>Save Note</button>");

                if (data.note) {
                    // Place the title of the note in the title input
                    $("#title-input").val(data.note.title);
                    // Place the body of the note in the body textarea
                    $("#body-input").val(data.note.body);
                }
            })
    });

    $(document).on("click", "#close", function () {
        $("#notes-heading").text("Notes on: ");
        $("#notesaver").remove();
        $("#title-input").val("");
        $("#body-input").val("");

    });

    $(document).on("click", "#notesaver", function () {

        var thisId = $(this).attr("data-id");

        // Run a POST request to change the note, using what's entered in the inputs
        $.ajax({
            method: "POST",
            url: "/articles/" + thisId,
            data: {
                // Value taken from title input
                title: $("#title-input").val(),
                // Value taken from note textarea
                body: $("#body-input").val()
            }
        })
            // With that done
            .then(function (data) {
                // Log the response
                console.log(data);
                // Empty the notes section
                $("#notes-heading").text("Notes on: ");
                $("#notesaver").remove();
                $("#modal").css("display", "none");
            });

        // Also, remove the values entered in the input and textarea for note entry
        $("#title-input").val("");
        $("#body-input").val("");
    });

});