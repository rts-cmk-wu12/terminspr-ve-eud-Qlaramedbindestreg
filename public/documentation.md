# Dokumentation for iPlayMusic
Clara Qvist-Richards WU12

Deployed app: 
https://terminspr-ve-eud-qlaramedbindestreg.vercel.app/

## Tech-stack
* Next.js
* React
* Github
* React-icons
* SASS
* Landrup Dans API
* Zod

### Kode-eksempel
/Users/qlara/Desktop/coding/next/terminspr-ve-eud-Qlaramedbindestreg/src/app/(routes)/aktivitetsdetaljer/page.jsx
``` jsx
  useEffect(() => {
    if (!id) return;

    const fetchActivity = async () => {
      try {
        const token = localStorage.getItem("hallojsovs");
        const res = await fetch(`http://localhost:4000/api/v1/activities/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Kunne ikke hente aktiviteten");

        const data = await res.json();
        setActivity(data);

        
        const roster = JSON.parse(localStorage.getItem("roster") || "[]");
        setIsEnrolled(roster.some((a) => a.id === data.id));
      } catch (err) {
        console.error(err);
      }
    };

    fetchActivity();
  }, [id]);
```

Jeg starter med at kalde useEffect som er en react hook. Den håndterer mit fetch, som er asynkron. Det er en sideløbende process som egentlig ikke har noget med vores hovedfunktion at gøre. Useeffect returnerer derfor ikke noget, men kan bruges som en indre asynkron funktion (altså useEffect i sig selv må ikke være asynkron, men den lader den indre funktion være det). Det er den jeg har kaldt fetchActivity.   
Jeg bruger localStorage til at gemme den information jeg har hentet fra min createActivity information (mit token som jeg har valgt det meget kreative navn hallojsovs). Jeg har gemt den i en token, men hvis der ikke er gemt noget i den så returnere den Authorization: Bearer null.

Jeg har hentet et id fra API (hvert objekt har en række af information som jeg henter) Så linjen if (!id) er en guard clause der sørger for at hvis der ikke er noget id, så kører koden ikke.  

Jeg kører mit fetch med et promise (await) om at koden kører når requested er færdigt. Jeg checker manualt res.ok om der er en error. Så await venter på fetch og re.ok checker status.
const data = await.res.json() refererer til det data som mit api har returneret som json data. 

Hvis min variable roster ikke indeholder json data lander dataen i catch fordi json.parse vil kaste en fejl hvis der ikke er gyldig json data. Roster er information jeg tidligere har gemt i localstorage som jeg har fra API'et
Hvis mit state returnerer dataen som forventet, renderer react den data med fetchActivity();
[id] til sidst er et dependency array som fortæller react at effekten skal køre igen når id har ændret sig. 

Kilder:
https://react.dev/reference/react/useEffect
https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch
https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse
https://react.dev/learn/synchronizing-with-effects#why-was-the-ref-omitted-from-the-dependency-array