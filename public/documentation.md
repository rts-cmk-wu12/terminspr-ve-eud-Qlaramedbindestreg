# Dokumentation for iPlayMusic
Clara Qvist-Richards WU12

## Tech-stack
* Next.js
* React
* Github
* React-icons
* SASS
* Api
* Zod

### Kode-eksempel
Navn på kode (filnavn fx components/ui/common-header.jsx)
``` jsx
Kode-eksempel her

const [title, setTitle] = useState("");

useEffect(function () {
    switch (pathname) {

    }
},  [pathname] );

<button onClick = {() => router.back()} >
```
useState = Jeg starter med at kalde useState som er en hook, dvs. en indbygget funktion i react. Når vi kører useState får vi returneret et Array. Det Array indeholder et state og en setter funktion til statet. useState tager imod et argument "initialState" som er værdien for statet ved start. 
Vi bruger det hvis vi har nogle værdier vi gerne vil have opdateret undervejs. 

useEffect = En react hook som er en funktion. En void funktion, returnerer ikke noget. Håndterer side effects, som fetch, som er asynkron. Det er en sideløbende process som egentlig ikke har noget med vores hovedfunktion at gøre. Bliver kørt når værdien inde i arrayet ændrer sig, efter første render. 

OnClick = en property (atribut). En eventlistener der lytter efter et click. 



