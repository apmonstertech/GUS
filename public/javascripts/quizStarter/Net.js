class Net {
    constructor() { }

    sendData(action, fn) {
        $.ajax({
            url: "/quiz/starter/",
            data: {
                action: action,
            },
            type: "POST",
            success: function (data) {
                console.log(data)
                fn(data);
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            }
        });

    }
}