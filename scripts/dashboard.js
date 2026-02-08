const dashboard = {
    renderPage: function(currentEngineData) {
      this.renderTimerElement(currentEngineData.timeLeft)
      this.renderMainColor(currentEngineData.currentSessionColor)
      this.renderCounterIterate(currentEngineData.currentIterate, currentEngineData.currentSession)
      this.changeActiveTabStyle(currentEngineData.currentSession)
      this.toggleNameButton(currentEngineData.timeIsRunning)
    },

    renderTimerElement: function(timerInSeconds) {
      const timerLeftElement = document.querySelector('.timer__timeLeft')
      const timerValueInMinutes = Math.floor(timerInSeconds / 60).toString().padStart(2, "0")
      const timerValueInSeconds = (timerInSeconds % 60).toString().padStart(2, "0")
      timerLeftElement.innerText = `${timerValueInMinutes}:${timerValueInSeconds}`
    },

    renderMainColor: function(newColor) {
      const rootElement = document.documentElement
      rootElement.style.setProperty("--main-bg-color", newColor)
    },

    renderCounterIterate: function(newIterate, currentSession) {
      if(currentSession === 'FOCUSTIME') {
      const counterIterateElement = document.querySelector('.currentPomodoro__counter')
      console.log(counterIterateElement)
      counterIterateElement.innerHTML = `#${newIterate}`
      }

    },

    changeActiveTabStyle: function(newTab) {
      const newTabElement = document.querySelector(`[data-session="${newTab}"]`)
      const currentActiveTab = document.querySelector('.--selectEffect')
      currentActiveTab.classList.remove('--selectEffect')
      newTabElement.classList.add('--selectEffect')
    },

    toggleNameButton: function(timeIsRunning) {
      const buttonStartAndPause = document.querySelector('.timerButtonWrapper__button')
      if(timeIsRunning) {
        buttonStartAndPause.innerText = 'PAUSE'
      } else {
        buttonStartAndPause.innerText = "START"
      }
    },

    setNewIterateConfig: function (currentIterateData) {
    setTimerOnScreen(currentIterateData.timeLeft)
    setBackgroundColor(currentIterateData)
  },

}

function changeBarListener(newSession) {
  const currentStateEngine = pomodoroomEngine.getState()
  if (currentStateEngine.currentSession === newSession.target.dataset.datasession) return
  if(newSession) {
    pomodoroomEngine.manualBarChange(newSession)
    dashboard.renderPage(pomodoroomEngine.getState())
  }
}

dashboard.renderPage(pomodoroomEngine.getState())