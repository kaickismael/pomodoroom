const dashboard = {
    timerLeftElement: document.querySelector('.timer__timeLeft').value = 3600,
    renderPage: function(currentEngineData) {
    },

    renderCountNumber: function(valueToRender) {
      console.log(valueToRender)
      this.timerLeftElement.innerText = valueToRender
    },

    setNewIterateConfig: function (currentIterateData) {
    setTimerOnScreen(currentIterateData.timeLeft)
    setBackgroundColor(currentIterateData)
  },

}

function clickTimeButton() {
    const timeSessionleft = pomodoroEngine.toggleTimeState
}

function setTimerOnScreen(totalTimeInSeconds) {
  const timerInMinutes = Math.floor(totalTimeInSeconds / 60)
  const TimerSeconds = totalTimeInSeconds % 60
  const pomodoroTimeLeft = document.querySelector('.timer__timeLeft')
  pomodoroTimeLeft.textContent = `${timerInMinutes.toString().padStart(2, 0)}:${TimerSeconds.toString().padStart(2, 0)}`
}

function endTime() {

  pomodoroSetter()
}

function setBackgroundColor(currentIterateData) {
  const backgroundColor = document.querySelector(':root')
  backgroundColor.style.setProperty('--main-bg-color', currentIterateData.color)
}

function pomodoroSetter(t) {
  if (t) {dashboard.currentSession = t.target.textContent}
  const currentWindow = currentWindowData()
  setNewIterateConfig(currentWindow[0])
  changeActiveBar(currentWindow[1])
}

function changeActiveBar(labelSection) {
  const currentActive = document.querySelector('.--selectEffect')
  currentActive.classList.remove('--selectEffect')
  labelSection.classList.add('--selectEffect')
}

pomodoroomEngine.init()
console.log(pomodoroomEngine.tick())
timerController.countDown(true, 1000)