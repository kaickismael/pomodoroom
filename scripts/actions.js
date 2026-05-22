function setInitialEvents() {
  const timerButton = document.querySelector('.timerButtonWrapper__button')
  const labelTimerPomodoro = document.querySelectorAll('.timeButtonsControl')
  const pomodoroCounter = document.querySelector('.currentPomodoro__counter')
  labelTimerPomodoro.forEach((element) => {
    element.addEventListener('click', (t) => {
    const newBarSessionName = t.currentTarget.dataset.session
    controller.changeBar(newBarSessionName)
    })
  })

  timerButton.addEventListener('click', () => {
    controller.toggleRunState()
  })
  
  controller.setInitialEvents()
  menuController.setMenuInitialEvents()
  tasksController.initEventListeners()

}

setInitialEvents()

