var articles;
var num1;
var num2;

function getter(callback) {
    $.get("/api/Scraped", function (data) {
        articles = data.length;
        if (data.length >= 1) {
            $(".asdf").addClass("d-none")
            for (i = 0; i < data.length; i++) {
                var newArticle = `
                    <div class = "col-12">
                    <div class="card">
                        <div class="card-header bg-dark text-white">
                            <a href = "${data[i].link}">${data[i].title}</a>
                            <button class="btn btn-outline-primary float-right save"> Save Article</button>
                        </div>
    
                        <div class="card-body">
                            <p class="card-title">${data[i].body}</p>
                        </div>
                    </div>
                    </div>
                    `
                $("#articleDiv").append(newArticle);
            }

        }
        if(callback){
            callback();
        }
    });
}

function modal() {
    num2 = articles;
    var num3 = num2 - num1;
    $('#num').text(num3);
    $('#myModal').modal('toggle')
}
getter();
var articleNum = $("#articleDiv").children();
if (articleNum.length <= 1) {
    $(".d-none").removeClass("d-none")
}
$(document).ready(function () {
    $(document).on("click", ".save",function () {
        var headline = {};
        headline.title = $(this).siblings("a").text();
        headline.link = $(this).siblings("a").attr("href");
        headline.body = $(this).closest(".card").find("p").text();
        $.post("/api/headline", headline);
    })
    $("#scrapeBtn").click(function () {
        num1 = articles
        $.post("/api/Scraped");
        getter(modal)

    })
    $("#deleter").click(function () {
        $.ajax("/api/Scraped/", {
            type: "DELETE"
        })
        $("#articleDiv .card").remove();
        $(".asdf").removeClass("d-none")
        articles = 0;
    })
});