const pomodoroomEngine = {
    focusTimeData: {
    timerDurationInSeconds: 1 * 60,
    color: '#BA4949',
  },

  shortBreakData: {
    timerDurationInSeconds: 5 * 60,
    color: '#38858A',
  },

  longBreakData: {
    inputElementHtml: document.querySelector("[data-timerDuration='longBreakDuration']"),
    timerDurationInSeconds: 20 * 60,
    color: '#397097',
  },

  currentIterate: null,
  iterateForlongInterval: null,
  currentIterateForlongInterval: null,
  currentSession: null,
  currentSessionConfig: null,
  currentSessionColor: null,
  timeLeft: null,
  timeIsRunning: null,
  autoStartBreaks: null,
  autoStartPomodoros: null,
  currentElementSession: null,

  timeoutCurrentElementSession: function() {
    console.log(this.iterateForlongInterval, this.currentIterateForlongInterval)
    switch (this.currentSession) {
      case "FOCUSTIME":
        this.currentIterate++
        if(this.currentIterateForlongInterval >= this.iterateForlongInterval) {
        this.currentSession = "LONGBREAKSETTER"
        this.currentSessionConfig = this.longBreakData
        this.currentIterateForlongInterval = 1
        this.timeLeft = this.longBreakData.timerDurationInSeconds
        this.currentSessionColor = this.longBreakData.color
        } else {
        this.currentSession = "SHORTBREAK"
        this.currentSessionConfig = this.shortBreakData
        this.currentIterateForlongInterval++
        this.timeLeft = this.shortBreakData.timerDurationInSeconds
        this.currentSessionColor = this.shortBreakData.color
        }
        break;
      case "LONGBREAKSETTER":
        this.currentSession = "FOCUSTIME"
        this.currentSessionConfig = this.focusTimeData
        this.timeLeft = this.focusTimeData.timerDurationInSeconds
        this.currentSessionColor = this.focusTimeData.color
        break;
      case "SHORTBREAK":
        this.currentSession = "FOCUSTIME"
        this.currentSessionConfig = this.focusTime
        this.timeLeft = this.focusTimeData.timerDurationInSeconds
        this.currentSessionColor = this.focusTimeData.color
        break;
      default:
        break;
    }
  },

  switchTabData: function(customValue = this.currentSession) {
    console.log(customValue)
    switch (customValue) {
      case "FOCUSTIME":
        this.currentSessionColor = this.focusTimeData.color
        this.timeLeft = this.focusTimeData.timerDurationInSeconds
        this.currentSession = "FOCUSTIME"
        break;
      case "SHORTBREAK":
        this.currentSessionColor = this.shortBreakData.color
        this.timeLeft = this.shortBreakData.timerDurationInSeconds
        this.currentSession = "SHORTBREAK"
        break;
      case "LONGBREAKSETTER":
        this.currentSessionColor = this.longBreakData.color
        this.timeLeft = this.longBreakData.timerDurationInSeconds
        this.currentSession = "LONGBREAKSETTER"
        break;
      default:
        break;
    }
  },

  getState: function() {
    return {
      currentIterate: this.currentIterate,
      currentSession: this.currentSession,
      timeLeft: this.timeLeft,
      autoStartBreaks: this.autoStartBreaks,
      autoStartPomodoros: this.autoStartPomodoros,
      currentSession: this.currentSession,
      currentElementSession: this.currentElementSession,
      timeIsRunning: this.timeIsRunning,
      currentSessionColor: this.currentSessionColor,
    }
  },

  tick: function(seconds) {
    this.timeLeft += seconds
    return this.timeLeft
  },

  toggleTimeState: function() {
    if(this.timeIsRunning) {
      this.timeIsRunning = false
    } else {
      this.timeIsRunning = true
    }
  },

  init: function(currentIterate = 1, ) {
    this.currentIterate = 1
    this.iterateForlongInterval = 4
    this.currentIterateForlongInterval = 1
    this.currentSession = 'FOCUSTIME'
    this.currentSessionConfig = this.focusTimeData
    this.timeLeft = this.focusTimeData.timerDurationInSeconds
    this.timeIsRunning = false
    this.autoStartBreaks = false
    this.autoStartPomodoros = false
    this.currentElementSession = this.focusTimeData
    this.currentSessionColor = this.focusTimeData.color
  }
};

pomodoroomEngine.init()





