function formComplete(e){
    if (!(checkAll())){
        alert("Please check your input values compared to the rules on the left");
        e.preventDefault();
    }
}

function checkAlphabet(){
    var check = document.getElementById("alphabet").value;
    var checkRtrn = /^\d+(,\d+)*$/.test(check);
    var noRepeat = !(/(\d)(?=.+\1)/.test(check));
    if (check === ""){
        document.getElementById("alphabetCheck").textContent = "•"; 
        checkRtrn = false;
    }
    else if (checkRtrn && noRepeat) document.getElementById("alphabetCheck").innerHTML = "<span id='green'>✓</span>";
    else if (!checkRtrn || !noRepeat) document.getElementById("alphabetCheck").innerHTML = "<span id='red'>X</span>";
    return checkRtrn && noRepeat;
}

function checkStates(){
    var check = document.getElementById("states").value;
    var checkRtrn = /^[a-z]+(,[a-z]+)*$/.test(check);
    var noRepeat = !(/([a-z])(?=.+\1)/.test(check));
    if (check === ""){
        document.getElementById("statesCheck").textContent = "•"; 
        checkRtrn = false;
    }
    else if (checkRtrn && noRepeat) document.getElementById("statesCheck").innerHTML = "<span id='green'>✓</span>";
    else if (!checkRtrn || !noRepeat) document.getElementById("statesCheck").innerHTML = "<span id='red'>X</span>";
    return checkRtrn && noRepeat;
}

function checkStart(){
    var check = document.getElementById("startState").value;
    var checkRtrn = /^[a-z]$/.test(check);
    var matchStates = false;
    if (checkStates()){
        var states = document.getElementById("states").value.split(",");
        for (var i = 0; i < states.length; i++){
            if (states[i] === check) matchStates = true;
        }
    }
    else {check = "";}
    if (check === ""){
        document.getElementById("startCheck").textContent = "•"; 
        checkRtrn = false;
    }
    else if (checkRtrn && matchStates) document.getElementById("startCheck").innerHTML = "<span id='green'>✓</span>";
    else if (!checkRtrn || !matchStates) document.getElementById("startCheck").innerHTML = "<span id='red'>X</span>";
    return checkRtrn && matchStates;
}

function checkAccept(){
    var check = document.getElementById("acceptState").value;
    var checkRtrn = /^[a-z]+(,[a-z]+)*$/.test(check);
    var matchStates = false;
    if (checkStates()){
        var states = document.getElementById("states").value.split(",");
        var test = check.split(",");
        var tempMatch = 0;
        for (var i = 0; i < test.length; i++){
            for (var index = 0; index < states.length; index++){
                if (states[index] === test[i]) tempMatch++;
            }
        }
        if (tempMatch === test.length) matchStates = true;
    }
    else {check = "";}
    if (check === ""){
        document.getElementById("acceptCheck").textContent = "•"; 
        checkRtrn = false;
    }
    else if (checkRtrn && matchStates) document.getElementById("acceptCheck").innerHTML = "<span id='green'>✓</span>";
    else if (!checkRtrn || !matchStates) document.getElementById("acceptCheck").innerHTML = "<span id='red'>X</span>";
    return checkRtrn && matchStates;
}

function checkTransition(){
    var check = document.getElementById("transition").value;
    var checkRtrn = true;
    var doubleCheck = check.replace(/\r/g, "").split(/\n/).filter(x=>x!='').sort();
    for (var i = 0; i < doubleCheck.length; i++) if (!(/\([a-z],\d\)\->[a-z]/.test(doubleCheck[i]))) checkRtrn = false;
    var noDoublesExist = true;
    var noStateConflict = false;
    var noAlphabetConflict = false;
    var noDestinationConflict = false;
    var enoughFunctions = false;
    var stateCount = 0;
    var alphabetCount = 0;
    var destCount = 0;
    if (checkRtrn && checkStates() && checkAlphabet){
        var states = document.getElementById("states").value.split(",");
        var alphabet = document.getElementById("alphabet").value.split(",");
        for (var i = 0; i < doubleCheck.length; i++){
            for (var index = 0; index < states.length; index++) if (states[index] === doubleCheck[i].charAt(1)) stateCount++;
            for (var index = 0; index < alphabet.length; index++) if (alphabet[index] === doubleCheck[i].charAt(3)) alphabetCount++;
            for (var index = 0; index < states.length; index++) if (states[index] === doubleCheck[i].charAt(7)) destCount++;
            for (var index = 0; index < doubleCheck.length; index++) if (doubleCheck[i].substring(0,5) === doubleCheck[index].substring(0,5) && i != index) noDoublesExist = false;
        }
        if (doubleCheck.length === states.length*alphabet.length) enoughFunctions = true;
        if (stateCount === doubleCheck.length) noStateConflict = true;
        if (alphabetCount === doubleCheck.length) noAlphabetConflict = true;
        if (destCount === doubleCheck.length) noDestinationConflict = true;
    }
    var fin = checkRtrn && noDoublesExist && noStateConflict && noAlphabetConflict && noDestinationConflict && enoughFunctions;
    if (check === ""){
        document.getElementById("acceptCheck").textContent = "•"; 
        fin = false;
    }
    else if (fin) document.getElementById("transitionCheck").innerHTML = "<span id='green'>✓</span>";
    else if (!fin) document.getElementById("transitionCheck").innerHTML = "<span id='red'>X</span>";
    return fin
}

function checkAll(){
    var cAlphabet = checkAlphabet();
    var cStates = checkStates();
    var cStart = checkStart();
    var cAccept = checkAccept();
    var cTransition = checkTransition();
    return cAlphabet && cStates && cStart && cAccept && cTransition;
}