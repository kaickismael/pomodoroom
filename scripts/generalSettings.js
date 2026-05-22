const tasksState = {
  tasks: [],
  activeTask: null,
  changeActiveTask: function(taskID) {
    this.activeTask = this.tasks.find(element => element.taskID === taskID)
    this.activeTask.taskIsFocus = true
  },

  addNewTask: function (newTaskName, numberOfTasks, taskNote) {
      tasksState.tasks.push({
      taskName: newTaskName,
      numberOfTasks: numberOfTasks,
      numberOfCompleteTasks: 0,
      taskNote: taskNote,
      taskID: crypto.randomUUID(),
      taskIsFocus: tasksState.tasks.length === 0 ? true : false
    })

    if(tasksState.tasks.length === 1) {
      tasksState.activeTask = tasksState.tasks[0]
    }
  },
    updateTaskData: function (newTaskData) {
      const taskToChange = this.tasks.find(element => element.taskID === newTaskData.taskID)
      taskToChange.taskName = newTaskData.taskName
      taskToChange.numberOfTasks = newTaskData.numberOfTasks
      taskToChange.numberOfCompleteTasks = newTaskData.numberOfCompleteTasks
      taskToChange.taskNote = newTaskData.taskNote
      return taskToChange
  },  

  returnTaskInfo: function(taskID) {
      const taskInfo = this.tasks.find(element => element.taskID === taskID)
      return taskInfo
  },

  clearFinishedTasks: function() {
    const newtasks = tasksState.tasks.filter(element => element.numberOfTasks > element.numberOfCompleteTasks)
    tasksState.tasks = newtasks
    return tasksState.tasks
  },

  clearActPomodoros: function() {
    tasksState.tasks.forEach(element => element.numberOfCompleteTasks = 0)
    return tasksState.tasks
  },

  clearAllTasks: function() {
    tasksState.tasks = []
    console.log(tasksState)
  }
}

const tasksController = {
  changeNumberOfTasks: function(t) {
    const numberOfTasks= document.querySelector('.numberOfTasksInput')
    if(t.currentTarget.dataset.action === 'add') {
      numberOfTasks.value ++
    } else if (t.currentTarget.dataset.action === 'subtract' && numberOfTasks.value > 1) {
        numberOfTasks.value --
    }
  },
  
  showNotes: function(t) {
      const newTaskNote = document.querySelector('.addNewTask__note')
      newTaskNote.hidden = false
      t.currentTarget.hidden = true
    },

  saveTask: function(t) {
    const newTaskName = document.querySelector('.addNewTask__newTaskName')
    const numberOfTasks = document.querySelector('.numberOfTasksInput')
    const taskNote = document.querySelector('.addNewTask__note')
    if(newTaskName.value === '' && t.currentTarget.dataset.buttoncreatenewtask === 'save') return
    if(t.currentTarget.dataset.buttoncreatenewtask === "save") {
      tasksState.addNewTask(newTaskName.value, numberOfTasks.value, taskNote.value)
      tasksView.renderTask(tasksState.tasks[tasksState.tasks.length - 1])
    } 
    newTaskName.value = ''
    numberOfTasks.value = 1
    taskNote.value = ''
    tasksController.toggleCreatorOfTasks()
  },

 changeActiveTask: function(t) {
  const taskList = document.querySelector('.taskList')
  const currentActiveTask = taskList.querySelector('.--taskActive')
  if(currentActiveTask && currentActiveTask != t.currentTarget) {
    tasksState.changeActiveTask(t.currentTarget.id)
    currentActiveTask.classList.remove('--taskActive')
    t.currentTarget.classList.add('--taskActive')
  }
  },

  openTaskManager: function(t) {
    const taskWrapper = t.currentTarget.closest('.taskWrapper')
    const currentTask = t.currentTarget.closest('.task')
    const taskToUpdate = tasksState.returnTaskInfo(currentTask.id)
    const taskConfigElement = templates.taskManagerTemplate(taskToUpdate)

    taskWrapper.dataset.state = 'editMode'
    currentTask.hidden = true
    taskWrapper.innerHTML += taskConfigElement
    event.stopPropagation()
  },

  changeTaskData: function(t) {
    const taskList = document.querySelector('.taskList')
    const taskWrapperElement = taskList.querySelector('[data-state="editMode"]')
    const taskEditor = taskWrapperElement.querySelector('.addNewTaskWrapper')
    const taskData = {
      taskID: taskWrapperElement.querySelector('.task').id,
      taskName: taskEditor.querySelector('.addNewTask__newTaskName').value,
      taskNote: taskEditor.querySelector('.addNewTask__note').value,
      numberOfTasks: taskEditor.querySelector('.numberOfTasksInput').value,
      numberOfCompleteTasks: taskEditor.querySelector('.numberOfCompleteTasksInput').value
    }

    if(t.currentTarget.innerText === "Save" && taskData.taskName === '') return
    if(t.currentTarget.innerText === "Save") {
      const taskWithNewData = tasksState.updateTaskData(taskData)
      taskWrapperElement.querySelector('.task').remove()
      tasksView.renderTask(taskWithNewData, true)
      taskWrapperElement.removeAttribute('data-state')
    }  else {taskWrapperElement.querySelector('.task').hidden = false}
      taskEditor.remove()
  },

 toggleCreatorOfTasks: function() {
    const taskSetInfo = document.querySelector('.addNewTaskWrapper')
    taskSetInfo.hidden = taskSetInfo.hidden ? false : true
  },

  handleSessionFinished: function() {
  if(!tasksState.activeTask) {return}
  tasksState.activeTask.numberOfCompleteTasks ++
  console.log(tasksState.activeTask.numberOfCompleteTasks)
  tasksView.renderTasksCompletes(tasksState.activeTask.numberOfCompleteTasks, tasksState.activeTask.taskID)
  },

  openWindowTasksConfigs(t) {
    const tasksSettingsWindow = document.querySelector('.tasksSettingsWindow')
    tasksSettingsWindow.hidden = tasksSettingsWindow.hidden ? false : true
  },

  clearFinishedTasks(t) {
    const newTasks = tasksState.clearFinishedTasks()
    const taskList = document.querySelector('.taskList')
    taskList.innerHTML = ''
    newTasks.forEach(element => {
      tasksView.renderTask(element)
    });
  },

  actPomodorosButton() {
    const resetTasks = tasksState.clearActPomodoros()
    const taskList = document.querySelector('.taskList')
    taskList.innerHTML = ''
    resetTasks.forEach(element => {
      tasksView.renderTask(element)
    });
  },

  clearAllTasksButton() {
    console.log('teste')
    tasksState.clearAllTasks()
    const taskList = document.querySelector('.taskList')
    taskList.innerHTML = ''
  },

  

  initEventListeners: function() {
  const addTask = document.querySelector('.addTaskWrapper')
  const addNewTaskWrapper = document.querySelector('.addNewTaskWrapper')
  const valueSettingButtons = document.querySelectorAll('.valueSettingButtons')
  const addNotes = document.querySelector('.addNewTask__addNote')
  const taskButtons = document.querySelectorAll('.addNewTaskCancelSaveWrapperButtons')
  const taskOptionsButton = document.querySelector('.headerTasklist__wrapperTaskOptionsButton')
  const tasksSettingsWindow = document.querySelector('.tasksSettingsWindow')
  const clearFinishedTasksButton = document.querySelector('.tasksSettingsWindow__clearFinishedTasks')
  const actPomodorosButton = document.querySelector('.tasksSettingsWindow__actPomodoros')
  const clearAllTasksButton = document.querySelector('.tasksSettingsWindow__clearAllTasks')

  addTask.addEventListener('click', tasksController.toggleCreatorOfTasks)
  valueSettingButtons[0].addEventListener('click', tasksController.changeNumberOfTasks)
  valueSettingButtons[1].addEventListener('click', tasksController.changeNumberOfTasks)
  taskButtons[0].addEventListener('click', tasksController.saveTask)
  taskButtons[1].addEventListener('click', tasksController.saveTask)
  addNewTaskWrapper.addEventListener('click', tasksController.newTaskCreatorConfigs)
  addNotes.addEventListener('click', tasksController.showNotes)
  taskOptionsButton.addEventListener('click', tasksController.openWindowTasksConfigs)
  clearFinishedTasksButton.addEventListener('click', tasksController.clearFinishedTasks)
  actPomodorosButton.addEventListener('click', tasksController.actPomodorosButton)
  clearAllTasksButton.addEventListener('click', tasksController.clearAllTasksButton)

  },
}



const tasksView = {
  renderTask(task, changingTask = false) {
    if(changingTask) {
      const taskWrapper = document.querySelector('[data-state="editMode"]')
      const taskElement = templates.taskTemplate(task)
      taskWrapper.innerHTML = taskElement
    } else {
      const taskWrapper = document.createElement('div')
      const taskList = document.querySelector('.taskList')
      taskWrapper.classList.add('taskWrapper')
      taskWrapper.innerHTML += templates.taskTemplate(task)
      taskList.appendChild(taskWrapper)
    }
  },

  renderTaskOnEspecificPosition(task, position, element) {
    const taskList = document.querySelector('.taskList')
    const taskElement = tasksView.taskTemplete(task)
    element.insertAdjacentElement(position, taskElement)
  },

  renderTasksCompletes(tasksValue, taskID) {
    const activeTask = document.getElementById(`${taskID}`)
    const iteratesPerformed = activeTask.querySelector('.remainingPomodoro__iteratesPerformed')
    iteratesPerformed.textContent = tasksValue
  },

  renderNewActiveTask() {

  },

  renderNewTaskValue(taskID) {
    const taskList = document.querySelector('.taskList')
    const task = taskList.getElementById(taskID)
    const taskName = task.querySelector('.taskName')
    const taskremainingPomodoros = task.querySelector('.remainingPomodoro__iteratesPerformed')
    const taskIterates = task.querySelector('.remainingPomodoro__remainingIterates')
    const taskNotes = task.querySelector('.taskNote')
  },
}


const templates = {
  taskTemplate: function(taskData) {
       return `<div class="task ${taskData.taskIsFocus ? '--taskActive' : ''}" id="${taskData.taskID}" onclick='tasksController.changeActiveTask(event)'>
    <div class="taskList__taskInformation">
      <div class="wrapperTaskListSVGAndName">
        <div class="taskListSvgWrapper">
          <img class="taskListSvg" src="./icons/svgsTasks/logoBlack.svg" alt="" />
        </div>
        <div class="taskName">${taskData.taskName}</div>
      </div>
      <div class="remainingPomodoroAndChangeTaskWrapper">
        <div class="remainingPomodoro">
          <span class="remainingPomodoro__iteratesPerformed">${taskData.numberOfCompleteTasks}</span>
          <span> / </span>
          <span class="remainingPomodoro__remainingIterates">${taskData.numberOfTasks}</span>
        </div>
        <div class="changeTaskInformationWrapper" onclick="tasksController.openTaskManager(event)">
          <button class="changeTaskInformationButton">
            <img class="changeTaskInformationSVG" src="./icons/svgsTasks/verticalEllipsisBlack.svg" alt=""/>
          </button>
        </div>
      </div>
        <p class="taskNote">${taskData.taskNote}</p>
    </div>
    </div>`
  },

  taskManagerTemplate: function(taskData) {
    return `<div class="addNewTaskWrapper">
          <div class="AddNewTask">
            <input type="text" class="addNewTask__newTaskName" value="${taskData.taskName ? taskData.taskName : ''}" placeholder="What are you working on?" />
            <div class="numberOfTasks">
              <span class="numberOfTasks__title">Act / </span>
              <span class="numberOfTasks__title">Est Pomodoros</span>
              <div class="numberOfTasks__pomodoroQuantity">
                <input type="number" class="numberOfCompleteTasksInput --inputNumber" value="${taskData.numberOfCompleteTasks != undefined ? taskData.numberOfCompleteTasks : ''}" min="0" step="1"/>
                <input type="number" class="numberOfTasksInput --inputNumber" value="${taskData.numberOfTasks}" min="0" step="1" />
                <div class="pomodoroQuantity__containerValueSettingButtons">
                  <div class="valueSettingButtons" data-action="add" onclick="tasksController.changeNumberOfTasks(event)">
                    <img
                      src="./icons/svgsTasks/caretUpSvg.svg"
                      alt=""
                      class="valueSettingButtonsImg"
                      data-buttonsConfigTaskQuantity="caretUp"
                    />
                  </div>
                  <div class="valueSettingButtons" data-action="subtract" onclick="tasksController.changeNumberOfTasks(event)">
                    <img
                      src="./icons/svgsTasks/caretDownSvg.svg"
                      alt=""
                      class="valueSettingButtonsImg"
                      data-buttonsConfigTaskQuantity="caretDown"
                    />
                  </div>
                </div>
              </div>
              <div>
                <span class="addNewTask__addNote" onclick="tasksController.showNotes(event)" ${taskData.taskNote ? 'hidden': ''}>+ Add Note</span>
                <textarea name="" id="" class="addNewTask__note" cols="30" rows="10" placeholder="Some notes..." ${taskData.taskNote ? '' : 'hidden'}>${taskData.taskNote}</textarea>
              </div>
            </div>
          </div>
          <div class="addNewTaskCancelSave">
            <div class="addNewTaskCancelSaveWrapperButtons" data-buttonCreateNewTask="cancel">
              <button class="addNewTaskCancelSave__button --cancelButton" onclick="tasksController.changeTaskData(event)">Cancel</button>
            </div>
            <div class="addNewTaskCancelSaveWrapperButtons" data-buttonCreateNewTask="save">
              <button class="addNewTaskCancelSave__button --saveButton" onclick="tasksController.changeTaskData(event)">Save</button>
            </div>
          </div>
        </div>`
  }
}