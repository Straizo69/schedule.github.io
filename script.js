document.getElementById('fileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const json = JSON.parse(e.target.result);
            generateSchedule(json);
        };
        reader.readAsText(file);
    }
});

function generateSchedule(data) {
    const scheduleContainer = document.getElementById('schedule');
    scheduleContainer.innerHTML = ''; // Clear previous content

    data.schedule.forEach(day => {
        const dayContainer = document.createElement('div');
        dayContainer.classList.add('schedule-day');

        const dateHeading = document.createElement('h2');
        dateHeading.textContent = day.date;
        dayContainer.appendChild(dateHeading);

        const table = document.createElement('table');
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Subject</th>
                <th>Time</th>
                <th>Teacher</th>
                <th>Classroom</th>
            </tr>
        `;
        table.appendChild(thead);

        const tbody = document.createElement('tbody');
        day.lessonList.forEach(lesson => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${lesson.subject}</td>
                <td>${lesson.time}</td>
                <td>${lesson.teacher}</td>
                <td>${lesson.classroom}</td>
            `;
            tbody.appendChild(row);
        });
        table.appendChild(tbody);

        dayContainer.appendChild(table);
        scheduleContainer.appendChild(dayContainer);
    });
}
