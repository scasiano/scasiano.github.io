var formData = location.search;
formData = formData.substring(1, formData.length);
while (formData.indexOf("+") != -1) {
    formData = formData.replace("+", " ");
}
formData = unescape(formData);
var formArray = formData.split("&");

//assign form values to var
alphabet = formArray[0];
states = formArray[1];
startState = formArray[2];
acceptState = formArray[3];
var inputTransition = [];
for (var i = 4; i < formArray.length; i++) inputTransition.push(formArray[i]);

//organize given data, remove redundency
transition = [];
alphabet = alphabet.replace("alphabet=", "").split(",").sort();
states = states.replace("states=", "").split(",").sort();
startState = startState.replace("startState=", "");
acceptState = acceptState.replace("acceptState=", "").split(",").sort();
inputTransition = inputTransition[0].replace("transition=", "").replace(/\r/g, "").split(/\n/).filter(x=>x!='').sort(); //removes "transition=", splits by newline, removes empty elements, and sorts alphanumerically
var index = 0;
for(var i = 0; i < states.length; i++){
    transition.push([]);
    for (var inp = 0; inp < alphabet.length; inp++){
        transition[i][inp] = inputTransition[index].charAt(inputTransition[index].length - 1);
        index++;
    }
}
