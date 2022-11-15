const input = document.querySelector('.form__input');
const tasks = [];

if (localStorage.getItem('tasks')) {
	tasks.push(...JSON.parse(localStorage.getItem('tasks')));
	tasks.forEach(task => renderTask(task))
}

checkEmptyList();

input.addEventListener("keydown", (event) => event.key === "Enter" ? addTask() : null)
document.querySelector('.form__button').addEventListener('click', addTask)

document.querySelector('.deleteCompleted').addEventListener('click', () => {
	document.querySelectorAll('.task').forEach((task) => {
		if (task.classList.contains('completed')) {
			const index = tasks.findIndex((item) => item.id === Number(task.id))
			tasks.splice(index, 1)
			task.remove()
			saveToLocalStorage()
			checkEmptyList()
		}
	})
})

function renderTask(source) {
	const task = document.createElement('li');
	source.done ? task.className = 'task completed' : task.className = 'task';
	task.setAttribute('id', `${source.id}`)

	const taskText = document.createElement('p');
	taskText.className = 'wish';
	taskText.textContent = `${source.text}`;
	task.appendChild(taskText);



	const taskButtonsArea = document.createElement('div');
	task.appendChild(taskButtonsArea);

	const checkButton = document.createElement('i');
	checkButton.className = 'fas fa-check-square';
	taskButtonsArea.appendChild(checkButton);

	const deleteButton = document.createElement('i');
	deleteButton.className = 'fas fa-trash';
	taskButtonsArea.appendChild(deleteButton);

	checkButton.addEventListener('click', () => {
		const changedTask = tasks.find((item) => item.id === Number(task.id));
		changedTask.done = !changedTask.done
		task.classList.toggle('completed');
		saveToLocalStorage()
	})
	deleteButton.addEventListener('click', () => {
		const index = tasks.findIndex((item) => item.id === Number(task.id))
		tasks.splice(index, 1)
		task.remove()
		saveToLocalStorage()
		checkEmptyList()
	})

	document.querySelector('.tasklist').appendChild(task);
}

function addTask() {
	const newTask = {
		id: Date.now(),
		text: input.value,
		done: false,
	};

	renderTask(newTask);
	tasks.push(newTask)

	input.value = '';
	input.focus()
	saveToLocalStorage()
	checkEmptyList()
}

function saveToLocalStorage() {
	localStorage.setItem('tasks', JSON.stringify(tasks))
}

function checkEmptyList() {
	if (tasks.length === 0) {
		const message = document.createElement('p')
		message.className = 'empty';
		message.textContent = 'to-do list is empty!';
		document.querySelector('.container').appendChild(message);
	}
	else { document.querySelector('.empty') ? document.querySelector('.empty').remove() : null; }
}