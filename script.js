const forms = ["1s", "2s", "3s", "1p", "2p", "3p"];

async function getData(url) {
    const response = await fetch(url);
    return response.json();
}

function getVerbList(data) {
    var verbs = [];
    for (v in data) {
        verbs.push(v);
    }
    return verbs;
}

function chooseRandomVerb(vList) {
    var newVerb = vList[Math.floor(Math.random() * vList.length)];
    while (vList.length > 1 && newVerb == verb) {
        var newVerb = vList[Math.floor(Math.random() * vList.length)];
    }
    return newVerb;
}

function changeVerb(verb) {
    document.getElementById("verb").innerHTML = verb;
}

const prom = getData("./indicativo_preterito.json");
var verbs, verbList, verb;
prom.then(data => {
    verbs = data;
    verbList = getVerbList(data);
    nextVerb();
})

function checkData() {
    for (f in forms) {
        f = forms[f];
        if (document.getElementById(f).value.toLowerCase() == verbs[verb][f].toLowerCase()) {
            document.getElementById(f + "_span").innerHTML = "¡Excelente!";
            document.getElementById(f + "_span").className = "correct";
        } else {
            document.getElementById(f + "_span").innerHTML = verbs[verb][f].toLowerCase();
            document.getElementById(f + "_span").className = "incorrect";
        }
    }
}

function nextVerb() {
    verb = chooseRandomVerb(verbList);
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
    verbList = newList;
    nextVerb();
}