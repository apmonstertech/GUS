class Net {
    constructor() { }

    sendData(action) {
        var obj
        $.ajax({
            url: "/quiz/starter/",
            data: {
                action: action,
            },
            type: "POST",
            success: function (data) {
                console.log(data)
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            }
        });

    }
}