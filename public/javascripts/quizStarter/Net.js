class Net {
    constructor() { }

    sendData(action, fn) {
        $("#loader").show()
        $.ajax({
            url: "/quiz/starter/",
            data: {
                action: action,
            },
            type: "POST",
            success: function (data) {
                $("#loader").hide()     
                fn(data);
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            }
        });

    }
}