var net;
$(document).ready(function () {
    net = new Net();
    function createTable(obj) {
        var tr = $("<tr>");
        var th = $("<th>");
        var td = $("<td>");
        var imp = $("#import");
        imp.empty();
        for (var x = 0; x < obj.length; x++) {
            var no = th.clone().html(x).attr("scope", "row")
            var nick = td.clone().html(obj[x].username);
            var age = td.clone().html(obj[x].age)
            var score = td.clone().html(obj[x].score)
            var row = tr.clone().append(no, nick, age, score);
            imp.append(row);
        }
    }
    net.starter(createTable)
    $("#starter").click(function () {
        net.starter(createTable)
    })
    $("#ranked").click(function () {
        net.ranked(createTable)
    })
})