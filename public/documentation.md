# Dokumentation for iPlayMusic
Clara Qvist-Richards WU12

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
useState = Jeg starter med at kalde useState som er en hook, dvs. en indbygget funktion i react. Når vi kører useState får vi returneret et Array. Det Array indeholder et state og en setter funktion til statet. useState tager imod et argument "initialState" som er værdien for statet ved start. 
Vi bruger det hvis vi har nogle værdier vi gerne vil have opdateret undervejs. 

useEffect = En react hook som er en funktion. En void funktion, returnerer ikke noget. Håndterer side effects, som fetch, som er asynkron. Det er en sideløbende process som egentlig ikke har noget med vores hovedfunktion at gøre. Bliver kørt når værdien inde i arrayet ændrer sig, efter første render. 

OnClick = en property (atribut). En eventlistener der lytter efter et click. 



