let txt = "";
let counter = 0;

$("#X").click(() => {
    $("#O").removeClass("picked2");
    $("#X").addClass("picked1");
    txt = "X";
    console.log(txt);
});

$("#O").click(() => {
    $("#X").removeClass("picked1");
    $("#O").addClass("picked2");
    txt = "O";
    console.log(txt);
});

$("#reset").click(() => {
    $("#X").removeClass("picked1");
    $("#O").removeClass("picked2");

    $("#reset").addClass("reset");

    setTimeout(function() {
        $("#reset").removeClass("reset");
    }, 100);

    resetGame();
});

function resetGame() {
    counter = 0;
    txt = "";  // Ensure txt is an empty string
    $(".borders").removeClass("X O disabled");
    $(".borders").text("");
    $("#frame").slideDown();
    $("h1").text("Tic Tac Toe!");

    // Reattach click event handler after resetting
    $(".borders").click(handleBorderClick);
}

function handleBorderClick() {
    console.log(txt);
    if (txt && !$(this).hasClass("X") && !$(this).hasClass("O")) {
        $("#frame").slideUp();
        $(this).addClass(txt);
        $(this).text(txt);

        // Check for win BEFORE switching players
        if (checkwin(txt)) {
            console.log("Winner");
            $("h1").text("Winner is: " + txt);
            $(".borders").addClass("disabled"); // Disable further clicks
            return;
        }

        // Increment counter first to track turns correctly
        counter++;

        // Check for a draw
        if (counter == 9) {
            $("h1").text("DRAW");
            $(".borders").addClass("disabled"); // Disable further clicks
            return;
        }

        // Switch player after the check
        txt = (txt === "O") ? "X" : "O";

        // Update player indicator based on counter
        $("h1").text((counter % 2 === 1) ? "Player 2" : "Player 1");
    }
}

// Function to check if the player has won
function checkwin(player) {
    var winningPatterns = [
        ["bord-1", "bord-2", "bord-3"],
        ["bord-4", "bord-5", "bord-6"],
        ["bord-7", "bord-8", "bord-9"],
        ["bord-1", "bord-4", "bord-7"],
        ["bord-2", "bord-5", "bord-8"],
        ["bord-3", "bord-6", "bord-9"],
        ["bord-1", "bord-5", "bord-9"],
        ["bord-7", "bord-5", "bord-3"]
    ];

    for (var i = 0; i < winningPatterns.length; i++) {
        var pattern = winningPatterns[i];

        if (pattern.every(function (cell) {
            return $("." + cell).hasClass(player);
        })) {
            return true; // Return true if a winning pattern is found
        }
    }

    return false; // Return false if no winning pattern is found
}

// Initialize the click event handler for borders
$(".borders").click(handleBorderClick);
