
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

  currentIterate: 1,
  iterateForlongInterval: 4,
  currentSession: 'FOCUSTIME',
  currentSessionConfig: 0,
  timeLeft: 0,
  timeIsRunning: true,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  currentElementSession: 0,

  changeCurrentElementSession: function(customValue) {
    switch (this.currentSession) {
      case customValue:
        break;
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

  changeValues: function() {

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
    }
  },

  tick: function() {
    this.timeLeft--
    return this.timeLeft
  },
  init: function() {
    // Apenas para testes
    this.currentIterate = 1;
    this.iterateForlongInterval = 4;
    this.currentSession = 'FOCUSTIME';
    this.currentSessionConfig = this.focusTimeData;
    this.timeLeft = this.focusTimeData.timerDurationInSeconds;
    this.timeIsRunning = true;
    this.autoStartBreaks = false;
    this.autoStartPomodoros = false;
    this.currentElementSession = this.focusTimeData;
  }
};


const timerController = {
  intervalId: null,
  countDown: function(timerValueCallback, renderPageCallback, pauseOnZero, timeInterval) {
    this.intervalId = setInterval(() => {

    const timerValue = pomodoroomEngine.tick()
    dashboard.renderCountNumber(timerValue)

    if(pauseOnZero && timerValue === 0) {
      clearInterval(this.intervalId)
    }
      
      }, timeInterval)

  },

  startCounter: function(counter, timeInterval) {
  },
  

}

