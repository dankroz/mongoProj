$(document).ready(function () {

    $.getJSON("/articles", function (data) {
        // For each one
        for (var i = 0; i < data.length; i++) {
            if (data[i].note) {
                $(".articles").append("<div class='card' data-id='" + data[i]._id + "'>" + "<h5 class='card-header'>" +
                data[i].title + "<div class='card-body'> <a href='" + data[i].link + "' class='btn btn-primary'> See Article</a> <button class='btn btn-primary' data-id='" + data[i]._id + "' id='savey'> See Article Notes</button>" +
                " <button class='btn btn-primary' data-id='" + data[i]._id + "' id='delete'> Delete Article</button> </div>");

            } 
        }
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

    $(document).on("click", "#delete", function (){   
        var thisId = $(this).attr("data-id"); 
        $.ajax({
            method: "DELETE",
            url: "/articles/" + thisId
        })
            .then(function (data) {
                console.log("deleted " + data)
            })
            .then(
                $(this).parent(".card").remove()
            );
    })

    $(document).on("click", "#close", function () {
        $("#notes-heading").text("Notes on: ");
        $("#notesaver").remove();
        $("#title-input").val("");
        $("#body-input").val("");

    });


})