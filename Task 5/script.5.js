const btn = document.querySelector('.btn');
const result = document.querySelector('.output');
const inputNumber = document.querySelector('.input-number');
const inputLimit = document.querySelector('.input-limit');

let data = localStorage.getItem('savedInfo');
// inputNumber.value = localStorage.getItem('prevNumber');
// inputLimit.value = localStorage.getItem('prevLimit');

btn.addEventListener('click', (event) => {
    event.preventDefault();
    result.textContent = "";
    let number = inputNumber.value;
    let limit = inputLimit.value;
    if((number < 1 || number > 10) && (limit < 1 || limit > 10)) {
        result.innerHTML = '<p>Номер страницы и лимит вне диапазона от 1 до 10</p>';
    } else if (number < 1 || number > 10) {
        result.innerHTML = '<p>Номер страницы вне диапазона от 1 до 10</p>';
    } else if (limit < 1 || limit > 10) {
        result.innerHTML = '<p>Лимит вне диапазона от 1 до 10</p>'
    } else {
        fetch(`https://picsum.photos/v2/list?page=${number}&limit=${limit}`)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            localStorage.setItem('savedInfo', JSON.stringify(data));
            // localStorage.setItem('prevNumber', number);
            // localStorage.setItem('prevLimit', limit);
            displayResult(data);
        })
        .catch(() => {
            console.log('error')
        });
    }
});

function displayResult(data) {
    let cards = "";
    if (data) {
        data.forEach((item) => {
            const cardBlock = `
            <div class="card">
                <img src="${item.download_url}" class="card-image">
            </div>`;
            cards += cardBlock; 
        });
        result.innerHTML = cards;
    }
}

displayResult(JSON.parse(data));