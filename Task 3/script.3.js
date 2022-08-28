function useRequest(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
        if (xhr.status !=200) {
            console.log('Статус ответа: ', xhr.status);
        }else {
            const result = JSON.parse(xhr.response);
            if (callback) {
                callback(result);
            }
        }
    };

    xhr.onerror = function() {
        console.log('Ошибка! Статус ответа: ', xhr.status);
    };

    xhr.send();
}

const resultNode = document.querySelector('.output');

const btnNode = document.querySelector('.btn');

function displayResult(apiData) {
    let cards = '';

    apiData.forEach(item => {
        const cardBlock = `
            <div class="card">
                <img class="card-image" src="${item.download_url}"/>
            </div>`;
        cards += cardBlock; 
    });

    resultNode.innerHTML = cards;
}

const inputValue = document.querySelector('.input');

btnNode.addEventListener('click', () => {
    const value = +inputValue.value;
    if (Number.isInteger(value)) {
        if (value < 1 || value > 10){
            resultNode.innerHTML = "<p> Число вне диапазона от 1 до 10.</p>";
        } else {
            useRequest(`https://picsum.photos/v2/list/?limit=${value}`, displayResult);
        }
    }else {
        resultNode.innerHTML = "<p>Введено не целое число.</p>";
    }
})

