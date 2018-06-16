$.get("/api/headline", function (data) {
    if (data.length <= 0) {
        $(".d-none").removeClass("d-none")
    } else {
        for (i = 0; i < data.length; i++) {
            var newArticle = `
                <div class = "col-12">
                <div class="card">
                    <div class="card-header bg-dark text-white">
                        <a href = "${data[i].link}">${data[i].title}</a>
                        <button class="btn btn-outline-danger float-right deleter"> Delete from saved</button>
                        <button class="btn btn-outline-warning float-right noteAdd"> Notes</button>
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
});
$(document).ready(function () {
    $(document).on("click", ".deleter",function () {
        var title = $(this).siblings("a").text();
        $.ajax("/api/headline/" + title, {
            type: "DELETE"
        })
        $(this).closest('.col-12').remove();
        var truthy = $("#articleDiv").children()
        if (truthy.length <= 1) {
            $(".asdf").removeClass("d-none");
        }
    })
    $(".exit").on("click", function () {
        $("#noteHolder").empty()
    })
    $(document).on("click", ".noteAdd",function () {
        var title = $(this).siblings("a").text();
        $("#myModalLabel").text(title);
        $.get("/api/Note/" + title, function (data) {
            if (data.length > 0) {
                $("#noNotes").addClass("d-none");
                for (i = 0; i < data.length; i++) {
                    var note = `
                    <div class="col-12">
                            <span>${data[i].body}</span>
                            <button class="btn btn-outline-danger float-right noteDelete">X</button>
                            <hr>
                        </div>
                    `
                    $("#noteHolder").append(note);
                }
            }
        })
        $('#myModal').modal('toggle')

    })
    $(".notePost").on("click", function () {
        var note = {};
        note.title = $("#myModalLabel").text();
        note.body = $("#message-text").val();
        var html = `
                    <div class="col-12">
                            <span>${note.body}</span>
                            <button class="btn btn-outline-danger float-right noteDelete">X</button>
                            <hr>
                        </div>
                    `
        $("#noteHolder").append(html);
        $.post("/api/Note", note);
    })
    $(document).on("click", ".noteDelete",function () {
        var note = {};
        note.title = $("#myModalLabel").text();
        note.body = $(this).siblings("span").text();
        $.ajax(`/api/Note/${note.title}/${note.body}`, {
            type: "DELETE"
        })
        $(this).closest("div").remove();
    })
});