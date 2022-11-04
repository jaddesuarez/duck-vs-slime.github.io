window.onload = () => {
    document.querySelector('#start-button').onclick = () => {
        startGame();
    };

    function startGame() {
        app.init()
    }
};