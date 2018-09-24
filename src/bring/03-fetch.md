---
title: Hent med fetch
---

Lag en funksjon med navn `hent` som bruker `fetch` til å hente `https://httpbin.org/get`. Funksjonen skal returnere fetch-objektet.


```test
async function test (input) {
    eval(input)
    let result = await hent()
    return result.url === 'https://httpbin.org/get'
}
```

