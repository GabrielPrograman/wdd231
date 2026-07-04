const courses = [
    { subject: `CSE`, number: 110, title: `Introduction to Programming`, credits: 2, completed: true },
    { subject: `WDD`, number: 130, title: `Web Fundamentals`, credits: 2, completed: true },
    { subject: `CSE`, number: 111, title: `Programming with Functions`, credits: 2, completed: true },
    { subject: `WDD`, number: 131, title: `Web Frontend Development I`, credits: 2, completed: true },
    {subject: `CSE`, number: 210, title: `Programming with Classes`, credits: 2, completed: false},
    {subject: `WDD`, number: 231, title: `Web Frontend Development II`, credits: 2, completed: false}
];

const container = document.querySelector('#course-container');
const totalCreditsDisplay = document.querySelector('#total-credits');

function displayCourses(filteredCourses) {
    container.innerHTML = '';

    filteredCourses.forEach(course => {
        const courseElement = document.createElement('div');
        const statusClass = course.completed ? 'completed' : 'incomplete';
        card.className = `course-card ${statusClass}`;
        card.innerHTML = `${course.subject} ${course.number}`;
        container.appendChild(card);
    });

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    totalCreditsDisplay.textContent = totalCredits;
}

document.querySelector('#filter-all').addEventListener('click', (e) => {
    setActiveButton(e.target);
    displayCourses(courses);
});

document.querySelector('#filter-completed').addEventListener('click', (e) => {
    setActiveButton(e.target);
    displayCourses(courses.filter(course => course.subject === `CSE`));
});

document.querySelector('#filter-incomplete').addEventListener('click', (e) => {
    setActiveButton(e.target);
    displayCourses(courses.filter(course => course.subject === `WDD`));
});

function setActiveButton(button) {
    document.querySelectorAll('.filter-button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
}

displayCourses(courses);