const controller = {
    toggleRunState: function() {
    const currentState = pomodoroomEngine.getState()
    if(currentState.timeIsRunning === false) {this.initCounter()} 
    else {this.stopCounter()}
  },
  initCounter() {
    timerController.startCounter(1, this.pomodoroTimerRunningConfig)
    this.updateButtonUI()
  },

  stopCounter() {
    timerController.breakCounter()
    this.updateButtonUI()
  },

  updateButtonUI() {
    const newState = pomodoroomEngine.toggleTimeState()
    dashboard.toggleNameButton(newState)
  },

  
  pomodoroTimerRunningConfig: function() {
      const timerInSeconds = pomodoroomEngine.tick(-1)
      dashboard.renderTimerElement(timerInSeconds)
      if (timerInSeconds === 0) {
          controller.stopCounter()
          pomodoroomEngine.timeoutCurrentElementSession()
          controller.changeBar(pomodoroomEngine.currentElementSession)
      }
  },

  changeBar(newBarSessionName) {
    const engineCurrentState = pomodoroomEngine.getState()
    if(newBarSessionName === engineCurrentState.currentSession) {return}
    if(engineCurrentState.timeIsRunning) {controller.stopCounter()}
    pomodoroomEngine.switchTabData(newBarSessionName)
    dashboard.renderPage(pomodoroomEngine.getState())
  }
}

const timerController = {
  intervalId: null,
  startCounter: function(timeSpeed = 1000, callback) {
    if(this.intervalId !== null) {return}

    this.timeIsRunning = true
    this.intervalId = setInterval(() => {
      callback()
    }, timeSpeed)
  },

  breakCounter: function() {
    clearInterval(this.intervalId)
    this.intervalId = null
  }
}