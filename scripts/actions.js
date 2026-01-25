function setInitialEvents() {
  const timerButton = document.querySelector('.timerButtonWrapper__button')
  const labelTimerPomodoro = document.querySelectorAll('.timeButtonsControl')
  const getDashboardDataObj = dashboard.getDashboardData()

  labelTimerPomodoro.forEach((element) => {
    element.addEventListener('click', pomodoroSetter)
  })

  timerButton.addEventListener('click', changeStartAndPause)
}

setInitialEvents()