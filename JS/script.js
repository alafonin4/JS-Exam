// Получить контейнер календаря
const calendarContainer = document.querySelector('.calendar-container');

function updateCalendar() {
    const quarterInput = document.getElementById('quarter');
    const selectedQuarter = parseInt(quarterInput.value);

    // Проверка на валидность выбранного квартала
    if (selectedQuarter < 1 || selectedQuarter > 4) {
        alert('Пожалуйста, выберите квартал от 1 до 4.');
        return;
    }

    // Получить текущий год
    const currentYear = new Date().getFullYear();

    // Обновить календарь с учетом выбранного квартала и текущего года
    createQuarterlyCalendar(currentYear, selectedQuarter);
}

// Функция для создания квартального календаря
function createQuarterlyCalendar(year, quarter) {
    // Очистить контейнер
    calendarContainer.innerHTML = '';

    // Создать объект даты для первого дня квартала
    const firstDay = new Date(year, (quarter - 1) * 3, 1);

    // Создать объект даты для последнего дня квартала
    const lastDay = new Date(year, quarter * 3, 0);

    // Создать таблицу календаря
    const table = document.createElement('table');
    const headerRow = table.createTHead().insertRow();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Заголовок календаря
    const headerCell = headerRow.insertCell();
    headerCell.colSpan = 7;
    headerCell.textContent = months[firstDay.getMonth()] + "-" + months[lastDay.getMonth()];
    headerCell.classList.add('calendar-header');

    // Создать строку дней недели
    const daysOfWeekRow = table.insertRow();
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    //daysOfWeekRow.insertRow();
    daysOfWeek.forEach(day => {
        const cell = daysOfWeekRow.insertCell();
        cell.textContent = day;
        cell.classList.add('day-of-week');
    });

    const body = table.createTBody().insertRow();
    // Создать дни месяца
    let currentDate = new Date(firstDay);
    while (currentDate <= lastDay) {
        if (currentDate.getDay() === 1) {
            // Новая строка каждой недели
            const weekRow = table.insertRow();
            for (let i = 0; i < 7; i++) {
                const cell = weekRow.insertCell();
                
                cell.textContent = currentDate.getDate();
                cell.classList.add('calendar-day');
                currentDate.setDate(currentDate.getDate() + 1);
            }
        } else {
            // Продолжить заполнение текущей недели
            const cell = table.rows[table.rows.length - 1].insertCell();
            if (currentDate.getMonth() === firstDay.getMonth()) {
                cell.textContent = currentDate.getDate();
            }
            cell.classList.add('calendar-day');
            currentDate.setDate(currentDate.getDate() + 1);
            console.log(currentDate);
        }
        //console.log(currentDate);
    }

    // Добавить таблицу к контейнеру календаря
    calendarContainer.appendChild(table);
}

// Использование функции для создания календаря
createQuarterlyCalendar(2024, 1); // Пример: первый квартал 2024 года
