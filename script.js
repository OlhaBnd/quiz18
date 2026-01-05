// Чекаємо, поки HTML-сторінка повністю завантажиться
// Лише після цього починає працювати JavaScript
document.addEventListener('DOMContentLoaded', () => {

    // Масив із запитаннями для квізу
    // Кожне запитання — це обʼєкт
    const questions = [
        {
            question: "Як оголосити змінну, яку не можна змінювати?",
            answers: ["let", "var", "const", "fixed"],
            correct: 2 // індекс правильної відповіді (const)
        },
        {
            question: "Який метод виводить повідомлення в консоль?",
            answers: ["console.log()", "print()", "alert()", "write()"],
            correct: 0
        },
        {
            question: "Що повертає document.querySelector?",
            answers: ["Масив", "Перший знайдений елемент", "Всі елементи", "Нічого"],
            correct: 1
        },
        {
            question: "Який тип даних є числом в JS?",
            answers: ["String", "Boolean", "Number", "Object"],
            correct: 2
        }
    ];

    // ===== Отримуємо елементи зі сторінки =====

    // Елемент для відображення балів
    const scoreDisplay = document.querySelector('#score-display');

    // Екрани (старт, квіз, результат)
    const startScreen = document.querySelector('#start-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const resultScreen = document.querySelector('#result-screen');

    // Кнопки
    const startBtn = document.querySelector('#start-btn');
    const restartBtn = document.querySelector('#restart-btn');

    // Тексти та контейнери
    const resultText = document.querySelector('.result-text');
    const questionText = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');

    // ===== Змінні для логіки гри =====

    let questionIndex = 0; // номер поточного запитання
    let score = 0;         // кількість правильних відповідей
    let timer = 15;        // час на одне запитання (в секундах)

    const timerDisplay = document.querySelector('#timer');
    let interval;         // змінна для збереження setInterval

    // ===== Функція показу запитання =====
    function showQuestion(question) {

        // Зупиняємо попередній таймер (якщо він був)
        clearInterval(interval);

        // Запускаємо таймер заново
        startTimer();

        // Очищаємо старі кнопки відповідей
        answersContainer.innerHTML = '';

        // Виводимо текст запитання
        questionText.innerText = question.question;

        // Створюємо кнопки для кожної відповіді
        for (let i = 0; i < question.answers.length; i++) {

            const button = document.createElement('button');
            button.innerText = question.answers[i];
            button.classList.add('answer-btn');

            // При кліку перевіряємо відповідь
            button.addEventListener('click', () => checkAnswer(button, i));

            // Додаємо кнопку на сторінку
            answersContainer.appendChild(button);
        }
    }

    // ===== Перехід до наступного запитання =====
    function nextQuestion() {
        questionIndex++; // переходимо до наступного індексу

        if (questionIndex < questions.length) {
            // Якщо запитання ще є — показуємо наступне
            showQuestion(questions[questionIndex]);
        } else {
            // Якщо запитання закінчились — показуємо результат
            showResult();
        }
    }

    // ===== Перевірка відповіді =====
function checkAnswer(button, i) {

    const correctIndex = questions[questionIndex].correct;

    document.querySelectorAll('.answer-btn').forEach((btn, index) => {
        btn.disabled = true;

        if (index === correctIndex) {
            btn.classList.add('correct');
        }
    });

    if (i === correctIndex) {
        score++;
        scoreDisplay.innerText = `Бали: ${score}`;
    } else {
        button.classList.add('wrong');
    }

    setTimeout(nextQuestion, 1200);
}


    // ===== Показ результату =====
    function showResult() {

        // Обчислюємо відсоток правильних відповідей
        const accuracy = Math.round((score / questions.length) * 100);

        // Виводимо результат
        resultText.innerText = `Твій результат: ${score}/${questions.length} (${accuracy}%)`;

        // Ховаємо екран квізу і показуємо екран результату
        quizScreen.classList.add('hide');
        resultScreen.classList.remove('hide');
    }

    // ===== Запуск гри =====
    function startGame() {

        // Ховаємо стартовий і фінальний екрани
        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');

        // Показуємо екран квізу
        quizScreen.classList.remove('hide');

        // Скидаємо дані гри
        questionIndex = 0;
        score = 0;
        scoreDisplay.innerText = 'Бали: 0';

        // Показуємо перше запитання
        showQuestion(questions[questionIndex]);
    }

    // Натискання кнопки "Почати"
    startBtn.addEventListener('click', startGame);

    // ===== Таймер =====
    function startTimer() {

        // Скидаємо таймер
        timer = 15;
        timerDisplay.innerText = `Час: ${timer}`;

        // Запускаємо відлік кожну секунду
        interval = setInterval(() => {
            timer--;
            timerDisplay.innerText = `Час: ${timer}`;

            // Якщо час закінчився — переходимо далі
            if (timer <= 0) {
                clearInterval(interval);
                nextQuestion();
            }
        }, 1000);
    }

    // Кнопка "Спробувати ще"
    restartBtn.addEventListener('click', () => {
        startGame();
        resultScreen.classList.add('hide');
    });

});
