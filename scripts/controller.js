const controller = {
    toggleRunState: function() {
    const currentState = pomodoroomEngine.getState()
    if(currentState.timeIsRunning === false && currentState.timeLeft >= 0) {
        timerController.startCounter(1, pomodoroTimerRunningConfig)
        pomodoroomEngine.toggleTimeState()
    } else {
        timerController.breakCounter()
        pomodoroomEngine.toggleTimeState()
    }
  }
}

const timerController = {
  intervalId: null,
  timeIsRunning: false,
  startCounter: function(timeSpeed = 1000, callback) {
    if(this.timeIsRunning === true) {return}

    this.timeIsRunning = true
    this.intervalId = setInterval(() => {
      callback()
    }, timeSpeed)
  },

  breakCounter: function() {
    this.timeIsRunning = false
    clearInterval(this.intervalId)
  }
}

function pomodoroTimerRunningConfig(timeStep = -1) {
    const timerInSeconds = pomodoroomEngine.tick(timeStep)
    dashboard.renderTimerElement(timerInSeconds)
    if (timerInSeconds === 0) {
        timerController.breakCounter()
        pomodoroomEngine.timeoutCurrentElementSession()
        changeBar(pomodoroomEngine.currentElementSession)
    }
}