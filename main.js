window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list_el = document.querySelector("#tasks");

    const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    savedTasks.forEach(savedTask => {
        addTaskToList(savedTask.text, savedTask.checked);
    });

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const taskText = input.value;

        addTaskToList(taskText, false);

        saveTasksToLocalStorage();
    });

    function addTaskToList(taskText, isChecked) {
        const task_el = document.createElement('div');
        task_el.classList.add('task');

        const check_el = document.createElement('label');
        check_el.classList.add('checkcont');

        const task_check_el1 = document.createElement('input');
        task_check_el1.type = 'checkbox';
        task_check_el1.classList.add('checkcheck');
        task_check_el1.checked = isChecked;

        check_el.appendChild(task_check_el1);

        const task_check_el2 = document.createElement('span');
        task_check_el2.classList.add('checkmark');

        check_el.appendChild(task_check_el2);

        const task_content_el = document.createElement('div');
        task_content_el.classList.add('content');

        task_el.appendChild(check_el);
        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement('input');
        task_input_el.classList.add('text');
        task_input_el.type = 'text';
        task_input_el.value = taskText;
        task_input_el.setAttribute('readonly', 'readonly');

        task_content_el.appendChild(task_input_el);

        const task_actions_el = document.createElement('div');
        task_actions_el.classList.add('actions');

        const task_edit_el = document.createElement('button');
        task_edit_el.classList.add('edit');
        task_edit_el.innerText = 'Edit';

        const task_delete_el = document.createElement('button');
        task_delete_el.classList.add('delete');
        task_delete_el.innerText = 'Delete';

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);

        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);

        input.value = '';

        task_edit_el.addEventListener('click', (e) => {
            if (task_edit_el.innerText.toLowerCase() == "edit") {
                task_edit_el.innerText = "Save";
                task_input_el.removeAttribute("readonly");
                task_input_el.focus();
            } else {
                task_edit_el.innerText = "Edit";
                task_input_el.setAttribute("readonly", "readonly");
            }

            saveTasksToLocalStorage();
        });

        task_delete_el.addEventListener('click', (e) => {
            list_el.removeChild(task_el);

            saveTasksToLocalStorage();
        });

        task_check_el1.addEventListener('change', () => {

            if (task_check_el1.checked) {
                task_input_el.style.textDecoration = 'line-through';
                task_input_el.style.color = 'gray';
            } else {
                task_input_el.style.textDecoration = 'none';
                task_input_el.style.color = ''; // Reset to the default color
            }

            saveTasksToLocalStorage();
        });

        if (isChecked) {
            task_input_el.style.textDecoration = 'line-through';
            task_input_el.style.color = 'gray';
        }

    }

    function saveTasksToLocalStorage() {
        const tasks = Array.from(list_el.children).map(task_el => {
            const taskText = task_el.querySelector('.text').value;
            const isChecked = task_el.querySelector('.checkcheck').checked;
            return { text: taskText, checked: isChecked };
        });

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});