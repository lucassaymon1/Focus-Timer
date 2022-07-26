//variables

const play = document.querySelector('.button-play')
const pause = document.querySelector('.button-pause')
const stop = document.querySelector('.button-stop')
const plus = document.querySelector('.button-plus')
const minus = document.querySelector('.button-minus')
const displayMinutes = document.querySelector('.minutes')
const displaySeconds = document.querySelector('.seconds')
let timerTimeOut
let minutes = Number(displayMinutes.textContent)
let seconds = Number(displaySeconds.textContent)
let newMinutes = minutes
let timerAlarmControl = 0

const moodForest = document.querySelector('.mood-forest')
const forestIcon = document.querySelector('.mood-forest svg path')
const moodRain = document.querySelector('.mood-rain')
const rainIcon = document.querySelector('.mood-rain svg path')
const moodCoffee = document.querySelector('.mood-coffee')
const coffeeIcon = document.querySelector('.mood-coffee svg path')
const moodFireplace = document.querySelector('.mood-fireplace')
const fireplaceIcon = document.querySelector('.mood-fireplace svg path')

const light = document.querySelector('.light')
const dark = document.querySelector('.dark')
const rootStyle = document.documentElement.style

// sound variables

const forestSound = new Audio("./Sounds/Floresta.wav")
const rainSound = new Audio("./Sounds/Chuva.wav")
const coffeeSound = new Audio("./Sounds/Cafeteria.wav")
const fireplaceSound = new Audio("./Sounds/Lareira.wav")
const buttonPressAudio = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/button-press.wav?raw=true")
const kitchenTimer = new Audio("https://github.com/maykbrito/automatic-video-creator/blob/master/audios/kichen-timer.mp3?raw=true")

const forestVolume = document.querySelector('#forest-volume')
const rainVolume = document.querySelector('#rain-volume')
const coffeeVolume = document.querySelector('#coffee-volume')
const fireplaceVolume = document.querySelector('#fireplace-volume')
const slider1 = '--slider-color1'
const slider2 = '--slider-color2'
const slider3 = '--slider-color3'
const slider4 = '--slider-color4'

forestSound.volume = 0.5;
rainSound.volume = 0.5;
coffeeSound.volume = 0.5;
fireplaceSound.volume = 0.5;

// control volume
function volumeControl(sound, currentVolume){
  currentVolume.oninput = function(){
    sound.volume = Number(currentVolume.value)/100
  }
}


//general functions

function playPause(sound, soundSelect, icon, slider, sliderStyle){

  soundSelect.addEventListener('click', function(){
    if(!sound.paused){
      sound.pause()
      soundSelect.style.removeProperty("background-color")
      icon.style.removeProperty("fill")
      slider.style.removeProperty('background-color')
      rootStyle.removeProperty(sliderStyle)
    }
    else{
      sound.play()
      soundSelect.style.cssText = "background-color: var(--moodbtn-color-sec)"
      icon.style.cssText = 'fill: white;'
      slider.style.cssText = 'background-color: white;'
      rootStyle.setProperty(sliderStyle, 'white')
      sound.loop = true
    }
  })
}

function resetControls(){
  minutes = newMinutes
  seconds = '00'

  displayMinutes.textContent = String(newMinutes).padStart(2, '0')
  displaySeconds.textContent = String(seconds).padStart(2, '0')
  clearTimeout(timerTimeOut)

  if(play.classList.contains('hide')){
    pause.classList.add('hide')
    play.classList.remove('hide')

  }
}

//Dark mode

light.addEventListener('click', function(){
  dark.classList.remove('hide')
  light.classList.add('hide')

  rootStyle.setProperty('--body-color', 'black');
  rootStyle.setProperty('--primary-color', '#c4c4cc');
  rootStyle.setProperty('--text-color', 'white');
  rootStyle.setProperty('--moodbtn-color', '#29292E');
  rootStyle.setProperty('--moodbtn-color-sec', '#0A3442');
  rootStyle.setProperty('--hoverctrl-color', 'rgb(255, 62, 62)');
  rootStyle.setProperty('--color', 'white');

})

dark.addEventListener('click', function(){
  light.classList.remove('hide')
  dark.classList.add('hide')
  rootStyle.removeProperty('--body-color')
  rootStyle.removeProperty('--primary-color')
  rootStyle.removeProperty('--text-color')
  rootStyle.removeProperty('--moodbtn-color')
  rootStyle.removeProperty('--moodbtn-color-sec')
  rootStyle.removeProperty('--hoverctrl-color')
  rootStyle.removeProperty('--color')
})

//EventListeners

volumeControl(forestSound, forestVolume)
volumeControl(rainSound, rainVolume)
volumeControl(coffeeSound, coffeeVolume)
volumeControl(fireplaceSound, fireplaceVolume)

playPause(forestSound, moodForest, forestIcon, forestVolume, slider1)
playPause(rainSound, moodRain, rainIcon, rainVolume, slider2)
playPause(coffeeSound, moodCoffee, coffeeIcon, coffeeVolume, slider3)
playPause(fireplaceSound, moodFireplace, fireplaceIcon, fireplaceVolume, slider4)

play.addEventListener('click', function(){
  play.classList.add('hide')
  pause.classList.remove('hide')
  countDown()
  buttonPressAudio.play()
})

pause.addEventListener('click', function(){
  pause.classList.add('hide')
  play.classList.remove('hide')
  clearTimeout(timerTimeOut)
  buttonPressAudio.play()
})

stop.addEventListener('click', function(){
  resetControls()
  buttonPressAudio.play()
})

plus.addEventListener('click', function(){
  newMinutes = minutes + 5
  if(newMinutes > 360){
    newMinutes = 360
  }
  resetControls()
  buttonPressAudio.play()
})

minus.addEventListener('click', function(){
  newMinutes = minutes - 5
  if(newMinutes < 0){
    newMinutes = 0
    timerAlarmControl = 0
  }
  resetControls()
  buttonPressAudio.play()
})

// function for countdown

function countDown(){
  timerTimeOut = setTimeout(function (){

    seconds--;
    timerAlarmControl++;
    console.log(timerAlarmControl)

    if(seconds < 0){
      
      if(minutes <= 0 && seconds <= 0){
        if(timerAlarmControl > 1){
          kitchenTimer.play()
        }
        timerAlarmControl = 0
        return
      }
      else{
        seconds = 59;
        minutes--;
      }
      timerAlarmControl = 0
    }

    displaySeconds.textContent = String(seconds).padStart(2, '0')
    displayMinutes.textContent = String(minutes).padStart(2, '0')

    countDown()

  }, 1000)
}



