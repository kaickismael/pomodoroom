function setInitialEvents() {
  const timerButton = document.querySelector('.timerButtonWrapper__button')
  const labelTimerPomodoro = document.querySelectorAll('.timeButtonsControl')

  labelTimerPomodoro.forEach((element) => {
    element.addEventListener('click', changeBarListener)
  })

  timerButton.addEventListener('click', () => {
    controller.toggleRunState()
  })
}

setInitialEvents()

function changeBarListener(t) {
  const newBarSessionName = t.currentTarget.dataset.session
  controller.changeBar(newBarSessionName)
}