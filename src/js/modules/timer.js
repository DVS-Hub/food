function timer(id, deadLine){
    function getTimeRemaining (endTime) {
        const t = Date.parse(endTime) - new Date(),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / 1000 * 60) % 60),
              seconds = Math.floor((t / 1000) % 60);
        return {
            t,
            days,
            hours,
            minutes,
            seconds
        };
    }

    function setClock(selector, endTime) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timerInterval = setInterval(updateClock, 1000);

            updateClock();
        
        function addZero(num) {
            if (num >= 0 && num < 10){
                return `0${num}`;
            }else {
                return num;
            }
        }

        function updateClock() {
            const t = getTimeRemaining(endTime);
            days.textContent = addZero(t.days);
            hours.textContent = addZero(t.hours);
            minutes.textContent = addZero(t.minutes);
            seconds.textContent = addZero(t.seconds);
    
            if(endTime - t.t <= 0){
                clearInterval(timerInterval);
            }
        }
    }
    setClock(id, deadLine);
}

export default timer;