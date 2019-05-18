class Net {
    constructor() { }

    sendData(country,fn) {
        var obj
        $.ajax({
            url: "/",
            data: {
                country: country,
            },
            type: "POST",
            success: function (data) {
                fn(data[0])
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            }
        });

    }
}