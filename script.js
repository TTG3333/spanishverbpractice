const forms = ["1s", "2s", "3s", "1p", "2p", "3p"];

async function getData(url) {
    const response = await fetch(url);
    return response.json();
}

function chooseVerb(data) {
    var verbs = [];
    for (v in data) {
        verbs.push(v);
    }
    var verb = verbs[Math.floor(Math.random() * verbs.length)];
    return verb;
}

function handleData(verb) {
    document.getElementById("verb").innerHTML = verb;
}

const prom = getData("./indicativo_preterito.json");
var verbs, verb;
prom.then(data => {
    verbs = data;
    verb = chooseVerb(data);
    handleData(verb);
})

function checkData(data, chosen) {
    for (f in forms) {
        f = forms[f];
        if (document.getElementById(f).value.toLowerCase() == data[chosen][f].toLowerCase()) {
            document.getElementById(f + "_span").innerHTML = "¡Excelente!";
            document.getElementById(f + "_span").className = "correct";
        } else {
            document.getElementById(f + "_span").innerHTML = data[chosen][f].toLowerCase();
            document.getElementById(f + "_span").className = "incorrect";
        }
    }
}

function nextVerb() {
    verb = chooseVerb(verbs);
    handleData(verb);
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
        handleData(verb);
    }
    document.getElementById("verbChoice").value = "";
    clearAnswers();
}