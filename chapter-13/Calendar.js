const ensureImplements = require('../chapter-02/interface').ensureImplements;

class CalendarItem {
    display() {}
}

class CalendarYear {
    constructor(year, parent) {
        ensureImplements(CalendarItem, CalendarYear);
        this.year = year;
        this.months = [];
        this.numDays = [31, CalendarYear.isLeapYear(year), 29, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        this.numDays.forEach((days, idx) => {
            this.months[idx] = new CalendarMonth(idx, days, this.element);
        });
        this.element = document.createElement('div');
        this.element.style.display = 'none';
        parent.appendChild(this.element);
    }

    display() {
        this.months.forEach((val) => {
            val.display();
        });
        this.element.style.display = 'block';
    }
    static isLeapYear(y) {
        return (y > 0) && !(y % 4) && ((y % 100) || !(y % 400));
    }
}

class CalendarMonth {
    constructor(monthNum, numDays, parent) {
        ensureImplements(CalendarItem, CalendarMonth);
        this.monthNum = monthNum;
        this.element = document.createElement('div');
        this.element.style.display = 'none';
        parent.appendChild(this.element);
        this.days = numDays.reduce((res, day, idx) => {
            this.days[idx] = calendarDay;
        }, []);
    }

    display() {
        this.days.forEach((val) => {
            val.display(val, this.element);
        });
        this.element.style.display = 'block';
    }
}

class CalendarDay {
    constructor() {
    }

    display(date, parent) {
        const element = document.createElement('div');
        parent.appendChild(element);
        element.innerHTML = date;
    }
}

const calendarDay = new CalendarDay();


