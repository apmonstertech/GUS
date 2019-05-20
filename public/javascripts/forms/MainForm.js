var netForm;
$(document).ready(function () {
    $(".login").click(function (e) {
        e.preventDefault()
        var obj = {
            username: $('#username').val(),
            password: $('#password').val(),
        }
        netForm.sendDataLogin(obj.username, obj.password)
    })
})