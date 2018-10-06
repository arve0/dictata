---
title: Postnummer til poststed
---

Bruk alle de forrige oppgavene til å bygge opp oppslag på postnummer
via Brings API. Oppdater poststed-feltet under med resultatet fra Bring.

Hint: URL for Bring er `https://api.bring.com/shippingguide/api/postalCode.json?clientUrl=localhost&pnr=postnummer`.

<label>Postnummer
    <input name=postnummer id=postnummer type=text>
</label>
<label>Poststed
    <input name=poststed id=poststed type=text disabled>
</label>


```test
async function test () {
    addScriptInIframe(input)
    let el = $('#postnummer')
    el.value = '3322'
    el.dispatchEvent(new Event('input'))

    await sleep(500)

    return $('#poststed').value === 'FISKUM'
}
```