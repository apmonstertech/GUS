var net = new Net()

// $("#log").click(function () {
//     $(".login-modal").css("display", "block")
// })

$(".cls-15").click(function (e) {
    net.sendData(e.target.id)
    var height = $("body")[0].clientHeight
    var am = 0;
    $("#up").css("opacity", 0)
    var count = 0
    var inter = setInterval(function () {
        if (height - am > 4) {
            window.scroll(0, am);
            am += 4
            count += 0.009
            $("#up").css("opacity", count)
        } else {
            window.scroll(0, height)
            clearInterval(inter)

        }
    }, 1)
    $("#country_name").html(e.target.id)


})
$("#up").click(function () {
    var height = $("body")[0].clientHeight
    var am = Math.floor(window.scrollY);
    var count = 1
    var inter = setInterval(function () {
        if (am > 4) {
            window.scroll(0, am);
            am -= 4
            count -= 0.009
        } else {
            window.scroll(0, 0);
            clearInterval(inter)
        }
        $("#up").css("opacity", count)
    }, 1)

})

