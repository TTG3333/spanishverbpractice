import csv
import json

times = [
    ["indicativo", "presente"],
    ["indicativo", "futuro"],
    ["indicativo", "imperfecto"],
    ["indicativo", "pretérito"],
    ["indicativo", "condicional"],
    ["indicativo", "presente perfecto"],
    ["indicativo", "futuro perfecto"],
    ["indicativo", "pluscuamperfecto"],
    ["indicativo", "pretérito anterior"],
    ["indicativo", "condicional perfecto"],
    ["subjuntivo", "presente"],
    ["subjuntivo", "imperfecto"],
    ["subjuntivo", "futuro"],
    ["subjuntivo", "presente perfecto"],
    ["subjuntivo", "futuro perfecto"],
    ["subjuntivo", "pluscuamperfecto"],
    ["imperativo afirmativo", "presente"],
    ["imperativo negativo", "presente"]
]

with open("verbs.csv", "tr", newline="", encoding="utf8") as F:
    table = list(csv.DictReader(F, delimiter=","))
with open("template.html", "tr", encoding="utf8") as F:
    html = F.read()

fields = ["form_1s", "form_2s", "form_3s", "form_1p", "form_2p", "form_3p"]
for t in times:
    fileName = "_".join(t[0].split(" ") + t[1].split(" ")).replace("é", "e")
    verbs = {}
    for v in table:
        if v["mood"].lower() == t[0] and v["tense"].lower() == t[1]:
            newV = {f[-2:]:v[f] for f in fields}
            verbs[v["infinitive"]] = newV
    with open(fileName + ".json", "tw", encoding="utf8") as F:
        json.dump(verbs, F, ensure_ascii=False)
    title = " ".join([x.capitalize() for x in t[0].split(" ") + t[1].split(" ")])
    newHtml = html.replace("#title", title).replace("#name", title.lower()).replace("data", fileName)
    with open(fileName + ".html", "tw", encoding="utf8") as F:
        F.write(newHtml)