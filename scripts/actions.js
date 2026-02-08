function setInitialEvents() {
  const timerButton = document.querySelector('.timerButtonWrapper__button')
  const labelTimerPomodoro = document.querySelectorAll('.timeButtonsControl')

  labelTimerPomodoro.forEach((element) => {
    element.addEventListener('click', changeBar)
  })

  timerButton.addEventListener('click', () => {
    controller.toggleRunState()
  })
}

setInitialEvents()

function changeBar(t) {
  const newBarSessionName = t.currentTarget? t.currentTarget.dataset.session : t
  const engineCurrentState = pomodoroomEngine.getState()
  if(newBarSessionName === engineCurrentState.currentSession) {return}
  timerController.breakCounter()
  pomodoroomEngine.toggleTimeState()
  console.log(newBarSessionName)
  pomodoroomEngine.switchTabData(newBarSessionName)
  dashboard.renderPage(pomodoroomEngine.getState())
}