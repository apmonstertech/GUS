class Net {
    constructor() { }

    sendData(country) {
        var obj
        $.ajax({
            url: "/",
            data: {
                country: country,
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