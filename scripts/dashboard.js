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
      const newcurrentActiveTab = document.querySelector(`[data-session='${newTab}']`)
      const currentActiveTab = document.querySelector('.--selectEffect')
      if(currentActiveTab) {currentActiveTab.classList.remove('--selectEffect')}
      
      newcurrentActiveTab.classList.add('--selectEffect')
    },

    setNewIterateConfig: function (currentIterateData) {
    setTimerOnScreen(currentIterateData.timeLeft)
    setBackgroundColor(currentIterateData)
  },

}

function changeBarListener(newSession) {
  const currentStateEngine = pomodoroomEngine.getState()
  if (currentStateEngine.currentSession === newSession.target.dataset.data-session) return
  if(newSession) {
    manualBarChange(newSession)
    renderPage(pomodoroomEngine.getState())
  }

}

dashboard.renderPage(pomodoroomEngine.getState())