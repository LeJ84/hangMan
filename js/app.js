app = {
        currentWord: "",
        currentResult: [""],
        propositions: "",
        words: ["Beau", "Boxe", "Brun", "Cerf", "Chez", "Cire", "Dame", "Dent", "Dune", "Emeu", "Fado", "Faux", "Ibis", "Jazz", "Kaki", "Logo", "Lynx", "Mine", "Ours", "Pion", "Rhum", "Ride", "Rock", "Seau", "Test", "Thym", "User", "Vert", "Yogi", "Watt", "Aimer", "Assez", "Avion", "Awalé", "Balai", "Banjo", "Barbe", "Bonne", "Bruit", "Buche", "Cache", "Capot", "Carte", "Chien", "Crâne", "Cycle", "Essai", "Gifle", "Honni", "Jambe", "Koala", "Livre", "Lourd", "Maman", "Moult", "Noeud", "Ortie", "Poire", "Pomme", "Poste", "Prune", "Radar", "Radis", "Robot", "Route", "Rugby", "Seuil", "Taupe", "Tenue", "Texte", "Tyran", "Usuel", "Valse", "Acajou", "Agneau", "Alarme", "Ananas", "Angora", "Animal", "Arcade", "Aviron", "Azimut", "Babine", "Balade", "Basson", "Billet", "Bouche", "Boucle", "Bronze", "Cabane", "Cloche", "Cirage", "Coccyx", "Crayon", "Garage", "Gospel", "Goulot", "Gramme", "Grelot", "Guenon", "Hochet", "Hormis", "Humour", "Hurler", "Jargon", "Limite", "Lionne", "Menthe", "Oiseau", "Podium", "Poulpe", "Poumon", "Puzzle", "Quartz", "Rapide", "Tomate", "Walabi", "Whisky", "Zipper", "Abriter", "Ballast", "Baryton", "Bassine", "Batavia", "Billard", "Bretzel", "Cithare", "Chariot", "Clairon", "Corbeau", "Crapaud", "Cymbale", "Dentier", "Drapeau", "Exemple", "Fourmis", "Grandir", "Iceberg", "Javelot", "Jockey", "Journal", "Jouxter", "Losange", "Macadam", "Mondial", "Notable", "Panique", "Pétrole", "Poterie", "Pouvoir", "Scooter", "Senteur", "Sifflet", "Spirale", "Sucette", "Strophe", "Tonneau", "Trousse", "Tunique", "Vautour", "Zozoter", "Aquarium", "Archipel", "Banquise", "Batterie", "Brocante", "Brouhaha", "Capeline", "Clavecin", "Cloporte", "Diapason", "Gangster", "Gothique", "Hautbois", "Logiciel", "Objectif", "Parcours", "Pastiche", "Question", "Quetsche", "Scorpion", "Tabouret", "Tomahawk", "Toujours", "Tourisme", "Triangle", "Utopique", "Zeppelin", "Ascenseur", "Ascension", "Aseptiser", "Autoroute", "Avalanche", "Bilboquet", "Bourricot", "Brillance", "Cabriolet", "Contrario", "Cornemuse", "Dangereux", "Forteresse", "Gondolier", "Graphique", "Horoscope", "Intrépide", "Klaxonner", "Mascarade", "Narrateur", "Populaire", "Printemps", "Tambourin", "Vestiaire", "Xylophone", "Acrostiche", "Apocalypse", "Attraction", "Aventurier", "Bouillotte", "Citrouille", "Controverse", "Coquelicot", "Dissimuler", "Flibustier", "Grenouille", "Impossible", "Labyrinthe", "Maharadjah", "Prudemment", "Quadriceps", "Soliloquer", "Subjective"],
        hangingStep: null,

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
                //button.textContent = alphabet[i].toUpperCase();
                button.textContent = String.fromCharCode(65 + i);
                button.className = "word_letter btn bg-primary text-light";
                button.addEventListener("click", app.checkLetter);
                keyboard.appendChild(button);
            }

        },

        deleteKey: (letter) => {
            console.log(letter);
            letter.parentNode.removeChild(letter);
        },

        checkLetter: (event) => {

            let currentLength = 0;
            const cutWord = app.currentWord.split(event.target.innerHTML);
            console.log("avant if :", cutWord.length);
            if (cutWord.length === 1) {
                app.hangingStep++;
                app.displayHangman();
            }
            //console.log("index :", index ,"cutword",cutWord );
            app.propositions += event.target.textContent;
            console.log(app.propositions);

            for (let i = 0; i < cutWord.length - 1; i++) {
                //console.log("index :", index, "cutword", cutWord);

                currentLength = currentLength + cutWord[i].length + 1
                console.log(currentLength);
                app.currentResult[currentLength - 1] = app.currentWord[currentLength - 1];
            }
            app.deleteKey(event.target);
            app.displayBoard();
            if (app.isGameOver()) window.setTimeout(app.openModale, 200);
        },

        displayHangman: () => {
            const hangmanPicture = document.querySelector(".hangManPictures");

            hangmanPicture.style.backgroundImage = `url(../images/pendu${app.hangingStep}.png)`;
            hangmanPicture.style.visibility = "visible";
            console.log("img :", hangmanPicture);

        },

        resetHangMan: () => {
            console.log("reset hangman")
            const hangmanPicture = document.querySelector(".hangManPictures");
            hangmanPicture.style.visibility = "hidden";
            app.hangingStep = null;
        },

        resetKeys: () => {
            const keyboard = document.querySelector("#keyboard");
            keyboard.innerHTML = "";
        },

        resetValues:() => {
            app.currentResult = [""],
            app.hangingStep = 0,
            app.propositions = ""
        },


        openModale: () => {
            $('#gameOverModal').modal({show:true, backdrop: 'static', keyboard: false});
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
            const replayButton = document.querySelector("#replay");
            replayButton.addEventListener('click', app.replay);
        },

        replay: () => {
            app.reset();
            app.init();
        },

        reset: () => {
            app.resetHangMan();
            app.resetKeys();
            app.resetValues()
        },

        isGameOver: () => {
            const message = document.querySelector(".modal-body");
            if (app.currentResult.join('') == app.currentWord) {
                message.textContent = `Vous avez gagné avec ${app.hangingStep} erreurs`
                return true;
            } else if (app.hangingStep == 11) {
                message.textContent = 'Vous avez perdu !'
                return true;
            } 
            return false;
        }
    },

    document.addEventListener("DOMContentLoaded", app.init());