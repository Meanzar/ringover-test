document.addEventListener('DOMContentLoaded', () => {
  // URL de l'API
  const apiUrl = "http://localhost:9000/v1/tasks";
  // Éléments du DOM
  const taskList = document.getElementById('task-list');
  const addTaskButton = document.getElementById('add-task');
  const taskTitleInput = document.getElementById('task-title');
  const taskDateInput = document.getElementById('task-date');
  const searchTextInput = document.getElementById('search-text');
  const searchDateInput = document.getElementById('search-date');

  // Fonction pour créer un élément de tâche
  function createTaskItem(task) {
    const li = document.createElement('li');
    li.textContent = `${task.label}  (Terminée le : ${task.end_date})`;
    li.appendChild(createButton('Terminer', () => completeTask(task.label)));
    li.appendChild(createButton('Supprimer', () => deleteTask(task.label)));
    return li;
  }

  // Fonction pour créer un bouton
  function createButton(text, onClick) {
    const button = document.createElement('button');
    button.textContent = text;
    button.addEventListener('click', onClick);
    return button;
  }

  // Fonction pour rafraîchir la liste des tâches
  function refreshTaskList() {
    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        taskList.innerHTML = '';
        if (Array.isArray(data)) data.forEach(task => taskList.appendChild(createTaskItem(task)));
      })
      .catch(error => console.error('Error fetching tasks:', error));
  }

  // Ajout d'une tâche
  addTaskButton.addEventListener('click', () => {
    const title = taskTitleInput.value;
    const dueDate = taskDateInput.value;
    if (!(title && dueDate)) return alert("Information manquante du ticket");
    fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ label: title, description: title, start_date: new Date().toISOString(), end_date: dueDate })
    })
    .then(() => {
      refreshTaskList();
      taskTitleInput.value = '';
      taskDateInput.value = '';
    })
    .catch(error => console.error('Error adding task:', error));
  });

  // Suppression d'une tâche
  function deleteTask(label) {
    fetch(`${apiUrl}/${label}`, { method: 'DELETE' })
      .then(refreshTaskList)
      .catch(error => console.error('Error deleting task:', error));
  }

  // Marquage d'une tâche comme terminée
  function completeTask(label) {
    fetch(`${apiUrl}/${label}`, { 
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ end_date: new Date().toISOString() })
    })
    .then(refreshTaskList)
    .catch(error => console.error('Error completing task:', error));
  }

  // Recherche de tâches
  function searchTasks() {
    const searchText = searchTextInput.value.toLowerCase();
    const searchDate = searchDateInput.value;
    fetch(apiUrl, { method: 'GET'})
      .then(response => response.json())
      .then(data => {
        const filteredTasks = data.filter(task => {
          const titleMatches = task.label.toLowerCase().includes(searchText);
          const dateMatches = searchDate ? task.end_date === searchDate : true;
          return titleMatches && dateMatches;
        });
        taskList.innerHTML = '';
        filteredTasks.forEach(task => {
          const li = createTaskItem(task);
          taskList.appendChild(li);
        });
      })
      .catch(error => console.error('Error searching tasks:', error));
  }

  // Gestion de la recherche
  searchTextInput.addEventListener('input', searchTasks);
  searchDateInput.addEventListener('change', searchTasks);

  // Initialisation de la liste des tâches
  refreshTaskList();
});
