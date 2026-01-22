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
}

function setInitialConfig() {
  const timerButton = document.querySelector('.timerButtonWrapper__button')
  const labelTimerPomodoro = document.querySelectorAll('.timeButtonsControl')

  labelTimerPomodoro.forEach((element) => {
    element.addEventListener('click', pomodoroSetter)
  })

  timerButton.addEventListener('click', changeStartAndPause)
  setNewIterateConfig(dashboard.focusTimeData)
}

function setNewIterateConfig(currentIterateData) {
  setTimer(currentIterateData.timerDurationInSeconds)
  setBackgroundColor(currentIterateData)
  dashboard.timeLeft = currentIterateData.timerDurationInSeconds
}

function changeStartAndPause() {
  const timerButton = document.querySelector('.timerButtonWrapper__button')
  if (timerButton.textContent == 'START') {
    setTimeout(() => {
      startCounter(dashboard, timerButton)
    }, 1000)
    timerButton.textContent = 'PAUSE'
  } else {
    timerButton.textContent = 'START'
  }
}

function startCounter() {
  const timerButton = document.querySelector('.timerButtonWrapper__button')
  const counter = setInterval(() => {
    if (timerButton.textContent == 'START') {
      clearInterval(counter)
    } else {
      dashboard.timeLeft--
      setTimer(dashboard.timeLeft)
    }

    if (dashboard.timeLeft == 0) {
      changeStartAndPause()
      clearInterval(counter)
      endTime()
    }
  }, 1)
}

function setTimer(totalTimeInSeconds) {
  const timerInMinutes = Math.floor(totalTimeInSeconds / 60)
  const TimerSeconds = totalTimeInSeconds % 60
  const pomodoroTimeLeft = document.querySelector('.timer__timeLeft')
  pomodoroTimeLeft.textContent = `${timerInMinutes.toString().padStart(2, 0)}:${TimerSeconds.toString().padStart(2, 0)}`
}

function endTime() {
  if (dashboard.currentSession == 'FOCUSTIME') {
    const iterateElement = document.querySelector('.currentPomodoro__counter')
    dashboard.iterate++
    iterateElement.textContent = `#` + dashboard.iterate
    if (dashboard.iterate % 4 == 0) {
      dashboard.currentSession = 'LONGBREAKSETTER'
    } else {
      dashboard.currentSession = 'SHORTBREAK'
    }
    if (dashboard.autoStartBreaks == true) {
      changeStartAndPause()
    }
  } else {
    dashboard.currentSession = 'FOCUSTIME'
    if (dashboard.autoStartPomodoros == true) {
      changeStartAndPause()
    }
  }
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

function currentWindowData() {
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
}

setInitialConfig()