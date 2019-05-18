class Net {
    constructor() { }

    sendData(fn) {
        $.ajax({
            url: "/profile",
            type: "POST",
            success: function (data) {
                fn(data)
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            }
        });

    }
}