const pomodoroomEngine = {
    focusTimeData: {
    timerDurationInSeconds: 60 * 60,
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
  currentSession: null,
  currentSessionConfig: null,
  currentSessionColor: null,
  timeLeft: null,
  timeIsRunning: null,
  autoStartBreaks: null,
  autoStartPomodoros: null,
  currentElementSession: null,

  timeoutCurrentElementSession: function(customValue) {
    switch (this.currentSession) {
      case "FOCUSTIME":
        if(this.currentIterate >= this.iterateForlongInterval) {
        this.currentSession = "LONGBREAKSETTER"
        this.currentSessionConfig = this.longBreakData
        this.iterateForlongInterval = 0
        this.timeLeft = this.longBreakDuration.timerDurationInSeconds
        } else {
        this.currentSession = "SHORTBREAK"
        this.currentSessionConfig = this.shortBreakData
        this.iterateForLongInterval++
        this.timeLeft = this.longBreakDuration.timerDurationInSeconds
        }        
        break;
      case "LONGBREAKSETTER":
        this.currentSession = "FOCUSTIME"
        this.currentSessionConfig = this.focusTimeData
        break;
      case "SHORTBREAK":
        this.currentSession = "FOCUSTIME"
        this.currentSessionConfig = this.focusTime
        this.iterateForlongInterval++
        break;
      default:
        break;
    }
  },

  switchTabData: function(newSessionName) {
    this.currentSession = newSessionName
    switch (this.currentSession) {
      case "FOCUSTIME":
        this.currentSessionColor = this.focusTimeData.color
        this.timeLeft = this.focusTimeData.timerDurationInSeconds
        this.currentSession = "FOCUSTIME"
        break;
      case "LONGBREAKSETTER":
        this.currentSessionColor = this.shortBreakData.color
        this.timeLeft = this.shortBreakData.timerDurationInSeconds
        this.currentSession = "LONGBREAKSETTER"
        break;
      case "SHORTBREAK":
        this.currentSessionColor = this.longBreakData.color
        this.timeLeft = this.longBreakData.timerDurationInSeconds
        this.currentSession = "SHORTBREAK"
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
    this.currentIterate = 1;
    this.iterateForlongInterval = 4;
    this.currentSession = 'FOCUSTIME';
    this.currentSessionConfig = this.focusTimeData;
    this.timeLeft = this.focusTimeData.timerDurationInSeconds;
    this.timeIsRunning = false;
    this.autoStartBreaks = false;
    this.autoStartPomodoros = false;
    this.currentElementSession = this.focusTimeData;
    this.currentSessionColor = this.focusTimeData.color
  }
};

pomodoroomEngine.init()

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

function endTimerPomodoro() {
      pomodoroomEngine.timeoutCurrentElementSession()
      renderPage(pomodoroomEngine.getState())
}

function pomodoroTimerCounter(timeStep = 1, timeSpeed = 1000, timeEnd = 0) {
    const timerInSeconds = pomodoroomEngine.tick(timeStep)
    console.log(timerInSeconds)
    dashboard.renderTimerElement(timerInSeconds)
    if(timerInSeconds === timeEnd) {

      timerController.breakCounter()
    }
    console.log('teste')
}

