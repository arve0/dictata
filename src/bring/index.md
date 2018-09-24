---
title: Brings API for postnummer
noanswer: true
---

[Med Brings API for postnummer][1] kan vi sjekke hvilket poststed et postnummer har.
Eksempelvis har postnummeret 7049 poststed TRONDHEIM.

Hovedmål med denne leksjonen er å fylle inn poststed automatisk ved hjelp av
API-et. Prøv å fylle inn et postnummer under:

<div>
    <label>Postnummer<input id=postnumber type=text></label>
    <label>Poststed<input id=place type=text disabled></label>
    <script>
        function getPlace(number) {
            let url = `https://api.bring.com/shippingguide/api/postalCode.json?pnr=${number}&clientUrl=dictata`
            return fetch(url)
                .then(response => response.json())
        }
        document.getElementById('postnumber').addEventListener('input', event => {
            let number = event.target.value
            getPlace(number)
                .then(response => {
                    document.getElementById('place').value = response.result
                    if (response.valid) {
                        approveTask()
                    }
                })
        })
    </script>
</div>

[1]: https://developer.bring.com/api/postal-code/