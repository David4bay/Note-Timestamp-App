const highPriority = document.getElementById('highPriority');
const normalPriority = document.getElementById('normalPriority');
const submitButton = document.getElementById('submitButton');
const form = document.getElementById('timestampForm');
const closeSidebar = document.getElementById('close');
const nav = document.getElementById('nav');
const main = document.getElementById('main');
const alert = document.getElementById('alert');
const table = document.getElementById('all-tasks');

function adjustMain() {
  main.style.display = 'flex';
  main.style.flexDirection = 'column';
}

closeSidebar.addEventListener('click', function(e) {
  nav.style.position = 'absolute';
  adjustMain();
  nav.style.transform = 'translateX(-100%)';
});

submitButton.addEventListener('click', function(e) {
  e.preventDefault();

  let DateTime = luxon.DateTime;

  function TimeStamp(highpriority, normalpriority, timestamp) {
    this.highpriority = highpriority;
    this.normalpriority = normalpriority;
    this.timestamp = timestamp;
  }

  const highpriority = highPriority.value;
  const normalpriority = normalPriority.value;

  if (highpriority === '') {
    alert.innerText = 'Hight Priority Field Empty!';
    alert.style.display = 'block';
    setTimeout(() => {
      alert.style.display = 'none';
      alert.innerText = '';
    }, 3500);
    return;
  }

  let timestamp = DateTime.now().toFormat('MMMM dd, yyyy');
  let newRow = document.createElement('tr');
  let timepost = new TimeStamp(highpriority, normalpriority, timestamp);

  let firstList = document.createElement('td');
  let secondList = document.createElement('td');
  firstList.innerText = `${timepost.timestamp} | \n${timepost.highpriority}`;
  secondList.innerText = ` ${timepost.timestamp} | \n${timepost.normalpriority}`;

  let deleteButton = document.createElement('button');
  deleteButton.innerText = 'Delete';
  deleteButton.classList.add('delete-button');

  deleteButton.addEventListener('click', function() {
    newRow.remove();
    tasks.splice(tasks.indexOf(timepost), 1);
    saveTasksToLocalStorage();
  });

  let deleteButtonCell = document.createElement('td');
  deleteButtonCell.appendChild(deleteButton);

  newRow.appendChild(firstList);
  newRow.appendChild(secondList);
  newRow.appendChild(deleteButtonCell);
  table.appendChild(newRow);

  tasks.push(timepost);
  saveTasksToLocalStorage();
  
  highPriority.value = '';
  normalPriority.value = '';
});

let tasks = [];
function saveTasksToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasksFromLocalStorage() {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    tasks.forEach((task) => {
      let newRow = document.createElement('tr');
      let firstList = document.createElement('td');
      let secondList = document.createElement('td');

      firstList.innerText = `${task.timestamp} | \n${task.highpriority}`;
      secondList.innerText = ` ${task.timestamp} | \n${task.normalpriority}`;

      let deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.classList.add('delete-button');

      deleteButton.addEventListener('click', function() {
        newRow.remove();
        tasks.splice(tasks.indexOf(task), 1);
        saveTasksToLocalStorage();
      });

      let deleteButtonCell = document.createElement('td');
      deleteButtonCell.classList.add('delete-btn');
      deleteButtonCell.appendChild(deleteButton);

      newRow.appendChild(firstList);
      newRow.appendChild(secondList);
      newRow.appendChild(deleteButtonCell);
      table.appendChild(newRow);
    });
  }
}

loadTasksFromLocalStorage();
