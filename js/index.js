(function(){
    
    var loadContributions = function(){
        $.get("https://api.github.com/repos/CodefyMX/NorthLionAbpZero/stats/code_frequency",function(data){
            console.log(data);
        });
    }

    loadContributions();
    
})();