var net;
$(document).ready(function () {
    var right = 0;
    var questions;
    var counter = 0;
    net = new Net() // utworzenie obiektu klasy Net
    
    function getData(obj){
        questions = obj;
        getQuestion(obj,counter)
    }
    function getQuestion(obj,count){
        var question = obj[count];
        $("#quiz-que").html(question.question);
        $("#quiz-count").html((count+1) + "/" + obj.length);
        $("#quiz-left").html("&#8734;");
        $("#quiz-a").html(question.ans1);
        $("#quiz-b").html(question.ans2);
        $("#quiz-c").html(question.ans3);
        $("#quiz-d").html(question.ans4);
    }
    function end(){
        $("#complete").addClass("d-flex");
        $("#points").html(right + " / " + questions.length )
        net.sendScore({
            right: right,
            length: questions.length
        })
        setTimeout(function(){
            window.location.href = "/quiz";
        },1500)
    }
    $(".ans").click(function(e){
        var anss = $(".ans")
        for(var x = 0; x < anss.length; x++){
            var element = anss[x];
            element.style.backgroundColor = "#ff0000";
            if (element.attributes.answear.value == questions[counter].ansRight) element.style.backgroundColor = "#00ff00";
        }
        if(e.target.attributes.answear.value == questions[counter].ansRight){
            right++;
        }
        counter++
        setTimeout(function(){
            for(var x = 0; x < anss.length; x++){
                var element = anss[x];
                element.style.backgroundColor = "";
            }
            if(counter == questions.length){
                end()
            } else {
                getQuestion(questions,counter)
            }
        },2000)
        
    })
    net.sendData("CLICK",getData);
    
})