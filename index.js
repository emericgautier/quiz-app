class Question {
  constructor(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
  }
  // function pour savoir si l'utilisateur à bien répondu, en paramètre prendra en compte son choix
  // si true, on fait score + 1, avance qd m à la question suivante
  isCorrectAnswer(choice) {
    return choice === this.answer;
  }
}

const questions = [
  new Question(
    "Quelle méthode Javascript permet de filtrer les éléments d'un tableau",
    ["indexOf()", "map()", "filter()", "reduce()"],
    "filter()"
  ),
  new Question(
    "Quelle méthode Javascript permet de vérifier si un élément figure dans un tableau",
    ["isNaN()", "includes()", "findIndex()", "isOdd()"],
    "includes()"
  ),
  new Question(
    "Quelle méthode transforme du JSON en un objet Javascript ?",
    ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.toJS"],
    "JSON.parse()"
  ),
  new Question(
    "Quel objet Javascript permet d'arrondir à l'entier le plus proche",
    ["Math.ceil()", "Math.floor()", "Math.round()", "Math.random()"],
    "Math.round()"
  ),
];

// class Quiz => données
// prend dans le constructor toutes les questions,  un score ++ en cas de bonne réponse, et à quelle index on est, ex: index 0 = 1ère question (on est dans un tableau, donc index 0 1 2 3)
class Quiz {
  constructor(questions) {
    this.score = 0;
    this.questions = questions;
    this.currentQuestionIndex = 0;
  }
  // methode => pour savoir sur quelle qestion on est
  // quand on jouera cette methode, retourne la question on est cencée être
  // this.question on est à l'entrée du tableau de 4 élèments, ex: [3] dernière quest dynamiquement [this.currentQuestionIndex]
  getCurrentQuestion() {
    return this.questions[this.currentQuestionIndex];
  }
  // methode pour le choix de notre utilisateur, en paramètre la réponse sur laquelle aura cliqué le user
  guess(answer) {
    if (this.getCurrentQuestion().isCorrectAnswer(answer)) {
      this.score++;
    }
    this.currentQuestionIndex++;
  }
  hasEnded() {
    return this.currentQuestionIndex >= this.questions.length;
  }
}

// Quiz display
const display = {
  elementShown: function (id, text) {
    let element = document.getElementById(id);
    element.innerHTML = text;
  },
  // "question" is an ID
  // montre-moi getCurrentQuestion() nous amène a l'index 0, 1.. et .text c'est this.text (la question dans le tableau)
  question: function () {
    this.elementShown("question", quiz.getCurrentQuestion().text);
  },
  // on se réccupère les tableaux
  choices: function () {
    let choices = quiz.getCurrentQuestion().choices;

    guessHandler = (id, guess) => {
      document.getElementById(id).onclick = function () {
        quiz.guess(guess);
        quizApp();
      };
    };
    // Affichage choix + prise en compte du choix
    // choices[i] est la réponse choisit par l'user
    for (let i = 0; i < choices.length; i++) {
      this.elementShown("choice" + i, choices[i]);
      guessHandler("guess" + i, choices[i]);
    }
  },
  progress: function () {
    this.elementShown(
      "progress",
      `Question ${quiz.currentQuestionIndex + 1} sur ${quiz.questions.length}`
    );
  },
  endQuiz: function () {
    let endQuizHTML = `
      <h1>Quiz terminé !</h1>
      <h3>Votre score est de : ${quiz.score} / ${quiz.questions.length}</h3>
    `;
    this.elementShown("quiz", endQuizHTML);
  },
};

// Game Logic
quizApp = () => {
  if (quiz.hasEnded()) {
    // Ecran de fin
    display.endQuiz();
  } else {
    // Afficher questions, choix, progression
    display.question();
    display.choices();
    display.progress();
  }
};

// Create Quiz
let quiz = new Quiz(questions);
quizApp();
