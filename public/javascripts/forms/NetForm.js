class NetForm {
    constructor() { }
    sendDataLogin(username, pass) {
        var obj
        $.ajax({
            url: "/users/login",
            data: {
                username: username,
                password: pass,
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