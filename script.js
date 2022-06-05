const dom = {
	new: document.getElementById('new'),
	add: document.getElementById('add'),
	tasks: document.getElementById('tasks'),
	count: document.getElementById('count'),
}

// Массив задач
const tasks = [];

// Отслеживаем клик по кнопке Добавить задачу

dom.add.onclick = () => {
	const newTaskText = dom.new.value;

	if (newTaskText && isNotHaveTusk(newTaskText, tasks)) {
		addTask(newTaskText, tasks);
		dom.new.value = '';
		taskRender(tasks);
	}
}

// Функция добавления задачи
function addTask(text, list) {
	const timesTamp = Date.now();
	const task = {
		id: timesTamp,
		text,
		isComplete: false
	}
	list.push(task);
}

// Проверка существования в массиве задач
function isNotHaveTusk(text, list) {
	let isNotHave = true;

	list.forEach(task => {
		if (task.text === text) {
			alert('zadacha sushestvuet');
			isNotHave = false;
		}
	});
	return isNotHave;
}

// Функция вывода списка задач
function taskRender(list) {
	let htmlList = '';
	list.forEach(task => {
		const cls = task.isComplete ? 'todo_task todo_task_complete' : 'todo_task';
		const checked = task.isComplete ? 'checked' : '';
		const taskHtml = `
		<div id="${task.id}" class="${cls}">
		<label class="todo_checkbox">
			<input type="checkbox" ${checked}>
			<div class="todo_checkbox-div"></div>
		</label>
		<div class="todo_task_text">${task.text}</div>
		<div class="todo_task-del">-</div>
	</div>`
	htmlList += taskHtml; 
	});

	dom.tasks.innerHTML = htmlList;

	renderTaskCount(list);
}

// Отслеживаем клик по чекбоксу задачи
dom.tasks.onclick = (event) => {
	const target = event.target;
	const isCheckBoxEl = target.classList.contains('todo_checkbox-div');
	const isDeleteEl = target.classList.contains('todo_task-del');

	if (isCheckBoxEl) {
		const task = target.parentElement.parentElement;
		const taskId = task.getAttribute('id');
		changeTaskStatus(taskId, tasks);
		taskRender(tasks);
	}
	if (isDeleteEl) {
		const task = target.parentElement;
		const taskId = task.getAttribute('id');
		deleteTask(taskId, tasks);
		taskRender(tasks)
	}
}

// Функция изменения статуса задач
function changeTaskStatus(id, list) {
	list.forEach(task => {
		if (task.id == id) {
			task.isComplete = !task.isComplete;
		}
	})
}

// Функция удаления задачи
function deleteTask (id, list) {
	list.forEach((task, index) => {
		if (task.id == id) {
			list.splice(index, 1)
		}
	})
}

// Выводи количетсва задач
function renderTaskCount(list) {
	dom.count.innerHTML = list.length;
}