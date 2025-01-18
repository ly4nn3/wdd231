const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: false
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

// Menu animation
document.querySelector('.hamburger-menu').addEventListener('click', function() {
    const nav = document.querySelector('nav ul');
    this.classList.toggle('active');
    nav.classList.toggle('show');
});

// Course Display Functions
function displayCourses(filteredCourses = courses) {
    const coursesContainer = document.getElementById('courses');
    coursesContainer.innerHTML = ''; // Clear existing content

    const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
    
    document.querySelector('.credits-counter').textContent = `Total credits for the courses listed: ${totalCredits}`;

    filteredCourses.forEach(course => {
        const courseElement = document.createElement('div');
        courseElement.className = `course-card ${course.completed ? 'completed' : 'incomplete'}`;

        courseElement.innerHTML = `
            <h3>${course.subject} ${course.number} - ${course.title}</h3>
            <p class="credits">${course.credits} credits</p>
            <p class="description">${course.description}</p>
            <div class="technologies">
                ${course.technology.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            ${course.completed ? '<span class="completion-badge">Completed</span>' : ''}
        `;

        coursesContainer.appendChild(courseElement);
    });
}

// Filter buttons
document.getElementById('all').addEventListener('click', () => {
    displayCourses();
    setActiveFilter('all');
});

document.getElementById('cse').addEventListener('click', () => {
    const filtered = courses.filter(course => course.subject === 'CSE');
    displayCourses(filtered);
    setActiveFilter('cse');
});

document.getElementById('wdd').addEventListener('click', () => {
    const filtered = courses.filter(course => course.subject === 'WDD');
    displayCourses(filtered);
    setActiveFilter('wdd');
});

function setActiveFilter(filterId) {
    document.querySelectorAll('.filters button').forEach(button => {
        button.classList.remove('active-filter');
    });
    document.getElementById(filterId).classList.add('active-filter');
}

displayCourses();
setActiveFilter('all');