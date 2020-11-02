app = {
        currentWord: "",
        currentResult: [""],
        propositions: "",
        words: ["Beau", "Boxe", "Brun", "Cerf", "Chez", "Cire", "Dame", "Dent", "Dune", "Emeu", "Fado", "Faux", "Ibis", "Jazz", "Kaki", "Logo", "Lynx", "Mine", "Ours", "Pion", "Rhum", "Ride", "Rock", "Seau", "Test", "Thym", "User", "Vert", "Yogi", "Watt", "Aimer", "Assez", "Avion", "Awalé", "Balai", "Banjo", "Barbe", "Bonne", "Bruit", "Buche", "Cache", "Capot", "Carte", "Chien", "Crâne", "Cycle", "Essai", "Gifle", "Honni", "Jambe", "Koala", "Livre", "Lourd", "Maman", "Moult", "Noeud", "Ortie", "Poire", "Pomme", "Poste", "Prune", "Radar", "Radis", "Robot", "Route", "Rugby", "Seuil", "Taupe", "Tenue", "Texte", "Tyran", "Usuel", "Valse", "Acajou", "Agneau", "Alarme", "Ananas", "Angora", "Animal", "Arcade", "Aviron", "Azimut", "Babine", "Balade", "Basson", "Billet", "Bouche", "Boucle", "Bronze", "Cabane", "Cloche", "Cirage", "Coccyx", "Crayon", "Garage", "Gospel", "Goulot", "Gramme", "Grelot", "Guenon", "Hochet", "Hormis", "Humour", "Hurler", "Jargon", "Limite", "Lionne", "Menthe", "Oiseau", "Podium", "Poulpe", "Poumon", "Puzzle", "Quartz", "Rapide", "Tomate", "Walabi", "Whisky", "Zipper", "Abriter", "Ballast", "Baryton", "Bassine", "Batavia", "Billard", "Bretzel", "Cithare", "Chariot", "Clairon", "Corbeau", "Crapaud", "Cymbale", "Dentier", "Drapeau", "Exemple", "Fourmis", "Grandir", "Iceberg", "Javelot", "Jockey", "Journal", "Jouxter", "Losange", "Macadam", "Mondial", "Notable", "Panique", "Pétrole", "Poterie", "Pouvoir", "Scooter", "Senteur", "Sifflet", "Spirale", "Sucette", "Strophe", "Tonneau", "Trousse", "Tunique", "Vautour", "Zozoter", "Aquarium", "Archipel", "Banquise", "Batterie", "Brocante", "Brouhaha", "Capeline", "Clavecin", "Cloporte", "Diapason", "Gangster", "Gothique", "Hautbois", "Logiciel", "Objectif", "Parcours", "Pastiche", "Question", "Quetsche", "Scorpion", "Tabouret", "Tomahawk", "Toujours", "Tourisme", "Triangle", "Utopique", "Zeppelin", "Ascenseur", "Ascension", "Aseptiser", "Autoroute", "Avalanche", "Bilboquet", "Bourricot", "Brillance", "Cabriolet", "Contrario", "Cornemuse", "Dangereux", "Forteresse", "Gondolier", "Graphique", "Horoscope", "Intrépide", "Klaxonner", "Mascarade", "Narrateur", "Populaire", "Printemps", "Tambourin", "Vestiaire", "Xylophone", "Acrostiche", "Apocalypse", "Attraction", "Aventurier", "Bouillotte", "Citrouille", "Controverse", "Coquelicot", "Dissimuler", "Flibustier", "Grenouille", "Impossible", "Labyrinthe", "Maharadjah", "Prudemment", "Quadriceps", "Soliloquer", "Subjective"],
        hangingStep :null,
        /**
         * Renvoie un mot alétoire du tableau
         */
        getRandomWord: () => {
            return app.words[Math.round(Math.random() * app.words.length)];
        },

        /**
         * Construit le clavier de saisie des lettres du tableau
         */
        buildKeys: () => {

            const alphabet = "abcdefghijklmnopqrstuvwxyz";
            const keyboard = document.querySelector("#keyboard");

            for (let i = 0; i < alphabet.length; i++) {
                const button = document.createElement("button");
                button.type = "button";
                button.textContent = alphabet[i].toUpperCase();
                button.className = "word_letter btn bg-primary text-light";
                button.addEventListener("click", app.checkLetter);
                keyboard.appendChild(button);
            }

        },

        deleteKeys: (letter) => {
            console.log(letter);
            letter.parentNode.removeChild(letter);
        },

        checkLetter: (event) => {

            let currentLength = 0;
            const cutWord = app.currentWord.split(event.target.innerHTML);
            console.log("avant if :",cutWord.length);
            if (cutWord.length === 1) {
                app.hangingStep++;
                app.displayHangman();
            }
            //console.log("index :", index ,"cutword",cutWord );
            app.propositions += event.target.textContent;

            // cas ou la lettre est présente 3 fois ou plus pose souci
            for (let i = 0; i < cutWord.length - 1; i++) {
                //console.log("index :", index, "cutword", cutWord);

                currentLength = currentLength + cutWord[i].length + 1
                console.log(currentLength);
                app.currentResult[currentLength - 1] = app.currentWord[currentLength - 1];
            }
            app.deleteKeys(event.target);
            app.displayBoard();

            //if { app.hangingStep}
        },

        displayHangman : () => {
            const hangmanPicture = document.querySelector(".hangManPictures");

            hangmanPicture.style.backgroundImage =`url(../images/pendu${app.hangingStep}.png)`;
            hangmanPicture.style.visibility = "visible";
            //hangmanPicture.style.border = "solid 1px black";
            console.log("img :", hangmanPicture);
            
        },

        /**
         * Initialise l'affichage du mot mystère
         */
        initBoard: () => {
            console.log("InitBoard")
            app.currentResult[0] = app.currentWord[0];
            for (let i = 1; i < app.currentWord.length - 1; i++) {
                console.log("for", i, app.currentResult);
                app.currentResult[i] = "_";
            }
            app.currentResult[app.currentWord.length - 1] = app.currentWord[app.currentWord.length - 1];
            app.displayBoard();
        },

        /**
         * Affiche le resultat actuel
         */
        displayBoard: () => {
            console.log("displayBoard", "result:", app.currentResult, "word:", app.currentWord);
            let board = document.querySelector("#word");
            board.innerHTML = "";

            for (let i = 0; i < app.currentResult.length; i++) {
                let divLetter = document.createElement("div");
                divLetter.textContent = app.currentResult[i];
                divLetter.className = "btn btn-light ";
                board.appendChild(divLetter);
            }
        },

        /**
         * Initialise le jeu
         */
        init: () => {
            app.buildKeys();
            app.currentWord = app.getRandomWord().toUpperCase();
            console.log("Mot mystère :", app.currentWord)
            app.initBoard();
            app.hangingStep = 0;
        }
    },

    document.addEventListener("DOMContentLoaded", app.init());

/* let chuckFact = document.getElementById("word");
let word = "";
let currentWord = "";

let buttons = document.querySelectorAll("button");



// function checkLetter(id) {
//     if (word.indexOf(id.toLowerCase())) {
//         currentWord[word.indexOf(id.toLowerCase())] = id;
//     }
//     console.log("click");
// }

// Fonction qui affiche le mot avec les trous
function renderHoles() {
    hiddenWord = word[0];
    let i = 1;
    while (i < word.length - 1) {

        if (currentWord[i] == word[i]) {
            hiddenWord += word[i];
            console.log("same");
        } else {
            hiddenWord += " _";
        }
        i++;
    }
    if (hiddenWord[hiddenWord.length - 1] == "_") {
        hiddenWord += " " + word[word.length - 1];
    } else {
        hiddenWord += word[word.length - 1];
    }
    chuckFact.innerHTML = hiddenWord.toUpperCase();
};



// Appel API pour mot aleatoire
$.get("https://random-word-api.herokuapp.com/word?number=1", function (data) {
    console.log(data);
    word = data[0];
    currentWord = data[0][0];
    while (currentWord.length < word.length - 1) {
        currentWord += "_";
    }
    currentWord += word[word.length - 1];
    renderHoles();
});



console.log(buttons);

// Attacher un eventlistener aux boutons
buttons.forEach(element => {
    element.addEventListener('click', () => {
        let cutword = word.split(element.id[1].toLowerCase());
        console.log(cutword);
        if (cutword.length > 1) {
            let newCurrentWord = currentWord.substring(0, cutword[0].length) + element.id[1].toLowerCase();
            console.log(newCurrentWord + " " + newCurrentWord.length);
            for (let i = 1; i < cutword.length - 1; i++) {
                newCurrentWord += currentWord.substring(newCurrentWord.length, newCurrentWord.length + cutword[i].length) + element.id[1].toLowerCase();
                console.log(newCurrentWord + " " + newCurrentWord.length);
            }
            newCurrentWord += currentWord.substring(newCurrentWord.length)
            console.log(currentWord + " " + currentWord.length);
            console.log(newCurrentWord + " " + newCurrentWord.length);
            currentWord = newCurrentWord;
            renderHoles();
        }
        console.log("click");
    });
}); */