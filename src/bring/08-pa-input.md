---
title: Ved endring av innfelt
---

Bruk [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)
til å detektere endringer av verdien til feltet.

Steg:

1. Bruk `querySelector` til å hente elementet.
2. Bruk `addEventListener` til å registrere en funksjon som kjører når verdien endrer seg.
3. Eventen for endring av verdi heter `input`.
4. Funksjonen skal en parameter, `event`.
5. Bruk `event.target.value` til å hente verdien.
6. Lagre verdien til den globale variabelen `lagretVerdi`.

<input id="inn-verdi" type="text" value="Jeg har en id.">


```test
function test (input) {
    addScriptInIframe('var lagretVerdi = "---";' + input)
    let el = $('#inn-verdi')
    el.value = Math.random()
    el.dispatchEvent(new Event('input'))

    return evalInIframe('lagretVerdi') === el.value
}
```