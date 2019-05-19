var net,countries;
$(document).ready(function(){
    var id,popdiff,sizediff,maxAmDiff,maxSizeDiff,maxPop,maxSize;
    $("#stats").hide();
    net =  new Net();
    function compareAm( a, b ) {
        if ( Number(a.population) >  Number(b.population) ){
            return -1;
        }
        if (  Number(a.population) < Number(b.population) ){
            return 1;
        }
        return 0;
    }
    function compareSize( a, b ) {
        if ( Number(a.size) > Number(b.size) ){
            return -1;
        }
        if ( Number(a.size) < Number(b.size) ){
            return 1;
        }
        return 0;
    }
    function setMaxAm(){
        countries.sort(compareAm);
        maxPop = Number(countries[0].population)
        maxAmDiff = Math.floor(Number(countries[0].population) - Number(countries[countries.length-1].population));
    }
    function setMaxPop(){
        countries.sort(compareSize);
        maxSize = countries[0].size
        maxSizeDiff = Math.floor(Number(countries[0].size) - Number(countries[countries.length-1].size));
    }
    function getCountries(obj){
        countries = obj
        setMaxAm();
        setMaxPop();
    }
    
    $("#amount-btn").click(function(){
        for(var x = 0; x < countries.length; x++){
            var thisDiff = Math.floor(maxPop - Number(countries[x].population))
            var perc = Math.floor(thisDiff/maxAmDiff*100)
            var col = 150;
            if(perc<50){
                if($("#"+countries[x].code)[0])$("#"+countries[x].code)[0].style.fill = "hsl(" + Math.floor(col*perc/100) + ",100%,50%)";
            } else if (perc == 50){
                if($("#"+countries[x].code)[0])$("#"+countries[x].code)[0].style.fill = "hsl(60,100%,50%)";
            } else {
                if($("#"+countries[x].code)[0])$("#"+countries[x].code)[0].style.fill = "hsl(" + Math.floor(col*perc/100) + ",100%,50%)";
            }
        }
    })
    $("#size-btn").click(function(){
        for(var x = 0; x < countries.length; x++){
            var thisDiff = maxSize - Number(countries[x].size);
            var perc = Math.floor(thisDiff/maxSizeDiff*100);
            console.log(perc)
            var col = 150;
            if(perc<50){
                if($("#"+countries[x].code)[0])$("#"+countries[x].code)[0].style.fill = "hsl(" + Math.floor(col*perc/100) + ",100%,50%)";
            } else if (perc == 50){
                if($("#"+countries[x].code)[0])$("#"+countries[x].code)[0].style.fill = "hsl(60,100%,50%)";
            } else {
                if($("#"+countries[x].code)[0])$("#"+countries[x].code)[0].style.fill = "hsl(" + Math.floor(col*perc/100) + ",100%,50%)";
            }
        }
    })
    $(".cls-15").click(function(e){
        $("#stats").show();
        var name = e.target.id
        for(var x = 0; x < countries.length; x++){
            if(countries[x].code == name){
                id= x
                break;
            }
        }
        
        var diffPop = Math.floor(maxPop - Number(countries[id].population));
        var popPerc = Math.floor(diffPop/maxAmDiff*100);
        popdiff = 500*popPerc/100;
        console.log(popdiff)
        var diffSize = Math.floor(maxSize - Number(countries[id].size));
        var sizePerc = Math.floor(diffSize/maxSizeDiff*100);
        sizediff = 500*sizePerc/100;
        $("#size").html(countries[id].size +"km<sup>2</sup>")
        $("#population").html(countries[id].population+"mln")
        $("#country_name").html(countries[id].name)
    })
    $("#stats").mouseover(function(){
        $("#amount .bottom").width(popdiff+50 + "px")
        $("#amount .top")[0].style.marginLeft = popdiff+50 - 40 + "px";
        $("#size .bottom").width(sizediff+50 + "px")
        $("#size .top")[0].style.marginLeft = sizediff+50 - 40 + "px";
    })
    $("#stats").mouseout(function(){
        $("#amount .bottom").width("50px")
        $("#amount .top")[0].style.marginLeft = "10px";
        $("#size .bottom").width("50px")
        $("#size .top")[0].style.marginLeft = "10px";
    })
    $(".modal").click(function(){
        if($("#stats").is(":visible")) $("#stats").hide()
    })
    net.sendData(getCountries)
})