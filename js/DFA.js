function isAccept(inputString, startState, acceptState, transition){
    var isAccept = false;
    var column = 0;
    var row = 0;
    switch (startState) {
        case 'a': row = 0; break;
        case 'b': row = 1; break;
        case 'c': row = 2; break;
        case 'd': row = 3; break;
        case 'e': row = 4; break;
        case 'f': row = 5; break;
        case 'g': row = 6; break;
        case 'h': row = 7; break;
        case 'i': row = 8; break;
        case 'j': row = 9; break;
        case 'k': row = 10; break;
        case 'l': row = 11; break;
        case 'm': row = 12; break;
        case 'n': row = 13; break;
        case 'o': row = 14; break;
        case 'p': row = 15; break;
        case 'q': row = 16; break;
        case 'r': row = 17; break;
        case 's': row = 18; break;
        case 't': row = 19; break;
        case 'u': row = 20; break;
        case 'v': row = 21; break;
        case 'w': row = 22; break;
        case 'x': row = 23; break;
        case 'y': row = 24; break;
        case 'z': row = 25; break;
        default: row = null; break;
    }
    for (var i = 0; i < inputString.length; i++) {
        column = inputString[i];
        switch (transition[row][column]) {
            case 'a': row = 0; break;
            case 'b': row = 1; break;
            case 'c': row = 2; break;
            case 'd': row = 3; break;
            case 'e': row = 4; break;
            case 'f': row = 5; break;
            case 'g': row = 6; break;
            case 'h': row = 7; break;
            case 'i': row = 8; break;
            case 'j': row = 9; break;
            case 'k': row = 10; break;
            case 'l': row = 11; break;
            case 'm': row = 12; break;
            case 'n': row = 13; break;
            case 'o': row = 14; break;
            case 'p': row = 15; break;
            case 'q': row = 16; break;
            case 'r': row = 17; break;
            case 's': row = 18; break;
            case 't': row = 19; break;
            case 'u': row = 20; break;
            case 'v': row = 21; break;
            case 'w': row = 22; break;
            case 'x': row = 23; break;
            case 'y': row = 24; break;
            case 'z': row = 25; break;
            default: row = null; break;
        }
    }
    for (var i = 0; i < acceptState.length; i++) {
        isAccept = (transition[row][column] === acceptState[i]);
        if (isAccept)
            break;
    }
    return isAccept;
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
    canvasDraw.lineTo(spacing-radius-(spacing/5), spacing-(spacing/5));
    canvasDraw.lineTo(spacing-radius, spacing);
    canvasDraw.lineTo(spacing-radius-(spacing/5), spacing+(spacing/5));
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
            var end = 0;
            alphaState[i].push([]);
            switch (transition[i][inp]) {
                case 'a': end = 0; break;
                case 'b': end = 1; break;
                case 'c': end = 2; break;
                case 'd': end = 3; break;
                case 'e': end = 4; break;
                case 'f': end = 5; break;
                case 'g': end = 6; break;
                case 'h': end = 7; break;
                case 'i': end = 8; break;
                case 'j': end = 9; break;
                case 'k': end = 10; break;
                case 'l': end = 11; break;
                case 'm': end = 12; break;
                case 'n': end = 13; break;
                case 'o': end = 14; break;
                case 'p': end = 15; break;
                case 'q': end = 16; break;
                case 'r': end = 17; break;
                case 's': end = 18; break;
                case 't': end = 19; break;
                case 'u': end = 20; break;
                case 'v': end = 21; break;
                case 'w': end = 22; break;
                case 'x': end = 23; break;
                case 'y': end = 24; break;
                case 'z': end = 25; break;
                default: end = null; break;
            }
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
            var destination = 0;
            switch (transition[i][inp]) {
                case 'a': destination = 0; break;
                case 'b': destination = 1; break;
                case 'c': destination = 2; break;
                case 'd': destination = 3; break;
                case 'e': destination = 4; break;
                case 'f': destination = 5; break;
                case 'g': destination = 6; break;
                case 'h': destination = 7; break;
                case 'i': destination = 8; break;
                case 'j': destination = 9; break;
                case 'k': destination = 10; break;
                case 'l': destination = 11; break;
                case 'm': destination = 12; break;
                case 'n': destination = 13; break;
                case 'o': destination = 14; break;
                case 'p': destination = 15; break;
                case 'q': destination = 16; break;
                case 'r': destination = 17; break;
                case 's': destination = 18; break;
                case 't': destination = 19; break;
                case 'u': destination = 20; break;
                case 'v': destination = 21; break;
                case 'w': destination = 22; break;
                case 'x': destination = 23; break;
                case 'y': destination = 24; break;
                case 'z': destination = 25; break;
                default: destination = null; break;
            }
            var xPos = 0;
            var yPos = 0;
            if (i < destination){
                xPos = alphaState[i][inp][1] - alphaState[i][inp][0]*0.20;
                yPos = alphaState[i][inp][2] + alphaState[i][inp][0]*0.20;
            }
            else if (i > destination){
                xPos = alphaState[i][inp][1] + alphaState[i][inp][0]*0.17;
                yPos = alphaState[i][inp][2] - alphaState[i][inp][0]*0.17;
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