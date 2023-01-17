const forms = ["1s", "2s", "3s", "1p", "2p", "3p"];

async function getData(url) {
    const response = await fetch(url);
    return response.json();
}

function parseData(data) {
    var verbs = [];
    for (v in data) {
        verbs.push(v);
    }
    var verb = verbs[Math.floor(Math.random()*verbs.length)];
    return verb;
}

function handleData(verb) {
    document.getElementById("verbe").innerHTML = verb;
}

const prom = getData("./indicativo_preterito.json");
var verbs, verb;
prom.then(data => {
    verbs=data;
    verb = parseData(data);
    handleData(verb);
})

function checkData(data, chosen) {
    for (f in forms) {
        f = forms[f]
        if (document.getElementById(f).value == data[chosen][f]) {
            document.getElementById(f+"_span").innerHTML = "Excelente!";
        } else {
            document.getElementById(f+"_span").innerHTML = data[chosen][f];
        }
    }
    verb = parseData(data);
    handleData(verb);
}