const buttonAutoStart = document.querySelectorAll('.autoStartAndInterval__button')

buttonAutoStart.forEach((buttonAutoStart) => {
  buttonAutoStart.addEventListener('click', turnOnButton)
})

function turnOnButton(t) {
  t.target.classList.toggle('--buttonActive')
}


function loadingProgressBar() {
  const progressBar = document.querySelector('.progressBar')
  const currentEngineConfig = pomodoroomEngine.getState()
  const porcentagemAtualFaltando = 100 - ((currentEngineConfig.timeLeft / 
  currentEngineConfig.currentSessionConfig.timerDurationInSeconds) * 100)
  progressBar.style.width = `${porcentagemAtualFaltando}%`
}

loadingProgressBar()