var formData = location.search;
formData = formData.substring(1, formData.length);
while (formData.indexOf("+") != -1) {
    formData = formData.replace("+", " ");
}
formData = unescape(formData);
var formArray = formData.split("&");

//assign form values to var
inputString = formArray[0]
alphabet = formArray[1];
states = formArray[2];
startState = formArray[3];
acceptState = formArray[4];
var inputTransition = [];
for (var i = 5; i < formArray.length; i++) inputTransition.push(formArray[i]);

//organize given data, remove redundency
transition = [];
inputString = inputString.replace("inputString=","").split("");
alphabet = alphabet.replace("alphabet=", "").split(",").sort();
states = states.replace("states=", "").split(",").sort();
startState = startState.replace("startState=", "");
acceptState = acceptState.replace("acceptState=", "").split(",").sort();
inputTransition = inputTransition[0].replace("transition=", "").replace(/\r/g, "").split(/\n/).filter(x=>x!='').sort(); //removes "transition=", splits by newline, removes empty elements, and sorts alphanumerically
var index = 0;
for(var i = 0; i < states.length; i++){
    transition.push([]);
    for (var inp = 0; inp < alphabet.length; inp++){
        transition[i][inp] = inputTransition[index].charAt(4);
        index++;
    }
}
