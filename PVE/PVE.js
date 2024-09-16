$(document).ready(function() {
    let txt = ""; // Player's move, 'X' or 'O'
    let counter = 0; // Move counter

    // Set the current player
    function setPlayer(player) {
        txt = player;
    }

    $("#X").click(() => {
        if (txt === "") {
            $("#O").removeClass("picked");
            $("#X").addClass("picked");
            setPlayer("X");
            console.log(txt);
            $(".borders").off('click').on('click', handleBorderClick);
            $("#X, #O").slideUp(); // Slide up buttons after selection
        }
    });
    
    $("#O").click(() => {
        if (txt === "") {
            $("#X").removeClass("picked");
            $("#O").addClass("picked");
            setPlayer("O");
            console.log(txt);
            $(".borders").off('click').on('click', handleBorderClick);
            $("#X, #O").slideUp(); // Slide up buttons after selection
            $("h1").text("AI Turn");
            disableMouseEvents(); // Disable mouse events during AI move
            setTimeout(aiMove, 500); // Trigger AI move if 'O' is selected
        }
    });
    // Disable mouse events for the game board
    function disableMouseEvents() {
        $(".borders").css("pointer-events", "none");
    }

    // Enable mouse events for the game board
    function enableMouseEvents() {
        $(".borders").css("pointer-events", "auto");
    }

    // Reset the game and re-enable player selection
    $("#reset").click(() => {
        $("#X").removeClass("picked");
        $("#O").removeClass("picked");
        txt = ""; 
        console.log(txt);
        resetGame();
        $("#X, #O").slideDown(); // Allow selection again
    });

    function resetGame() {
        counter = 0;
        txt = "";  // Ensure txt is an empty string
        $(".borders").removeClass("X O disabled");
        $(".borders").text("");
        $("#frame").slideDown();
        $("h1").text("Tic Tac Toe!");

        // Reattach click event handler after resetting
        $(".borders").off('click').on('click', handleBorderClick);
    }

    // Handle player and AI turns
    function play() {
        if (checkwin('X')) {
            $("h1").text("Winner is: Player X");
            $(".borders").addClass("disabled"); // Disable further clicks
            disableMouseEvents(); // Disable mouse events during AI move
            return;
        }

        if (checkwin('O')) {
            $("h1").text("Winner is: PLAYER O");
            $(".borders").addClass("disabled"); // Disable further clicks
            disableMouseEvents(); // Disable mouse events during AI move
            return;
        }

        counter++;

        if (counter === 9) {
            $("h1").text("DRAW");
            return;
        }

        // Switch turn
        txt = (txt === "O") ? "X" : "O";

        // If it's AI's turn after a player move
        if (txt === "O") {
            $("h1").text("AI Turn");
            setTimeout(aiMove, 500); // Delay AI move for realism
        } else {
            $("h1").text("Player 1");
        }
    }

    // AI move logic
    // AI move logic
    function aiMove() {

        let moveMade = false;
        // AI tries to win or block the player
        for (const pattern of winningPatterns) {
            const [a, b, c] = pattern;
            const aElem = $("." + a);
            const bElem = $("." + b);
            const cElem = $("." + c);

            if (aElem.hasClass('O') && bElem.hasClass('O') && !cElem.hasClass('X') && !cElem.hasClass('O')) {
                cElem.addClass('O').text('O');
                moveMade = true;
                break;
            }
            if (aElem.hasClass('O') && cElem.hasClass('O') && !bElem.hasClass('X') && !bElem.hasClass('O')) {
                bElem.addClass('O').text('O');
                moveMade = true;
                break;
            }
            if (bElem.hasClass('O') && cElem.hasClass('O') && !aElem.hasClass('X') && !aElem.hasClass('O')) {
                aElem.addClass('O').text('O');
                moveMade = true;
                break;
            }
        }

        if (!moveMade) {
            // Block the player from winning
            for (const pattern of winningPatterns) {
                const [a, b, c] = pattern;
                const aElem = $("." + a);
                const bElem = $("." + b);
                const cElem = $("." + c);

                if (aElem.hasClass('X') && bElem.hasClass('X') && !cElem.hasClass('X') && !cElem.hasClass('O')) {
                    cElem.addClass('O').text('O');
                    moveMade = true;
                    break;
                }
                if (aElem.hasClass('X') && cElem.hasClass('X') && !bElem.hasClass('X') && !bElem.hasClass('O')) {
                    bElem.addClass('O').text('O');
                    moveMade = true;
                    break;
                }
                if (bElem.hasClass('X') && cElem.hasClass('X') && !aElem.hasClass('X') && !aElem.hasClass('O')) {
                    aElem.addClass('O').text('O');
                    moveMade = true;
                    break;
                }
            }
        }

        // If no winning or blocking move, take a random one
        if (!moveMade) {
            const availableMoves = $(".borders").not('.X').not('.O');
            if (availableMoves.length > 0) {
                const randomMove = availableMoves.eq(Math.floor(Math.random() * availableMoves.length));
                randomMove.addClass('O').text('O');
                moveMade = true;
            }
        }

        play(); // Continue to the next turn

        enableMouseEvents(); // Re-enable mouse events after AI move
    }

    // Winning patterns
    const winningPatterns = [
        ["bord-1", "bord-2", "bord-3"],
        ["bord-4", "bord-5", "bord-6"],
        ["bord-7", "bord-8", "bord-9"],
        ["bord-1", "bord-4", "bord-7"],
        ["bord-2", "bord-5", "bord-8"],
        ["bord-3", "bord-6", "bord-9"],
        ["bord-1", "bord-5", "bord-9"],
        ["bord-7", "bord-5", "bord-3"]
    ];

    // Handle player move
    function handleBorderClick() {
        if (txt && !$(this).hasClass("X") && !$(this).hasClass("O")) {
            $("#frame").slideUp();
            $(this).addClass(txt).text(txt);
            play(); // Process the player's move
        }
    }

    // Check if a player has won
    function checkwin(player) {
        for (const pattern of winningPatterns) {
            if (pattern.every(cell => $("." + cell).hasClass(player))) {
                return true; // Return true if a winning pattern is found
            }
        }
        return false; // Return false if no winning pattern is found
    }
});
