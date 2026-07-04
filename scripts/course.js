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
    if (!container) return;
    container.innerHTML = '';

    filteredCourses.forEach(course => {
        const courseElement = document.createElement('div');

        const statusClass = course.completed ? 'completed' : 'uncompleted';
        courseElement.className = `course-card ${statusClass}`;

        courseElement.innerHTML = `${course.subject} ${course.number}`;
        container.appendChild(courseElement);
    });

    if (totalCreditsDisplay) {
        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        totalCreditsDisplay.textContent = totalCredits;
    }
}

function setActiveButton(button) {
    document.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
    if (button) {
        button.classList.add('active');
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const btnAll = document.querySelector('#filter-all');
    const btnCse = document.querySelector('#filter-cse');
    const btnWdd = document.querySelector('#filter-wdd');

    if (btnAll) {
        btnAll.addEventListener('click', (e) => {
            setActiveButton(e.target);
            displayCourses(courses);
        });
    }

    if (btnCse) {
        btnCse.addEventListener('click', (e) => {
            setActiveButton(e.target);
            const cseCourses = courses.filter(course => course.subject === 'CSE');
            displayCourses(cseCourses);
        });
    }

    if (btnWdd) {
        btnWdd.addEventListener('click', (e) => {
            setActiveButton(e.target);
            const wddCourses = courses.filter(course => course.subject === 'WDD');
            displayCourses(wddCourses);
        });
    }

    displayCourses(courses);
});