document.addEventListener('DOMContentLoaded', () => {

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

    // Створення елементів
    const startScreen = document.querySelector('#start-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const resultScreen = document.querySelector('#result-screen');
    const startBtn = document.querySelector('#start-btn');
    const restartBtn = document.querySelector('#restart-btn');
    const resultText = document.querySelector('.result-text');
    const questionText = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');

    let questionIndex = 0;
    let score = 0;
    let timer = 15; // Таймер на 15 секунд
    const timerDisplay = document.querySelector('#timer');
    let interval; // Змінна для зберігання інтервалу

    // Функція для відображення запитання
    function showQuestion(question) {

        clearInterval(interval); // Скидаємо таймер
        startTimer();

        answersContainer.innerHTML = '';
        questionText.innerText = question.question;
        for (let i = 0; i < question.answers.length; i++) {
            const button = document.createElement('button');
            button.innerText = question.answers[i];
            button.classList.add('answer-btn');
            button.addEventListener('click', () => checkAnswer(button, i));
            answersContainer.appendChild(button);

        }
    }
    showQuestion(questions[questionIndex]);
    // Завдання 5 - Функція для переходу до наступного запитання
    function nextQuestion() {
        questionIndex++;
        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResult();
        }
    }
    // Завдання 4 - Перевірка відповіді
    function checkAnswer(button, i) {
        if (i == questions[questionIndex].correct) {
            score++;
            button.classList.add('correct');
        } else {
            button.classList.add('wrong');
        }
        // Відключення кнопок після вибору відповіді
        document.querySelectorAll('.answer-btn').forEach(btn => {
            btn.disabled = true;
        })
        // Таймер на 1 секунду
        setTimeout(nextQuestion, 1000);
    }


    // Завдання 7 - Відображення результату і статистики
    function showResult() {
        const accuracy = Math.round((score / questions.length) * 100);
        resultText.innerText = `Твій результат: ${score}/${questions.length} (${accuracy}%)`;
        quizScreen.classList.add('hide');
        resultScreen.classList.remove('hide');
        const finalScore = document.querySelector('#final-score');
        finalScore.innerText = score;
    }
    // Завдання 3 - Керування екранами (JS)
    function startGame() {
        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');
        questionIndex = 0;
        score = 0;
        showQuestion(questions[questionIndex]);
    }

    startBtn.addEventListener('click', startGame);


    // Завдання 6 - Таймер
    function startTimer() {
        timer = 15;
        timerDisplay.innerText = `Час: ${timer}`;
        interval = setInterval(() => {
            timer--;
            timerDisplay.innerText = `Час: ${timer}`;
            if (timer <= 0) {
                clearInterval(interval);
                nextQuestion();
            }
        }, 1000);
    }

    restartBtn.addEventListener('click', () => {
        startGame();
        resultScreen.classList.add('hide');
    });

});
