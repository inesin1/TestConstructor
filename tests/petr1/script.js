//Ключи вопросов
let questionKeys = {
    0: 1,
    1: 1,
    2: 5,
    3: 5,
    4: 1,
    5: 3,
    6: 5,
    7: 3,
    8: 1,
    9: 3,
    10: 5,
    11: 3,
    12: 1,
    13: 5,
    14: 1,
    15: 3,
    16: 1,
    17: 5,
    18: 1,
    19: 3
}

//Ответы
let answers = [];

//Блоки вариантов ответов
let options = document.querySelectorAll('.options');

//Блок результатов
let results = document.querySelector('footer');

//Массив ответов в html
let resultList = document.querySelector('.result_list').childNodes;

//Итого
let total = document.querySelector('.total');

//Проверка ответа
function checkAnswer(sender, question, answer) {
    //Вариант с правильным ответом
    var correctAnswer = sender.parentNode.childNodes[questionKeys[question]];

    //Убираем класс 'Не отвечено' со всех варинтов в блоке
    sender.parentNode.childNodes.forEach((item, index, array) => {
        if (item.nodeName != '#text') {
            item.classList.remove('not_answered');
        }
    });

    //Если ответ верный
    if (sender == correctAnswer) {
        sender.classList.add('correct');

        sender.parentNode.childNodes.forEach((item, index, array) => {
            if (item.nodeName != '#text' && item != sender) {
                item.classList.add('not_available');
            }
        });

        answers[question] = 'Верно';
    //Если ответ неверный
    } else {
        sender.classList.add('incorrect');
        correctAnswer.classList.add('correct');

        sender.parentNode.childNodes.forEach((item, index, array) => {
            if (item.nodeName != '#text' && item != sender && item != correctAnswer) {
                item.classList.add('not_available');
            }
        });

        answers[question] = 'Неверно';
    }

    //Если ответили на все вопросы
    if (answers.length == 20) {
        results.classList.toggle('hide');
        
        var textCount = 0;
        var correctCount = 0;
        var log = '';
        resultList.forEach((item, index, array) => {
            if (item.nodeName != '#text'){
                if (answers[index - textCount] == 'Верно') {
                    item.innerHTML = index + 1 - textCount + ' - ' + '<span class="green">' + answers[index - textCount] + '</span>';
                    correctCount++;
                }
                else item.innerHTML = index + 1 - textCount + ' - ' + '<span class="red">' + answers[index - textCount] + '</span>';
                
                log += index + 1 - textCount + ':' + answers[index - textCount] + ';';
            }
            else
                textCount++;
        });

        total.innerHTML += '<span class="green">' + correctCount + '</span>' + ' / 20';
 
        results.scrollIntoView(true);
        
        fetch('sendLog.php?log=' + log);
    }
}