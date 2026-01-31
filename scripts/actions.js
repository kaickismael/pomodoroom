function setInitialEvents() {
  const timerButton = document.querySelector('.timerButtonWrapper__button')
  const labelTimerPomodoro = document.querySelectorAll('.timeButtonsControl')

  labelTimerPomodoro.forEach((element) => {
    element.addEventListener('click', changeBarListener)
  })

  timerButton.addEventListener('click', () => {
    timerController.countDown(pomodoroomEngine.getState(), 1000)
  })
}

setInitialEvents()