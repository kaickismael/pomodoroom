function setInitialEvents() {
  const timerButton = document.querySelector('.timerButtonWrapper__button')
  const labelTimerPomodoro = document.querySelectorAll('.timeButtonsControl')

  labelTimerPomodoro.forEach((element) => {
    element.addEventListener('click', changeBar)
  })

  timerButton.addEventListener('click', () => {
    timerController.startCounter(1000, pomodoroTimerCounter(-1))
  })
}

setInitialEvents()


function changeBar(t) {
  const newBarSessionName = t.currentTarget.dataset.session
  pomodoroomEngine.toggleTimeState()
  pomodoroomEngine.switchTabData(newBarSessionName)
  dashboard.renderPage(pomodoroomEngine.getState())
}