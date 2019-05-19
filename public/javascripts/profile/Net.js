class Net {
    constructor() { }

    ranked(fn) {
        $.ajax({
            url: "/ranking/ranked",
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