$(document).ready(function () {
    document.onload = function() {
        $.getJSON("/articles", function (data) {
            // For each one
            for (var i = 0; i < data.length; i++) {
                if (data.note) {
                    console.log(data[i]);
                }

                // $(".articles").append("<div class='card' data-id='" + data[i]._id + "'>" + "<h5 class='card-header'>" +
                //     data[i].title + "<div class='card-body'> <a href='" + data[i].link + "' class='btn btn-primary'> See Article</a> <button data-id='" + data[i]._id + "' id='savey'> Save Article</button> </div>");
            }
        });
    }

})