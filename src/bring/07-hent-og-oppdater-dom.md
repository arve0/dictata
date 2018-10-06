---
title: Sett verdi i documentet
---

En kan bruke [httpbin](https://httpbin.org/) for å teste HTTP-forespørsler.
Om en henter `https://httpbin.org/get` får en tilbake JSON. Objektet har
en nøkkel, `headers`, som inneholder informasjon som nettleseren sendte.

Oppgave: Hent `https://httpbin.org/get` og lagre `headers` fra responsen i tekstfeltet under.

Hint: `JSON.stringify(headers, null, 2)` vil gjøre objektet `headers` om til tekst.

<textarea id="tekstfelt" disabled></textarea>


```test
async function test (input) {
    addScriptInIframe(input)
    await sleep(500)
    return document.querySelector("#tekstfelt").value.indexOf(window.navigator.userAgent) !== -1
}

function sleep (ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms)
    })
}
```

