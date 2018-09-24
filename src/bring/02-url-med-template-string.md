---
title: URL med template string
---

Lag variabelen `url` som bruker `postnummer` for å lage en URL til Brings API.

Eksempelvis skal postnummer `9100` gi `url` lik `https://api.bring.com/shippingguide/api/postalCode.json?pnr=9100`.

```test
function test (input) {
    addInputAsScript("var postnummer = 7040; " + input)
    return url === 'https://api.bring.com/shippingguide/api/postalCode.json?pnr=7040'
}
```