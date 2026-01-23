const dashboard = {
  focusTimeData: {
    timerDurationInSeconds: document.querySelector("[data-timerDuration='pomodoroDuration']").value * 60,
    color: '#BA4949',
  },

  shortBreakData: {
    inputElementHtml: document.querySelector("[data-timerDuration='shortBreakDuration']"),
    timerDurationInSeconds: document.querySelector("[data-timerDuration='shortBreakDuration']").value * 60,
    color: '#38858A',
  },

  longBreakData: {
    inputElementHtml: document.querySelector("[data-timerDuration='longBreakDuration']"),
    timerDurationInSeconds: document.querySelector("[data-timerDuration='longBreakDuration']").value * 60,
    color: '#397097',
  },

  iterate: 1,
  currentSession: 'FOCUSTIME',
  timeLeft: 0,
  autoStartBreaks: false,
  autoStartPomodoros: false,
  
  currentWindowData: function() {
  if (dashboard.currentSession == 'FOCUSTIME' || dashboard.currentSession == 'Pomodoro') {
    const labelSection = document.querySelectorAll('.timeButtonsControl')[0]
    const restTime = document.querySelector("[data-timerDuration='pomodoroDuration']").value * 60 -
    (dashboard.focusTimeData.timerDurationInSeconds - dashboard.timeLeft)

    return [dashboard.focusTimeData, labelSection, restTime]
  }

  if (dashboard.currentSession == 'SHORTBREAK' || dashboard.currentSession == 'Short Break') {
    const labelSection = document.querySelectorAll('.timeButtonsControl')[1]
    const restTime = document.querySelector("[data-timerDuration='shortBreakDuration']").value * 60 -
    (dashboard.shortBreakData.timerDurationInSeconds - dashboard.timeLeft)

    return [dashboard.shortBreakData, labelSection, restTime]
  }

  if (dashboard.currentSession == 'LONGBREAKSETTER' || dashboard.currentSession == 'Long Break') {
    const labelSection = document.querySelectorAll('.timeButtonsControl')[2]
    const restTime = document.querySelector("[data-timerDuration='longBreakDuration']").value * 60 -
    (dashboard.longBreakData.timerDurationInSeconds - dashboard.timeLeft)

    return [dashboard.longBreakData, labelSection, restTime]
  }
},
}
