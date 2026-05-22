const menuController = {
    settingsWindow: document.querySelector('.settingsWindow'),
    buttonConfig: document.querySelector('.header__userSectionButton'),

    openSettings: function(t) {
        console.log(menuController.settingsWindow)
        menuController.settingsWindow.style.display = "flex"
    },

    closeSettings: function(t) {
        if(t.target.classList.contains("headerSettingsMenu__closeButton") || t.target.classList.contains('settingsMenu__buttonSave') ||
            t.target.classList.contains("settingsWindow") || t.target.classList.contains("headerMenu__closeButtonSvg")) {
            menuController.settingsWindow.style.display = "none"
            controller.updateEngineWithNewMenuValues()
            }
    },
    
    getAllConfigValues() {
        const timerElements = document.querySelectorAll('[data-timerduration]')
        const autoStartButtons = document.querySelectorAll('.autoStartAndInterval__button')
        const iterationsForIntervalElement = document.querySelector('.autoStartAndInterval__input')
        return {
            focusTimeValueInSeconds: Number(timerElements[0].value) * 60,
            breakTimeValueInSeconds: Number(timerElements[1].value) * 60,
            longBreakTimeValueInSeconds: Number(timerElements[2].value) * 60,
            autoStartBreaks: autoStartButtons[0].classList.contains('--buttonActive'),
            autoStartPomodoro: autoStartButtons[1].classList.contains('--buttonActive'),
            iterationsForInterval: Number(iterationsForIntervalElement.value)
        }
    },

    setMenuInitialEvents: function()  {
        menuController.buttonConfig.addEventListener('click', menuController.openSettings)
        menuController.settingsWindow.addEventListener('click', menuController.closeSettings)
    },

}

menuController.getAllConfigValues()

