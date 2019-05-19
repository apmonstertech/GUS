var net;
$(document).ready(function () {
    var right = 0;
    var point = 0;
    var questions;
    var counter = 0;
    net = new Net() // utworzenie obiektu klasy Net

    function getData(obj) {
        questions = obj;
        getQuestion(obj, counter)
    }
    function getQuestion(obj, count) {
        var question = obj[count];
        $("#quiz-que").html(question.question);
        $("#quiz-count").html((count + 1) + "/" + obj.length);
        $("#quiz-left").html(point);
        $("#quiz-a").html(question.ans1);
        $("#quiz-b").html(question.ans2);
        $("#quiz-c").html(question.ans3);
        $("#quiz-d").html(question.ans4);
    }
    function end(lost) {
        if(lost){
            $("#complete").addClass("d-flex");
            $("#points").html("<p>PRZEGRAŁEŚ</p>")
            setTimeout(function () {
                window.location.href = "/quiz";
            }, 1500)
        } else {
            $("#complete").addClass("d-flex");
            $("#points").html("Udało Ci się zdobyć "+ point +" punktów! <p>GRATULACJE!</p>")
            net.sendScore(
                point
            )
            setTimeout(function () {
                window.location.href = "/quiz";
            }, 1500)
        }
    }
    $(".ans").click(function (e) {
        if (e.target.attributes.answear.value == questions[counter].ansRight) {
            var anss = $(".ans")
            for (var x = 0; x < anss.length; x++) {
                var element = anss[x];
                element.style.backgroundColor = "#ff0000";
                if (element.attributes.answear.value == questions[counter].ansRight) element.style.backgroundColor = "#00ff00";
            }
            right++;
            point += Number(right)*1000;
            $("#quiz-left").html(point)
        } else {
            end(true)
        }
        counter++
        setTimeout(function () {
            for (var x = 0; x < anss.length; x++) {
                var element = anss[x];
                element.style.backgroundColor = "";
            }
            if (counter == questions.length) {
                end(false)
            } else {
                getQuestion(questions, counter)
            }
        }, 2000)

    })
    net.sendData("CLICK", getData);

})