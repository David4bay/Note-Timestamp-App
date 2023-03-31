const highPriority = document.getElementById('highPriority');
const normalPriority = document.getElementById('normalPriority');
const submitButton = document.getElementById('submitButton');
const form = document.getElementById('timestampForm');
const closeSidebar = document.getElementById('close')
const nav = document.getElementById('nav');
const main = document.getElementById('main');
const tasks = document.getElementById('tasksRow');
const alert = document.getElementById('alert');

function adjustMain() {
    main.style.display = 'flex';
    main.style.flexDirection = 'column';
}

closeSidebar.addEventListener('click', function(e) {
    nav.style.position = 'absolute';
    adjustMain();
    nav.style.transform = 'translateX(-100%)';
})

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
        alert('Add a value to High Priority Field')
        tasks.removeChild();
    }
    let timestamp = DateTime.now().toFormat('MMMM dd, yyyy');

    let timepost = new TimeStamp(highpriority, normalpriority, timestamp);

    let firstList = document.createElement('td');
    let secondList = document.createElement('td');
    firstList.innerText = `${timepost.timestamp} | ${timepost.highpriority}`;
    secondList.innerText = ` ${timepost.timestamp} | ${timepost.normalpriority}`
    tasks.appendChild(firstList);
    tasks.appendChild(secondList);
});