let RemainingTime=120;
function reduceTime(RemainingTime){
    RemainingTime=RemainingTime-1;
    displayTime(RemainingTime);
}
function displayTime(RemainingTime){
    let Minutes = String(Math.floor(RemainingTime/60));
    let Seconds = String(Math.floor(RemainingTime%60));

    let Display = "";
    if(Minutes.length==1){
        Minutes="0"+Minutes;
    }
    if(Seconds.length==1){
        Seconds="0"+Seconds;
    }
    console.log(Minutes+":"+Seconds);
    if(RemainingTime!=0){
        setTimeout(()=>reduceTime(RemainingTime),1000);
    }
    else{
        console.log("time out");
    }
}
function startTime(RemainingTime){
    displayTime(RemainingTime);   
}
//startTime(RemainingTime);