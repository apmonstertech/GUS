class NetForm {
    constructor() { }
    // sendDataRegister(username, pass, conPass, email, age) {
    //     var obj
    //     $.ajax({
    //         url: "/users/register/",
    //         data: {
    //             username: username,
    //             password: pass,
    //             passwordAgain: conPass,
    //             email: email,
    //             age: age
    //         },
    //         type: "POST",
    //         success: function (data) {

    //         },
    //         error: function (xhr, status, error) {
    //             console.log(xhr);
    //         }
    //     });
    // }
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