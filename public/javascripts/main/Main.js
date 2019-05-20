var net;
$(document).ready(function(){
    var net = new Net()
    $("body")[0].style.overflow = "hidden"
    function changeRecords(obj){
        $("#country_name").html(obj.name);
        $("#capitol_name").html(obj.capital);
        $("#people_value").html(obj.population);
        $("#space_value").html(obj.size);
        $("#desc").html(obj.description);
    }
    $(".cls-15").click(function (e) {
        net.sendData(e.target.id,changeRecords)
        var height = document.body.clientHeight
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
        $("#country_flag")[0].style.backgroundImage = "url(/gfx/flags/" + e.target.id.toLowerCase()+".png)";
    })
    $("#up").click(function () {
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
})
