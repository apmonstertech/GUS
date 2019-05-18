class Net {
    constructor() { }
    sendData(action) {
        var obj
        $.ajax({
            url: "/users/register/",
            data: {
                action: action,
            },
            type: "POST",
            success: function (data) {
                console.log(JSON.stringify(data))
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            }
        });

    }
}