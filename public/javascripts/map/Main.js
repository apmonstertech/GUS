var net,countries;
$(document).ready(function(){
    net =  new Net();
    function getCountries(obj){
        countries = obj;
    }
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
    $("#amount").click(function(){
        countries.sort(compareAm);
        var diff = Math.floor(Number(countries[0].population) - Number(countries[countries.length-1].population))
        for(var x = 0; x < countries.length; x++){
            var thisDiff = Math.floor(Number(countries[0].population) - Number(countries[x].population))
            var perc = Math.floor(thisDiff/diff*100)
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
    $("#size").click(function(){
        countries.sort(compareSize);
        var diff = Number(countries[0].size) - Number(countries[countries.length-1].size)
        for(var x = 0; x < countries.length; x++){
            var thisDiff = Number(countries[0].size) - Number(countries[x].size);
            var perc = (thisDiff)/diff*100;
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

    net.sendData(getCountries)
})