let timer;
let elapsedTime=0;
let isRunning=false;
const timerLabel=document.querySelector('.timer');
const startButton=document.querySelector('.start');
const lapButton=document.querySelector('.lap');
const laps=document.getElementById('laps');
function formatTime(time){
    let milliseconds=Math.floor((time%1000)/10);
    let seconds=Math.floor((time/1000)%60);
    let minutes=Math.floor((time/(1000*60))%60);
    let hours=Math.floor((time/(1000*60*60))%24);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}.${String(milliseconds).padStart(2, '0')}`;
}

function updateTime(){
    timerLabel.textContent=formatTime(elapsedTime);
}
function startStopwatch(){
    const startTime=Date.now()-elapsedTime;
    timer=setInterval(()=>{
        elapsedTime=Date.now()-startTime;
        updateTime();
    },10);
}
function stopStopwatch(){
    clearInterval(timer);
}
startButton.addEventListener('click',function () {
    if(!isRunning) {
        startStopwatch();
        startButton.textContent = 'Stop';
        startButton.classList.remove('start');
        startButton.classList.add('stop');
        lapButton.textContent = 'Lap';
        lapButton.disabled = false;
        isRunning = true;
    }else{
        stopStopwatch();
        startButton.textContent='Start';
        startButton.classList.remove('stop');
        startButton.classList.add('start');
        lapButton.textContent='Reset';
        isRunning=false;
    }
});
lapButton.addEventListener('click', function () {
    if (isRunning){
        const lapTime=document.createElement('li');
        lapTime.textContent=formatTime(elapsedTime);
        laps.prepend(lapTime);
    } 
    else{
        elapsedTime=0;
        updateTime();
        laps.innerHTML='';
        lapButton.textContent='Lap';
        lapButton.disabled=true;
    }
});