import csv
import json

with open("verbs.csv", "tr", newline="", encoding="utf8") as F:
    table = [x for x in csv.DictReader(F, delimiter=",") if x["mood"].lower() == "indicativo" and x["tense"].lower() == "pretérito"]

fields = ["form_1s", "form_2s", "form_3s", "form_1p", "form_2p", "form_3p"]
verbs = {}
for v in table:
    newV = {f[-2:]:v[f] for f in fields}
    verbs[v["infinitive"]] = newV

with open("indicativo_preterito.json", "tw", encoding="utf8") as F:
    json.dump(verbs, F, ensure_ascii=False)