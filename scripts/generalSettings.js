const settingsButton = document.querySelector("[data-headerButtons='settings']")
const settingsWindow = document.querySelector('.settingsWindow')
const body = document.querySelector('body')
const addTaskWrapper = document.querySelector('.addTaskWrapper')
const buttonsAddNewTaskValue = document.querySelectorAll('.valueSettingButtons')
const addNewTaskButtonsCancelSave = document.querySelectorAll('.addNewTaskCancelSave__button')
const buttonTaskAddnote = document.querySelector('.addNewTask__addNote')

settingsButton.addEventListener('click', activeSettingsMenu)
settingsWindow.addEventListener('click', disableSettingsMenu)
addTaskWrapper.addEventListener('click', openTaskCreatorWindow)
buttonTaskAddnote.addEventListener('click', addTaskNote)

buttonsAddNewTaskValue.forEach((button) => {
  button.addEventListener('click', taskSetNewTaskValue)
})

addNewTaskButtonsCancelSave.forEach((element) => element.addEventListener('click', closeTaskCreatorWindow))

function activeSettingsMenu() {
  body.style.overflow = 'hidden'
  settingsWindow.style.display = 'flex'
}

function disableSettingsMenu(t) {
  body.style.overflow = 'auto'
  if (t.target.classList.value == 'settingsWindow' || t.target.classList.value == 'headerMenu__closeButtonSvg') {
    setNewConfig()
    settingsWindow.style.display = 'none'
  }
}

function openTaskCreatorWindow() {
  const wrapperAddNewTask = document.querySelector('.addNewTaskWrapper')
  wrapperAddNewTask.hidden = false
  addTaskWrapper.hidden = true
  wrapperAddNewTask.addEventListener('click', setNewTask)
}

function setNewTask(t) {}

function taskSetNewTaskValue(t) {
  const addNewTaskInput = document.querySelector('.numberOfTasksInput ')
  if (t.target.dataset.action == 'add' || t.target.parentElement.dataset.action == 'add') {
    addNewTaskInput.value < 1 ? addNewTaskInput.setAttribute('step', 0.1) : addNewTaskInput.setAttribute('step', 1)
    addNewTaskInput.stepUp()
  } else {
    addNewTaskInput.value <= 1 ? addNewTaskInput.setAttribute('step', 0.1) : addNewTaskInput.setAttribute('step', 1)
    addNewTaskInput.stepDown()
  }
}

function setNewConfig() {
  dashboard.timeLeft = currentWindowData()[2]
  if (dashboard.timeLeft <= 0) endTime()
  setTimer(dashboard.timeLeft)
  dashboard.focusTimeData.timerDurationInSeconds =
    document.querySelector("[data-timerDuration='pomodoroDuration']").value * 60
  dashboard.shortBreakData.timerDurationInSeconds =
    document.querySelector("[data-timerDuration='shortBreakDuration']").value * 60
  dashboard.longBreakData.timerDurationInSeconds =
    document.querySelector("[data-timerDuration='longBreakDuration']").value * 60
}

function closeTaskCreatorWindow(t) {
  const wrapperAddNewTask = document.querySelector('.addNewTaskWrapper')
  const taskName = document.querySelector('.addNewTask__newTaskName')
  const numberOfTasksInput = document.querySelector('.numberOfTasksInput')
  const taskNote = document.querySelector('.addNewTask__note')
  
  if (t.target.textContent == 'Save') {
    if (createNewTask() === false) {return}

  } else if (t.target.textContent == 'Cancel') {
    if(taskName.value || taskNote.value) {
      const deleteInputData = window.confirm('The input data will be lost. Are you sure you want to close it?')
      if(deleteInputData == false) {return}
    }
  }


  addTaskWrapper.hidden = false
  wrapperAddNewTask.hidden = true

  taskName.value = ''
  numberOfTasksInput.value = 1
  taskNote.value = ''
}

function createNewTask() {
  const taskList = document.querySelector('.taskList')
  const taskName = document.querySelector('.addNewTask__newTaskName')
  if (!taskName.value) {
    return false
  }
  const numberOfTasksInput = document.querySelector('.numberOfTasksInput')
  const taskNote = document.querySelector('.addNewTask__note')
  console.log(document.querySelector('.task'))
  const IsFirstTask = document.querySelector('.task') == null ? '--taskActive' : ''
  const taskNoteHTML =
    taskNote.value == false
      ? ''
      : `
  <div class="taskNote">
  <div class="taskNote__text">
    ${taskNote.value}
  </div>
  `
  const task = document.createElement('div')
  task.innerHTML += `
  <div class="task ${IsFirstTask}">
  <div class="taskList__taskInformation">
    <div class="wrapperTaskListSVGAndName">
      <div class="taskListSvgWrapper">
        <img class="taskListSvg" src="/icons/svgsTasks/logoBlack.svg" alt="" />
      </div>
      <div class="taskName">${taskName.value}</div>
    </div>
    <div class="remainingPomodoroAndChangeTaskWrapper">
      <div class="remainingPomodoro">
        <span class="remainingPomodoro__iteratesPerformed">0</span>
        <span class="remainingPomodoro__remainingIterates">/ ${numberOfTasksInput.value}</span>
      </div>
      <div class="changeTaskInformationWrapper">
        <button class="changeTaskInformationButton">
          <img class="changeTaskInformationSVG" src="/icons/svgsTasks/verticalEllipsisBlack.svg" alt="" />
        </button>
      </div>
    </div>
  </div>
  ${taskNoteHTML}
  </div>
  `
  task.addEventListener('click', configTask)
  taskList.appendChild(task)
}

function addTaskNote() {
  const taskNote = document.querySelector('.addNewTask__note')
  taskNote.hidden = false
  buttonTaskAddnote.hidden = true
}

function configTask(t) {
  const task = t.target.parentElement
  const oldActiveElement = document.querySelector('.--taskActive')

  if (t.target.classList.contains('task')) {
    oldActiveElement.classList.remove('--taskActive')
    t.target.classList.add('--taskActive')
  } else if (t.target.classList.contains('taskList__taskInformation')) {
    oldActiveElement.classList.remove('--taskActive')
    t.target.parentElement.classList.add('--taskActive')
  } else if (t.target.classList.contains('changeTaskInformationButton')) {
  }
}
