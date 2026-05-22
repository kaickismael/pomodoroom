const controller = {
    toggleRunState: function() {
    const timeIsRunning = timerController.intervalId ? true : false
    if(timeIsRunning === false) {this.initCounter()} 
    else {this.stopCounter()}
  },

  initCounter() {
    timerController.startCounter(1000, this.pomodoroTimerRunningConfig)
    this.updateButtonUI()
  },

  stopCounter() {
    timerController.breakCounter()
    this.updateButtonUI()
  },

  updateButtonUI() {
    const timeIsRunning = timerController.intervalId ? true : false
    dashboard.toggleNameButton(timeIsRunning)
  },
  
  pomodoroTimerRunningConfig: function() {
      const timerInSeconds = pomodoroomEngine.tick(-1)
      dashboard.renderTimerElement(timerInSeconds)
      if (timerInSeconds === 0) {
          controller.stopCounter()
          controller.onTimerEnd()
          pomodoroomEngine.timeoutCurrentElementSession()
          controller.changeBar(pomodoroomEngine.currentElementSession)
          controller.shouldAutoStartNewSession()
      }

      loadingProgressBar()
  },

  changeBar(newBarSessionName) {
    const engineCurrentState = pomodoroomEngine.getState()
    if(newBarSessionName === engineCurrentState.currentSession) {return}
    if(engineCurrentState.timeIsRunning) {controller.stopCounter()}
    pomodoroomEngine.switchTabData(newBarSessionName)
    dashboard.renderPage(pomodoroomEngine.getState())
  },

  updateEngineWithNewMenuValues() {
    controller.stopCounter()
    const currentConfigs = menuController.getAllConfigValues()
    pomodoroomEngine.updateCurrentSettings(currentConfigs, true)
    dashboard.renderPage(pomodoroomEngine.getState())
  },

  shouldAutoStartNewSession() {
    const engineCurrentState = pomodoroomEngine.getState()
    if(engineCurrentState.autoStartPomodoros === true 
      && engineCurrentState.currentSessionName === SESSION.FOCUS) {
        this.initCounter()
      }
    if (engineCurrentState.autoStartBreaks === true && 
      engineCurrentState.currentSessionName === SESSION.BREAK 
      || engineCurrentState.autoStartBreaks === true && 
      engineCurrentState.currentSessionName === SESSION.LONGBREAK) {
        this.initCounter()
      }
  },
  
  onTimerEnd() {
    const engineCurrentState = pomodoroomEngine.getState()
    switch (engineCurrentState.currentSessionName) {
      case SESSION.FOCUS:
      tasksController.handleSessionFinished()
      break;

      case SESSION.BREAK:

      break;

      case SESSION.LONGBREAK:

      break;
    
      default:
        break;
    }
  },
  
  openEditPomodoroCounter() {
    const wrapperWindowCounterChange = document.querySelector('.wrapperWindowCounterChange')
    const newIterateValue = document.querySelector('.windowCounterChange__iteratesInput')
    const pomodoroData = pomodoroomEngine.getState()
    newIterateValue.value = pomodoroData.currentIterate
    wrapperWindowCounterChange.style.display = 'flex'
  },

  updateIterateValue(t) {
    const newIterateValue = document.querySelector('.windowCounterChange__iteratesInput')
    if(t.currentTarget.dataset.updateiteratevalue === "caretUp") {
      newIterateValue.value ++
    } else if(t.currentTarget.dataset.updateiteratevalue === "caretDown" && newIterateValue.value > 1) {
      newIterateValue.value --
    }
  },

  setNewIterate(t) {
    const buttonName = t.currentTarget
    const newIterateValue = document.querySelector('.windowCounterChange__iteratesInput')
    const wrapperWindowCounterChange = document.querySelector('.wrapperWindowCounterChange')
    if(buttonName.dataset.buttonname === "save") {
      if(newIterateValue.value < 1) return
      pomodoroomEngine.changeCurrentIterate(Number(newIterateValue.value))
      dashboard.renderCounterIterate(Number(newIterateValue.value), 'changingIterateData')
      wrapperWindowCounterChange.style.display = 'none'
    } else if (buttonName.dataset.buttonname === "cancel") {
      newIterateValue.value = 1
    }
  },

  setInitialEvents() {
    const pomodoroCounter = document.querySelector('.currentPomodoro__counter')
    const buttonsExit = document.querySelectorAll('.buttonsExit__buttons')
    const windowCounterChangeButton = document.querySelectorAll('.windowCounterChange__wrapperSvg')
    windowCounterChangeButton[0].addEventListener('click', controller.updateIterateValue)
    windowCounterChangeButton[1].addEventListener('click', controller.updateIterateValue)

    pomodoroCounter.addEventListener('click', controller.openEditPomodoroCounter)
    buttonsExit[0].addEventListener('click', controller.setNewIterate)
    buttonsExit[1].addEventListener('click', controller.setNewIterate)
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
