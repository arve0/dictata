---
title: Hent verdi fra dokumentet
---

Bruk `document.querySelector` til å hente verdien til input-feltet under.
Lagre verdien til en variabel med navn `innVerdi`.

<input id="inn-verdi" type="text" value="Jeg har en id.">


```test
function test (input) {
    addInputAsScript(input)
    return innVerdi === document.querySelector("#inn-verdi").value
}
```

