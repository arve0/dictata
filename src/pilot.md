---
title: Lage variabler
---

<script>
function random({ from, to }) {
    if (typeof from === 'string') {
        return 'a'
    } else if (typeof from === 'number') {
        return from + Math.round(Math.random() * (to - from))
    }
}
const __dictata_scope = {
    navn: random({
        from: 'a',
        to: 'z',
    }),
    verdi: random({
        from: 1,
        to: 100,
    })
}
</script>

Lag en variabel med navn ${navn} og verdi ${verdi}.

```test
${navn} === ${verdi}
```
