class Net {
    constructor() { }

    starter(fn) {
        $.ajax({
            url: "/ranking/starter",
            type: "POST",
            success: function (data) {
                fn(data)
            },
            error: function (xhr, status, error) {
                console.log(xhr);
            }
        });

    }
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