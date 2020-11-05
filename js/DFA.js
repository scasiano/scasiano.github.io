function charToInt(x){
    switch (x) {
        case 'a': x = 0; break;
        case 'b': x = 1; break;
        case 'c': x = 2; break;
        case 'd': x = 3; break;
        case 'e': x = 4; break;
        case 'f': x = 5; break;
        case 'g': x = 6; break;
        case 'h': x = 7; break;
        case 'i': x = 8; break;
        case 'j': x = 9; break;
        case 'k': x = 10; break;
        case 'l': x = 11; break;
        case 'm': x = 12; break;
        case 'n': x = 13; break;
        case 'o': x = 14; break;
        case 'p': x = 15; break;
        case 'q': x = 16; break;
        case 'r': x = 17; break;
        case 's': x = 18; break;
        case 't': x = 19; break;
        case 'u': x = 20; break;
        case 'v': x = 21; break;
        case 'w': x = 22; break;
        case 'x': x = 23; break;
        case 'y': x = 24; break;
        case 'z': x = 25; break;
        default: x = null; break;
    }
    return x;
}

function isAccept(inputString, startState, acceptState, transition){
    var isAccept = false;
    var column = 0;
    var row = charToInt(startState);
    for (var i = 0; i < inputString.length; i++) {
        column = inputString[i];
        row = charToInt(transition[row][column]);
    }
    for (var i = 0; i < acceptState.length; i++) {
        isAccept = (transition[row][column] === acceptState[i]);
        if (isAccept)
            break;
    }
    return isAccept;
}

function rewriteResult(e){
    var inString = document.getElementById("inputString").value;
    var result = isAccept(inString, startState, acceptState, transition);
    if (result === null){
        document.getElementById("resultLI").textContent = "Please enter a string";
    }
    if (result){
        document.getElementById("resultLI").textContent = "✓ The input string was accepted.";
    }
    if (!result){
        document.getElementById("resultLI").textContent = "X The input string was denied.";
    }
    document.getElementById("inputString").value = "";
    document.getElementById("updateInString").textContent = inString;
    e.preventDefault();
}

function drawDFA(states, startState, acceptState, transition){
    //Define canvas
    statesCanvasUpLocation = [];
    statesCanvasDownLocation = [];
    var DFACanvas = document.getElementById("drawnDFACanvas");
    var canvasDraw = DFACanvas.getContext("2d");
    canvasDraw.fillStyle = "#202020";
    canvasDraw.fillRect(0, 0, DFACanvas.width, DFACanvas.height);
    canvasDraw.font = "10px Arial";
    
    //drawStates info
    var diameter = DFACanvas.width/(states.length+1);

    for (var i = 0, stateSpacingIndex = diameter; i < states.length; i++, stateSpacingIndex += diameter){
        drawStates(canvasDraw, states[i], stateSpacingIndex, diameter/2, startState, acceptState);
    }
    drawTransition(canvasDraw, transition, diameter/2);
    for (var i = 0, stateSpacingIndex = diameter; i < states.length; i++, stateSpacingIndex += diameter){
        drawStates(canvasDraw, states[i], stateSpacingIndex, diameter/2, startState, acceptState);
    }

}

function drawStates(canvasDraw, state, spacing, radius, startState, acceptState){
    canvasDraw.beginPath();
    canvasDraw.arc(spacing, spacing, radius, 0, 2 * Math.PI, false);
    canvasDraw.lineWidth = 2;
    canvasDraw.strokeStyle = '#BEBEBE';
    canvasDraw.fillStyle = '#202020';
    canvasDraw.stroke(); 
    canvasDraw.fill();
    canvasDraw.closePath();
    statesCanvasUpLocation.push([spacing+radius, spacing]);
    statesCanvasDownLocation.push([spacing-radius, spacing]);
    for (var i = 0; i < acceptState.length; i++){
        if (state === acceptState[i]) drawAcceptState(canvasDraw, spacing, radius*0.90);
    }
    if (state === startState) drawStartState(canvasDraw, spacing, radius);
    canvasDraw.font = "20px Arial";
    canvasDraw.fillStyle = "#BEBEBE";
    canvasDraw.fillText(state, spacing-5, spacing+5);
}

function drawStartState(canvasDraw, spacing, radius){
    canvasDraw.beginPath();
    canvasDraw.strokeStyle = '#BEBEBE';
    canvasDraw.fillStyle = '#202020';
    canvasDraw.lineWidth = 1;
    canvasDraw.lineTo(spacing-radius-(radius/5), spacing-(radius/5));
    canvasDraw.lineTo(spacing-radius, spacing);
    canvasDraw.lineTo(spacing-radius-(radius/5), spacing+(radius/5));
    canvasDraw.stroke();
    canvasDraw.closePath();
}

function drawAcceptState(canvasDraw, spacing, radius){
    canvasDraw.beginPath();
    canvasDraw.strokeStyle = '#BEBEBE';
    canvasDraw.fillStyle = '#202020';
    canvasDraw.arc(spacing, spacing, radius, 0, 2 * Math.PI, false);
    canvasDraw.stroke(); 
    canvasDraw.fill();
    canvasDraw.closePath();
}

function drawTransition(canvasDraw, transition, radius){
    var alphaState = [];
    for (var i = 0; i < transition.length; i++){
        alphaState.push([]);
        for (var inp = 0; inp < transition[i].length; inp++){
            var end = charToInt(transition[i][inp]);
            alphaState[i].push([]);
            if (i < end){
                var startX = statesCanvasUpLocation[i][0];
                var startY = statesCanvasUpLocation[i][1];
                var endX = statesCanvasUpLocation[end][0];
                var endY = statesCanvasUpLocation[end][1];
                canvasDraw.beginPath();
                canvasDraw.strokeStyle = '#1212b3'; //for forward
                canvasDraw.fillStyle = '#202020';
                canvasDraw.moveTo(startX, startY);
                canvasDraw.lineTo(startX, startY);
                canvasDraw.arcTo(endX, startY, endX, endY, endX-startX);
                canvasDraw.stroke();
                canvasDraw.closePath();
                alphaState[i][inp].push(endX-startX, endX, startY); //save coords for text
            }
            else if (i > end){
                var startX = statesCanvasDownLocation[i][0];
                var startY = statesCanvasDownLocation[i][1];
                var endX = statesCanvasDownLocation[end][0];
                var endY = statesCanvasDownLocation[end][1];
                canvasDraw.beginPath();
                canvasDraw.strokeStyle = '#12b338'; //for backward
                canvasDraw.fillStyle = '#202020';
                canvasDraw.moveTo(startX, startY);
                canvasDraw.lineTo(startX, startY);
                canvasDraw.arcTo(endX, startY, endX, endY, startX-endX);
                canvasDraw.stroke();
                canvasDraw.closePath();
                alphaState[i][inp].push(startX-endX, endX, startY); //save coords for text
            }
            else if (i === end){
                var startX = statesCanvasDownLocation[i][0];
                var startY = statesCanvasDownLocation[i][1];
                var endX = statesCanvasUpLocation[i][0];
                var endY = statesCanvasUpLocation[i][1];
                canvasDraw.beginPath();
                canvasDraw.strokeStyle = '#b31212'; //for same
                canvasDraw.fillStyle = '#202020';
                canvasDraw.moveTo(startX, startY);
                canvasDraw.arcTo(startX+((endX-startX)/2), endY-(radius*2), endX, endY, radius*0.60);
                canvasDraw.lineTo(endX, endY);
                canvasDraw.stroke();
                canvasDraw.closePath();
                alphaState[i][inp].push(radius*0.60, startX+((endX-startX)/2), endY-(radius*2)); //save coords for text
            }
        }
    }
    var whereText = [];
    for (var i = 0; i < transition.length; i++){
        whereText.push([]);
        for (var inp = 0; inp < transition[i].length; inp++){
            whereText[i].push([]);
            var destination = charToInt(transition[i][inp]);
            var xPos = 0;
            var yPos = 0;
            if (i < destination){
                xPos = alphaState[i][inp][1] - alphaState[i][inp][0]*0.30;
                yPos = alphaState[i][inp][2] + alphaState[i][inp][0]*0.30;
            }
            else if (i > destination){
                xPos = alphaState[i][inp][1] + alphaState[i][inp][0]*0.25;
                yPos = alphaState[i][inp][2] - alphaState[i][inp][0]*0.25;
            }
            else if (i === destination){
                xPos = alphaState[i][inp][1] - alphaState[i][inp][0]*0.1;
                yPos = alphaState[i][inp][2] + alphaState[i][inp][0]*1.1;
            }
            whereText[i][inp].push(inp, xPos, yPos);
        }
    }
    for (var i = 0; i < whereText.length; i++){
        for (var inp = 0; inp < whereText[i].length; inp++){
            for (var i2 = 0; i2 < whereText.length; i2++){
                for (var inp2 = 0; inp2 < whereText[i2].length; inp2++){
                    if (((whereText[i][inp][1] === whereText[i2][inp2][1]) && (whereText[i][inp][2] === whereText[i2][inp2][2])) && (i != i2 || inp != inp2)){
                        whereText[i][inp][0] = whereText[i][inp][0] + "," + whereText[i2][inp2][0];
                        whereText[i].splice(inp2, 1);
                    }
                }
            }
        }
    }
    for (var i = 0; i < whereText.length; i++){
        for (var inp = 0; inp < whereText[i].length; inp++){
            canvasDraw.font = "20px Arial";
            canvasDraw.fillStyle = "#BEBEBE";
            canvasDraw.fillText(whereText[i][inp][0], whereText[i][inp][1], whereText[i][inp][2]);
        }
    }
}