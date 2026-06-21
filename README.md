# Dashboard voor de Community Manager 
<!-- Geef je project een titel en schrijf in één zin wat het is -->

## Inhoudsopgave

  * [Beschrijving](#beschrijving)
  * [Gebruik](#gebruik)
  * [Kenmerken](#kenmerken)
  * [Bronnen](#bronnen)
  * [Licentie](#licentie)

## Beschrijving
Voor [Tweakers](https://tweakers.net) mocht ik een dashboard maken voor de community manager. Omdat de manager nog geen dashboard heeft waren vrij in de design. Het was wel belangrjk dat de manager de volgende informatie terug kon vinden: 

- Meest actieve topics
- Meeste actieve gebruikers post

Verder mochten de data bekijken en intressante onderdelen toevoegen. 

Ik heb een **dashboard** kunnen maken en een **actieve topic** pagina. De designs heb ik kunnen maken op [Figma](https://www.figma.com/design/LHEs0Q4Y5bz0TZErHde96J/Tweaker?node-id=0-1&t=dMyWLeooFHTzZXLu-1)

_**dashboard**_

<img width="280" height="527" alt="Image" src="https://github.com/user-attachments/assets/f841e14e-958d-45e4-afd3-8a4b81edee70" />


_**actieve topic** pagina_

<img width="280" height="527" alt="Scherm­afbeelding 2026-06-21 om 11 42 49" src="https://github.com/user-attachments/assets/eabd4c34-8f11-4c12-a80c-939e016fd505" />


## Gebruik
Tweakers werkt met een ander soort API dan ik gewend ben. Dus inplaats van dat wij met directus werkte hebben wij met rss/XML gewerkt en XML geparsed naar JSON. Het data fetchen was ook lastiger dan ik normaal gewend ben, dus inplaats van tijd te verspillen in eerst alle data te ophalen heb ik eerst mijn website statisch gemaakt zodat ik alles kon stylen. Daarna heb ik de data kunnen ophalen die ik nodig had. Mijn website is dus een mix van statische en dynamische data.

### 1. Component: De eerste 4 overzichten kaarten

ik begon met het maken van de eerste Component. Het is de bedoeling dat de eerst 4 kaartje een overzicht geven van de **totaal topics**, **actieve topics**, **meest actieve gebruikers** en **de reacties van afgelopen week**. Na dat ik alles had gestyled heb ik besloten om een pagina te maken over de **actieve topics**, omdat ik makkelijker de data daarvan kon fetchen. 

<img width="755" height="377" alt="Image" src="https://github.com/user-attachments/assets/bf20549d-b357-4692-9ff6-e44502fdbcc0" />

### 2. Component: Top actieve topics kaart

Ik vind een dashboard overzichtelijk met grafieken, maar het coderen van 1 vond ik best lastig in 3 weken tijd. dus heb ik met een `<meter>` element een scalaire waarde kunnen toevoegen Dit is echte data opgehaald van de rss. Een `<meter>` element kan verschillende stylen aanhouden in verschillende browsers. Daarom heb ik een [browser test](https://github.com/khiettt/proof-of-concept/issues/13#issue-4705990994) gedaan en mijn bevindingen uitgelegd in een issue

<img width="755" height="322" alt="Image" src="https://github.com/user-attachments/assets/a7b8689d-e933-4ccc-8e47-fb6610c9e1fc" />


### 3. Component: Trending topic, top gebruikers en meest gebruikte categorie kaarten

_Trending topic_ en _meest gebruikte categorie_ zijn statisch, maar _top gebruikers_ heb ik met data kunnen ophalen. 


### 4. Component: Laatste topic

Hier staat de informatie van de laatste 3 topics die gepost zijn door wie en waneer. Dit is ook statische HTML

<img width="755" height="153" alt="Image" src="https://github.com/user-attachments/assets/b3bdff9b-4a86-4848-af2c-ada5ec1dbb04" />

### actieve topic pagina

Van de dahsboard kan je naar de actieve topic pagina als je op de pijltje klikt bij de het kaartje zelf van actieve topic Ik heb een `@view-transistion` toegevoegd met `navigation: auto` zodat ik een mooie fade look krijg. ik kwam er helaas niet aan toe om animaties toe te voegen aan de `@view-transistion`. 

### Oudste en Nieuwst gebruikers 

Het leek me leuk om de oudste en niewste gebruiken te tonen in een lijstje. Dit heb ik kunnen doen met dynamische data 

<img width="1512" height="263" alt="Scherm­afbeelding 2026-06-21 om 12 25 13" src="https://github.com/user-attachments/assets/98f5a3d3-4494-42a5-bbf8-db4b016f2258" />

Ik heb ook het kaartje van top gebruikers toegevoegd in de pagina van **actieve topic**. 

<img width="1512" height="324" alt="Scherm­afbeelding 2026-06-21 om 12 25 20" src="https://github.com/user-attachments/assets/f910cc76-bb20-4736-bf1f-e900b4ffd98a" />


## Kenmerken

De website is gebouwd met HTML, CSS en JS, NodeJS, Express, RSS, XML, JSON en Liquid, volgens het principe van progressive enhancement

### Testen

OM en schone website te hebben heb ik een [WCAG Audit test](https://github.com/khiettt/proof-of-concept/issues/15#issue-4706417100), [Performance test](https://github.com/khiettt/proof-of-concept/issues/16#issue-4706425479) en een [browser test](https://github.com/khiettt/proof-of-concept/issues/13#issue-4705990994) gedaan. 
<!-- Bij Kenmerken staat welke technieken zijn gebruikt en hoe. Wat is de HTML structuur? Wat zijn de belangrijkste dingen in CSS? Wat is er met JS gedaan en hoe? Misschien heb je iets met NodeJS gedaan, of heb je een framwork of library gebruikt? -->

## Installatie
volg de volgende stappen om aan deze repository te werken:

Stap 1: instaleer de [NodeJS ontwikkelomgeving](https://nodejs.org/) en kies voor NodeJS 24.13.0 (LTS, long-term support), download het installatiebestand en doorloop het installatieproces.

Stap 2: fork deze repository en clone deze naar een code editor. 

Stap 3: Open de _Terminal_ in VSCodium door de toetscombinatie `` ^` `` (control + `) te gebruiken. Er opent een terminalscherm in de hoofdmap van jouw project. Voer in de terminal het commando npm install uit, door het in te typen en op enter te drukken. 

Stap 4: Na de installatie is de map `node_modules` aangemaakt, en gevuld met allerlei _packages_. Start de website door in de terminal het comando `npm start` uit te voeren. Als het goed is, komt hier een melding te staan over het opstarten van de server: Application started on http://localhost:8000 — Open deze URL in je browser

## Bronnen

[MDN Meter element](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meter?utm_source=chatgpt.com)

[MDN CSS appearance property](https://developer.mozilla.org/en-US/docs/Web/CSS/appearance?utm_source=chatgpt.com) 

## Licentie

This project is licensed under the terms of the [MIT license](./LICENSE).
De instructies voor deze opdracht staan in: [docs/INSTRUCTIONS.md](https://github.com/fdnd-task/proof-of-concept/blob/main/docs/INSTRUCTIONS.md)
