var net;
$(document).ready(function () {
    var right = 0;
    var questions;
    var counter = 0;
    net = new Net() // utworzenie obiektu klasy Net
    
    function getData(obj){
        console.log("elo")
        questions = obj;
        getQuestion(obj,counter)

    }
    function getQuestion(obj,count){
        var question = obj[count];
        $("#quiz-que").html(question.question);
        $("#quiz-count").html(count + "/" + obj.length);
        $("#quiz-left").html("&#8734;");
        $("#quiz-a").html(question.ans1);
        $("#quiz-b").html(question.ans2);
        $("#quiz-c").html(question.ans3);
        $("#quiz-d").html(question.ans4);
    }
    function end(){
        console.log(right)
    }
    $(".ans").click(function(e){
        var anss = $(".ans")
        console.log(questions)
        for(var x = 0; x < anss.length; x++){
            anss[x].style.backgroundColor = "red!important";
            if (anss[x].attributes.answear == questions[counter].ansRight) anss[x].style.backgroundColor = "green!important";
        }
        if(e.target.attributes.answear == questions[counter].ansRight){
            right++;
        }
        counter++
        setTimeout(function(){
            if(counter == questions.length){
                end()
            } else {
                getQuestion(questions,counter)
            }
        },2000)
        
    })
    net.sendData("CLICK",getData);
    
})