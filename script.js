const forms = ["1s", "2s", "3s", "1p", "2p", "3p"];

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
    return array;
}

async function getData(url) {
    const response = await fetch(url);
    return response.json();
}

function getVerbList(data) {
    var verbs = [];
    for (v in data) {
        verbs.push(v);
    }
    verbs = shuffle(verbs);
    return verbs;
}

function chooseNextVerb(vList) {
    var newVerb = vList[0];
    vList.push(vList[0]);
    vList.splice(0, 1);
    return newVerb;
}

function changeVerb(verb) {
    document.getElementById("verb").innerHTML = verb;
}

const prom = getData(fileName + ".json");
var verbs, verbList, verb;
prom.then(data => {
    verbs = data;
    verbList = getVerbList(data);
    nextVerb();
})

function checkData() {
    for (f in forms) {
        f = forms[f];
        var value = document.getElementById(f).value.toLowerCase();
        var normValue = value.normalize("NFD").replace(/\p{Diacritic}/gu, "");
        var check = verbs[verb][f].toLowerCase();
        var normCheck = check.normalize("NFD").replace(/\p{Diacritic}/gu, "");
        if (value == check) {
            document.getElementById(f + "_span").innerHTML = "¡Excelente!";
            document.getElementById(f + "_span").className = "correct";
        } else if (normValue == normCheck){
            document.getElementById(f + "_span").innerHTML = verbs[verb][f].toLowerCase();
            document.getElementById(f + "_span").className = "accentfault";
        } else {
            document.getElementById(f + "_span").innerHTML = verbs[verb][f].toLowerCase();
            document.getElementById(f + "_span").className = "incorrect";
        }
    }
}

function nextVerb() {
    verb = chooseNextVerb(verbList);
    changeVerb(verb);
    clearAnswers();
}

function clearAnswers() {
    for (f in forms) {
        f = forms[f];
        document.getElementById(f).value = "";
        document.getElementById(f + "_span").innerHTML = "";
    }
}

function findVerb() {
    var choice = document.getElementById("verbChoice").value.toLowerCase();
    if (choice in verbs) {
        verb = choice;
        changeVerb(verb);
    }
    document.getElementById("verbChoice").value = "";
    clearAnswers();
}

function newVerbList() {
    if (document.getElementById("verbList").value == "") {
        return;
    }
    var listInput = document.getElementById("verbList").value.toLowerCase().split(" ");
    var newList = [];
    for (v in listInput) {
        v = listInput[v];
        if (v in verbs) {
            newList.push(v);
        }
    }
    document.getElementById("verbList").value = "";
    if (newList.length == 0) {
        return;
    }
    shuffle(newList);
    verbList = newList;
    nextVerb();
}