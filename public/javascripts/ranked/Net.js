class Net {
    constructor() { }
    sendData(action, fn) {
        $("#loader").show()
        $.ajax({
            url: "/quiz/ranked",
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
    sendScore(score) {
        $.ajax({
            url: "/quiz/ranked/result",
            data: {
                score: score
            },
            type: "POST",
            error: function (xhr, status, error) {
                console.log(xhr);
            }
        });
    }
}