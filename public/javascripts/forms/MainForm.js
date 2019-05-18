var netForm;
$(document).ready(function () {
    netForm = new NetForm() // utworzenie obiektu klasy Net


    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function (form) {
        form.addEventListener('submit', function (event) {
            event.preventDefault();
            if (form.checkValidity() === false) {
                event.stopPropagation();
            }
            form.classList.add('was-validated');
            var obj = {
                username: $('#username').val(),
                email: $('#email').val(),
                password: $('#password').val(),
                passwordConfirm: $('#passwordConfirm').val(),
                age: $('#age').val(),
            }
            console.log(obj.username, obj.password, obj.passwordConfirm, obj.email, obj.age)
            netForm.sendDataRegister(obj.username, obj.password, obj.passwordConfirm, obj.email, obj.age)
        }, false);
    });

    $(".login").on("submit", function () {
        var obj = {
            username: $('#usernameLogin').val(),
            password: $('#passwordLogin').val(),
        }
        netForm.sendDataLogin(obj.username, obj.password)
    })







})