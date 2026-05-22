const SESSION = {
  FOCUS: 'FOCUS',
  BREAK: 'BREAK',
  LONGBREAK: 'LONGBREAK'
}

const pomodoroomEngine = {
    focusTimeData: {
    timerDurationInSeconds: null,
    color: '#BA4949',
  },

  shortBreakData: {
    timerDurationInSeconds: null,
    color: '#38858A',
  },

  longBreakData: {
    timerDurationInSeconds: null,
    color: '#397097',
  },

  currentIterate: null,
  iterateForlongInterval: null,
  currentIterateForlongInterval: null,
  currentSessionName: null,
  currentSessionConfig: null,
  currentSessionColor: null,
  timeLeft: null,
  timeIsRunning: null,
  autoStartBreaks: null,
  autoStartPomodoros: null,
  currentElementSession: null,

  timeoutCurrentElementSession: function() {
    switch (this.currentSessionName) {
      case SESSION.FOCUS:
        this.currentIterate++
        if(this.currentIterateForlongInterval >= this.iterateForlongInterval) {
        this.currentIterateForlongInterval = 1
        this.switchTabData(SESSION.LONGBREAK)
        } else {
        this.currentIterateForlongInterval++
        this.switchTabData(SESSION.BREAK)
        }
        break;
      case SESSION.LONGBREAK:
        this.switchTabData(SESSION.FOCUS)
        break;
      case SESSION.BREAK:
        this.switchTabData(SESSION.FOCUS)
        break;
      default:
        break;
    }
  },

  switchTabData: function(customValue = this.currentSessionName) {
    switch (customValue) {
      case SESSION.FOCUS:
        this.currentSessionColor = this.focusTimeData.color
        this.timeLeft = this.focusTimeData.timerDurationInSeconds
        this.currentSessionName = SESSION.FOCUS
        this.currentSessionConfig = this.focusTimeData
        break;
      case SESSION.BREAK:
        this.currentSessionColor = this.shortBreakData.color
        this.timeLeft = this.shortBreakData.timerDurationInSeconds
        this.currentSessionName = SESSION.BREAK
        this.currentSessionConfig = this.shortBreakData
        break;
      case SESSION.LONGBREAK:
        this.currentSessionColor = this.longBreakData.color
        this.timeLeft = this.longBreakData.timerDurationInSeconds
        this.currentSessionName = SESSION.LONGBREAK
        this.currentSessionConfig = this.longBreakData
        break;
      default:
        break;
    }
  },

  getState: function() {
    return {
      currentIterate: this.currentIterate,
      currentSessionName: this.currentSessionName,
      timeLeft: this.timeLeft,
      autoStartBreaks: this.autoStartBreaks,
      autoStartPomodoros: this.autoStartPomodoros,
      currentElementSession: this.currentElementSession,
      timeIsRunning: this.timeIsRunning,
      currentSessionColor: this.currentSessionColor,
      currentSessionConfig: this.currentSessionConfig,
    }
  },

  tick: function(seconds = - 1) {
    this.timeLeft += seconds
    return this.timeLeft
  },

  init: function(config) {
    const currentConfigs = menuController.getAllConfigValues()
    this.iterateForlongInterval = currentConfigs.iterationsForInterval
    this.autoStartBreaks = currentConfigs.autoStartBreaks
    this.autoStartPomodoros = currentConfigs.autoStartPomodoro
    this.focusTimeData.timerDurationInSeconds = currentConfigs.focusTimeValueInSeconds
    this.shortBreakData.timerDurationInSeconds = currentConfigs.breakTimeValueInSeconds
    this.longBreakData.timerDurationInSeconds = currentConfigs.longBreakTimeValueInSeconds

    this.timeLeft = currentConfigs.focusTimeValueInSeconds
    this.currentIterate = 1
    this.currentIterateForlongInterval = 1
    this.currentSessionName = SESSION.FOCUS
    this.currentSessionConfig = this.focusTimeData
    this.timeIsRunning = false
    this.currentElementSession = this.focusTimeData
    this.currentSessionColor = this.focusTimeData.color
  },

  updateCurrentSettings: function(currentConfigs, applyThisSession) {
    this.iterateForlongInterval = currentConfigs.iterationsForInterval
    this.autoStartBreaks = currentConfigs.autoStartBreaks
    this.autoStartPomodoros = currentConfigs.autoStartPomodoro
    this.focusTimeData.timerDurationInSeconds = currentConfigs.focusTimeValueInSeconds
    this.shortBreakData.timerDurationInSeconds = currentConfigs.breakTimeValueInSeconds
    this.longBreakData.timerDurationInSeconds = currentConfigs.longBreakTimeValueInSeconds
    if(applyThisSession) {this.switchTabData(this.currentSessionName)}
  },

  getConfigData: function() {
    return {
      focusTimeData: this.focusTimeData,
      shortBreakData: this.shortBreakData,
      longBreakData: this.longBreakData
    }
  },

  changeCurrentIterate(newIterate) {
    if(newIterate > pomodoroomEngine.iterateForlongInterval) {
        pomodoroomEngine.currentIterateForlongInterval = newIterate % pomodoroomEngine.iterateForlongInterval
    } else {
    pomodoroomEngine.currentIterateForlongInterval = newIterate
    }
    pomodoroomEngine.currentIterate = newIterate
  }
}

pomodoroomEngine.init()