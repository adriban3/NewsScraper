$(".home").on("click", function (event) {

});

$(".scrape").on("click", function (event) {
    $.ajax({
        method: "GET",
        url: "/scrape"
    })
        .then(function (data) {
            //handlebars implementation here
        })
});

$(".saved").on("click", function (event) {

});

$(".clear").on("click", function (event) {

});

$(".note").on("click", function (event) {

});

$(".save").on("click", function (event) {
    event.preventDefault();
    var thisId = $(this).attr("data-id");

    $.ajax({
        method: "POST",
        url: "/saved/" + thisId,
        data: {
            //what goes in here?
        }
    })

    //need this to switch save button to unsave
});