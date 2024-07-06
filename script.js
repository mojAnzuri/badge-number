document.addEventListener('DOMContentLoaded', function() {
    const reservedNumbers = [];
    const invalidNumbers = ["11", "22", "33", "44", "55", "66", "77", "88", "99"];

    function createNumberGrid() {
        const grid = document.getElementById('number-grid');
        for (let i = 1; i <= 100; i++) {
            if (!invalidNumbers.includes(i.toString())) {
                const numberDiv = document.createElement('div');
                numberDiv.classList.add('number');
                numberDiv.textContent = i;
                numberDiv.addEventListener('click', () => openModal(i));
                grid.appendChild(numberDiv);
            }
        }
    }

    function openModal(number) {
        const modal = document.getElementById('modal');
        const selectedNumberSpan = document.getElementById('selected-number');
        const reservationForm = document.getElementById('reservation-form');

        selectedNumberSpan.textContent = number;
        modal.style.display = 'block';

        reservationForm.onsubmit = function(event) {
            event.preventDefault();
            reserveNumber(number);
            modal.style.display = 'none';
        };
    }

    function reserveNumber(number) {
        const name = document.getElementById('name').value;
        const surname = document.getElementById('surname').value;

        if (!reservedNumbers.includes(number)) {
            reservedNumbers.push(number);
            const numberDivs = document.querySelectorAll('.number');
            numberDivs.forEach(div => {
                if (parseInt(div.textContent) === number) {
                    div.classList.add('reserved');
                    div.textContent += ` - ${name} ${surname}`;
                }
            });
        }
    }

    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close');

    closeButton.onclick = function() {
        modal.style.display = 'none';
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    };

    createNumberGrid();
});
