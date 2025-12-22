
document.addEventListener('DOMContentLoaded', () => {

    // 1. БАЗА ДАНИХ (Масив об'єктів)
    // Виконано завдання: Створи власну базу запитань
    const questions = [
        {
            question: "Як оголосити змінну, яку не можна змінювати?",
            answers: ["let", "var", "const", "fixed"],
            correct: 2
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

    // Виконано завдання: Створи змінні для роботи
    const questionTitle = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');

    let questionIndex = 0;
    let score = 0;

    // Виконано завдання: Перевірка відповіді
    function checkAnswer(question, answerIndex) {
        if (answerIndex === question.correct) {
            score = score + 1;
            console.log("Правильно!");
        } else {
            console.log("Помилка!");
        }
        showQuestion(questions[questionIndex + 1]);
        questionIndex++;
    }

    // Виконано завдання: Відображення запитання
    function showQuestion(question) {
        // Очищаємо контейнер
        answersContainer.innerHTML = '';
        // Міняємо заголовок
        questionTitle.innerText = question.question;

        // Цикл по відповідях
        for (let i = 0; i < question.answers.length; i++) {
            const button = document.createElement('button');
            button.innerText = question.answers[i];
            button.classList.add('answer-btn');
            // Додаємо слухач події (клік)
            button.addEventListener('click', () => {
                checkAnswer(question, i);
            });
            answersContainer.appendChild(button);
        }
    }
    // Запуск першого запитання
    showQuestion(questions[0]);
});
