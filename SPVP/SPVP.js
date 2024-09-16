$(document).ready(function() {
    let curr = "";
    let txt = "X";
    let count1 = 0, count2 = 0, count3 = 0, count4 = 0, count5 = 0, count6 = 0, count7 = 0, count8 = 0, count9 = 0;

    let fin = [];
    let tie = "";

    const arr = [".inner1", ".inner2", ".inner3", ".inner4", ".inner5", ".inner6", ".inner7", ".inner8", ".inner9"];

    $("#dice").click(() => {
        
        $("#dice").slideUp();

        $("#p1, #p2").slideDown();
    });

    $("#p1").click(() => {
        $(tie).empty();
        $(tie).addClass("X").removeClass("disabled").addClass("finished").css("border", "2px solid rgb(127, 221, 255)").css("border-radius", "20px");
        $(tie).parent().css("border", "1px solid rgb(127, 221, 255)").css("border-radius", "20px");
        $(tie).text("X");
        fin.push(tie);
        txt = (txt === "O") ? "X" : "O";
        $("h1").text((txt === "X") ? "Player 1" : "Player 2");
        tie = "";
        finishedSquare()
        $("#p1, #p2").slideUp();
    });

    $("#p2").click(() => {
        $(tie).empty();
        $(tie).addClass("O").removeClass("disabled").addClass("finished").css("border", "2px solid rgb(255, 127, 170)").css("border-radius", "20px");
        $(tie).text("O");
        $(tie).parent().css("border", "1px solid rgb(255, 127, 170)").css("border-radius", "20px");
        fin.push(tie);
        txt = (txt === "O") ? "X" : "O";
        $("h1").text((txt === "X") ? "Player 1" : "Player 2");
        tie = "";
        finishedSquare()
        $("#p1, #p2").slideUp();
    });

    $("#reset").click(() => {
        $("#X").removeClass("picked1");
        $("#O").removeClass("picked2");

        $("#reset").addClass("reset");

        setTimeout(function() {
            $("#reset").removeClass("reset");
        }, 100);

        txt = ""; 

        resetGame();
    });

    // Function to handle hover events
    function handleHover(bordClass, innerClass) {
        let exclud = [...fin];
        let newArr = arr.filter(item => !exclud.includes(item));

       
         
        $(bordClass).hover(
            function() {
                setTimeout(() => {
                    let newArr = arr.filter(item => !fin.includes(item));
                }, 10); // Adding a small delay might help with async timing
        
                // If the bord element's parent is disabled or the bord element itself is marked, do nothing
                if ($(this).parent().hasClass("disabled") || $(this).hasClass("X") || $(this).hasClass("O")) {
                    return;
                }
        
                // Apply 'possible' class to relevant inner elements
                $(innerClass).each(function() {
                    // Only apply 'possible' class to non-finished elements
                    if (!$(this).hasClass("finished")) {
                        $(this).addClass("possible");
                        $(this).parent().addClass("possible");
                        $(this).find("div").addClass("possible");
                    } else {
                        newArr.forEach(item => {
                            if (!$(item).hasClass("finished")) {
                                $(item).addClass("possible");
                                $(item).parent().addClass("possible");
                                $(item).find("div").addClass("possible");
                            }
                        });
                    }
                });
            },

            function() {
                // If the bord element's parent is disabled, do nothing
                if ($(this).parent().hasClass("disabled")) {
                    return;
                }
        
                // Remove 'possible' class from all inner elements
                $(innerClass).each(function() {
                    $(this).removeClass("possible");
                    $(this).parent().removeClass("possible");
                    $(this).find("div").removeClass("possible");
                });
        
                // Remove 'possible' class from newArr elements
                newArr.forEach(item => {
                    $(item).removeClass("possible");
                    $(item).parent().removeClass("possible");
                    $(item).find("div").removeClass("possible");
                });
            }
        );
        
    }
    
    // Attach hover events to each .bord-* and corresponding .inner* element
    for (let i = 1; i <= 9; i++) {
        const bordClass = `.bord-${i}`;
        const innerClass = `.inner${i}`;

        // Handle hover for each element
        handleHover(bordClass, innerClass);
        
        $(bordClass).on("click", function() {
            $(innerClass).removeClass("possible");
            $(innerClass).parent().removeClass("possible");
            $(innerClass).find("div").removeClass("possible");
        });
    }
    
    

    function resetGame() {
        location.reload();
    }

    function disabler(newValue){
        
        if($(newValue).hasClass("bordersB")){
            $("#reset").slideDown();
            $(".dis").css("display", "grid");

            let check = "." + $(newValue).find("div").attr("class").split(" ")[0];
            switch (check){
                case ".inner1": count1++; break;
                case ".inner2": count2++; break;
                case ".inner3": count3++; break;
                case ".inner4": count4++; break;
                case ".inner5": count5++; break;
                case ".inner6": count6++; break;
                case ".inner7": count7++; break;
                case ".inner8": count8++; break;
                case ".inner9": count9++; break;
            }
            console.log("MI BOMBO1");
    
            let valuesToFilter = [check, ...fin];
    
            let newArr = arr.filter(item => !valuesToFilter.includes(item));
    
            for(let i = 0; i < 9; i++){
                $(newArr[i]).addClass("disabled").css("border", "2px solid red");
                $(newArr[i]).find("div").addClass("disabled").css("border", "2px solid red");
            }
    
            $(check).addClass("selected").css("border", "2px solid green");
    
        } else if(!$(newValue).hasClass("finished")){
            console.log("MI BOMBO2");
            
            let valuesToFilter = [newValue, ...fin];
    
            let newArr = arr.filter(item => !valuesToFilter.includes(item));
    
            for(let i = 0; i < 9; i++){
                $(newArr[i]).addClass("disabled").css("border", "2px solid red");
                $(newArr[i]).find("div").addClass("disabled").css("border", "2px solid red");
            }
    
            $(newValue).removeClass("disabled").addClass("selected").css("border", "2px solid green");
            $(newValue).find("div").removeClass("disabled").addClass("selected").css("border", "2px solid green");
    
        } else {
            console.log("Selected box is finished");
            // Special case: keep the current box enabled and disable all others
            let currentBox = newValue;
    
            let newArr = arr.filter(item => item !== currentBox);
            
            for(let i = 0; i < 9; i++){
                $(newArr[i]).addClass("disabled").css("border", "2px solid red");
                $(newArr[i]).find("div").addClass("disabled").css("border", "2px solid red");
            }
    
            // Keep the current box enabled
            $(currentBox).removeClass("disabled").addClass("selected").css("border", "2px solid green");
            $(currentBox).find("div").removeClass("disabled").addClass("selected").css("border", "2px solid green");
        }
    }
    
    function disableAll(){
        let valuesToFilter = [...fin];

        let newArr = arr.filter(item => !valuesToFilter.includes(item));
        for(let i = 0; i < 9; i++){
            $(newArr[i]).removeClass("selected").addClass("disabled").css("border", "2px solid red");
            $(newArr[i]).find("div").removeClass("selected").addClass("disabled").css("border", "2px solid red");
        }
    }

    function finishedSquare(){
        let valuesToFilter = [...fin];

        let newArr = arr.filter(item => !valuesToFilter.includes(item));
        for(let i = 0; i < 9; i++){
            $(newArr[i]).removeClass("disabled").addClass("selected").css("border", "2px solid green");
            $(newArr[i]).find("div").removeClass("disabled").addClass("selected").css("border", "2px solid green");
        }
    }

    function checkWin(player, inner) {
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
    
        // Select only the cells within the given parent square
        var cells = $(inner).find(".borders");
    
        for (var i = 0; i < winningPatterns.length; i++) {
            var pattern = winningPatterns[i];
    
            if (pattern.every(function (cell) {
                return cells.filter("." + cell).hasClass(player);
            })) {
                return true; // Return true if a winning pattern is found
            }
        }
        return false; // Return false if no winning pattern is found
    }

    function checkBigWin(player) {
        var winningPatterns = [
            ["inner1", "inner2", "inner3"],
            ["inner4", "inner5", "inner6"],
            ["inner7", "inner8", "inner9"],
            ["inner1", "inner4", "inner7"],
            ["inner2", "inner5", "inner8"],
            ["inner3", "inner6", "inner9"],
            ["inner1", "inner5", "inner9"],
            ["inner7", "inner5", "inner3"]
        ];
    
        for (var i = 0; i < winningPatterns.length; i++) {
            var pattern = winningPatterns[i];
    
            // Check if all cells in the current pattern have the player class
            var isWinningPattern = pattern.every(function (cell) {
                var hasClass = $("." + cell).hasClass(player);
                return hasClass;
            });
    
            if (isWinningPattern) {
                return true; // Return true if a winning pattern is found
            }
        }
    
        return false; // Return false if no winning pattern is found
    }
    
    
    
    function getCountForInner(innerClass) {
        // Define a mapping of inner classes to count variables
        const counts = {
            '.inner1': count1,
            '.inner2': count2,
            '.inner3': count3,
            '.inner4': count4,
            '.inner5': count5,
            '.inner6': count6,
            '.inner7': count7,
            '.inner8': count8,
            '.inner9': count9
        };

        // Get the count variable name
        const countVarName = counts[innerClass];

        // Return the value of the corresponding count variable if it exists
        if (countVarName) {
            return countVarName;
        } else {
            console.error('Invalid inner class:', innerClass);
            return 0;
        }
    }
    

    $(".borders, .bordersB").on("click", function(e) {
        e.stopPropagation();

        if (curr == "") {
            // If the clicked box is an outer box (not inner)
            if (!$(this).hasClass("inn")) {
                curr = $(this);
                disabler(this);
            }

        } else {

            if ($(this).hasClass("inn")) {
                console.log("Clicked inner box class: ", $(this).attr('class'));

                // Check if the box doesn't already have an "X" or "O"
                if (!$(this).hasClass("X") && !$(this).hasClass("O") && 
                    !$(this).hasClass("disabled") && !$(this).hasClass("finished")) {
                        
                    let val = "." + ($(this).parent().attr("class")).split(" ")[0];

                    if (txt === "O") {
                        $(this).addClass("O");
                        $(this).text("O");
                    } else {
                        $(this).addClass("X");
                        $(this).text("X");
                    }

                    let count = getCountForInner(val);

                    if(count == 9){
                        tie = val;
                        disableAll();
                        $("#dice").slideDown();
                        return;
                    }
                    
                    
                    txt = (txt === "O") ? "X" : "O";
                    $("h1").text((txt === "X") ? "Player 1" : "Player 2");

                    if(checkWin("X", val)){
                        $(val).empty();
                        $(val).addClass("X").removeClass("disabled").addClass("finished").css("border", "2px solid rgb(127, 221, 255)").css("border-radius", "20px");
                        $(val).parent().css("border", "1px solid rgb(127, 221, 255)").css("border-radius", "20px");
                        $(val).text("X");
                        fin.push(val);

                        
                        finishedSquare();
                        if (checkBigWin("X")) {
                            // Disable all click events on the document
                            disableAll();
                            $("h1").text("PLAYER 1 WINS");
                            // Enable click events only on the button with class "reset"
                            $(".reset").css("pointer-events", "auto");
                            return;
                            
                        } else if (checkBigWin("O")) {
                            // Disable all click events on the document
                            disableAll();
                            $("h1").text("PLAYER 2 WINS");
                            // Enable click events only on the button with class "reset"
                            $(".reset").css("pointer-events", "auto");
                            return;
                        }
                        return;

                    }else if(checkWin("O", val)){
                        $(val).empty();
                        $(val).addClass("O").removeClass("disabled").addClass("finished").css("border", "2px solid rgb(255, 127, 170)").css("border-radius", "20px");
                        $(val).text("O");
                        $(val).parent().css("border", "1px solid rgb(255, 127, 170)").css("border-radius", "20px");
                        fin.push(val);
                        console.log("finished");
                        finishedSquare();
                        if (checkBigWin("X")) {
                            // Disable all click events on the document
                            disableAll();
                            $("h1").text("PLAYER 1 WINS");
                            // Enable click events only on the button with class "reset"
                            $(".reset").css("pointer-events", "auto");
                            return;
                            
                        } else if (checkBigWin("O")) {
                            // Disable all click events on the document
                            disableAll();
                            $("h1").text("PLAYER 2 WINS");
                            // Enable click events only on the button with class "reset"
                            $(".reset").css("pointer-events", "auto");
                            return;
                        }
                        return;
                    }

                    
                    

                    var temp = "." + $(this).parent().attr("class").split(" ")[0];

                    if ($(this).hasClass("bord-1")) {
                        if(count1 != 9 && !$(".inner1").hasClass("finished")){
                            count1 += 1;
                            disabler(".inner1");
                        }else{
                            finishedSquare();
                        }

                    } else if ($(this).hasClass("bord-2")) {
                        count2++;
                        if(count2 != 8 && !$(".inner2").hasClass("finished")){
                            disabler(".inner2");
                        }else{
                            finishedSquare();
                        }

                    } else if ($(this).hasClass("bord-3")) {
                        count3++;
                        if(count3 != 8 && !$(".inner3").hasClass("finished")){
                            disabler(".inner3");
                        }else{
                            finishedSquare();
                        }

                    } else if ($(this).hasClass("bord-4")) {
                        count4++;
                        if(count4 != 8 && !$(".inner4").hasClass("finished")){
                            disabler(".inner4");
                        }else{
                            finishedSquare();
                        }

                    } else if ($(this).hasClass("bord-5")) {
                        count5++;
                        if(count5 != 8 && !$(".inner5").hasClass("finished")){
                            disabler(".inner5");
                        }else{
                            finishedSquare();
                        }

                    } else if ($(this).hasClass("bord-6")) {
                        count6++;
                        if(count6 != 8 && !$(".inner6").hasClass("finished")){
                            disabler(".inner6");
                        }else{
                            finishedSquare();
                        }

                    } else if ($(this).hasClass("bord-7")) {
                        count7++;
                        if(count7 != 8 && !$(".inner7").hasClass("finished")){
                            disabler(".inner7");
                        }else{
                            finishedSquare();
                        }

                    } else if ($(this).hasClass("bord-8")) {
                        count8++;
                        if(count8 != 8 && !$(".inner8").hasClass("finished")){
                            disabler(".inner8");
                        }else{
                            finishedSquare();
                        }

                    } else if ($(this).hasClass("bord-9")) {
                        count9++;
                        if(count9 != 8 && !$(".inner9").hasClass("finished")){
                            disabler(".inner9");
                        }else{
                            finishedSquare();
                        }

                    }
                }
            } 
        }
    });
});
