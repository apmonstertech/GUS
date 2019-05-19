class Net {
    constructor() { }

    sendData(fn) {
        $("#loader").show()
        $.ajax({
            url: "/map/map",
            type: "POST",
            success: function (data) {
                $("#loader").hide()
                fn(data)
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            }
        });

    }
}