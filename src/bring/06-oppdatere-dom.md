---
title: Sett verdi i documentet
---

Bruk `document.querySelector` til å hente input-feltet under og sett verdien
i feltet til å være `satt fra js`.

<input id="ut-verdi" type="text" value="Du skal endre meg." disabled>


```test
function test (input) {
    addInputAsScript(input)
    return document.querySelector("#ut-verdi").value === "satt fra js"
}
```

