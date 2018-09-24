---
title: JSON med fetch
---

Lag en funksjon med navn `hent` som:

- bruker `fetch`,
- henter URL `https://httpbin.org/get?key=val`,
- bruker `.json()` for å hente ressursen som JSON
- og returnerer resultatet.


```test
async function test (input) {
    eval(input)
    let result = await hent()
    return result.args.key === 'val'
}
```

