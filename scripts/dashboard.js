const dashboard = {
    renderPage: function(currentEngineData) {
      this.renderTimerElement(currentEngineData.timeLeft)
      this.renderMainColor(currentEngineData.currentSessionColor)
      this.renderCounterIterate(currentEngineData.currentIterate)
      this.changeActiveTabStyle(currentEngineData.currentSession)
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

    renderCounterIterate: function(newIterate) {
      const counterIterateElement = document.querySelector('.currentPomodoro__counter')
      counterIterateElement.innerHTML = `#${newIterate}`
    },

    changeActiveTabStyle: function(newTab) {
      
    },

    setNewIterateConfig: function (currentIterateData) {
    setTimerOnScreen(currentIterateData.timeLeft)
    setBackgroundColor(currentIterateData)
  },

}

function changeBarListener(newSession) {
  const currentStateEngine = pomodoroomEngine.getState()
  console.log(newSession.target.dataset.Session)
  if (currentStateEngine.currentSession === newSession.target.dataset.datasession) return
  if(newSession) {
    pomodoroomEngine.manualBarChange(newSession)
    dashboard.renderPage(pomodoroomEngine.getState())
  }
}

dashboard.renderPage(pomodoroomEngine.getState())