# *Consumerlessm*

*Projektbeschreibung:*  
Bei dem Projekt handelt es sich um eine Website von Studierenden der Hochschule Reutlingen, das im Rahmen des Moduls Digital Media und Webtechnologien entwickelt wurde. Die Plattform Consumerlessm wurde mit dem Ziel erstellt, Konsument:innen über bewussteren Konsum zu informieren und zu sensibilisieren. Die Website wurde mit Next.js und React entwickelt und über Vercel gehostet.

---

## *Features:*
*Eventkalender:*
- Nutzer:innen können Veranstaltungen erstellen, absagen und vormerken
- Vormerkungen werden lokal im Browser gespeichert (LocalStorage)
- Für komplexe Kalenderlogik wurde Unterstützung durch KI (ChatGPT) genutzt

*Benutzer-Authentifizierung:*
- Registrieren und Login mit Validierung
- Passwortsicherheit durch Vergleich von Eingaben
- API-Routen für Authentifizierung wurden anfangs mithilfe von KI implementiert

*Kaufreue-Sektion:*
- Dynamische Visualisierung von Warenkorbinhalten
- Interaktive Nachrichten fördern bewussten Konsum
- Bei der Integration der interaktiven Elemente wurde anfangs auf Unterstützung durch KI zurückgegriffen

*Interaktive Animationen:*
- Design-Elemente wie Hover-Effekte und Animationen wurden zur Benutzerfreundlichkeit hinzugefügt
- Smooth Scrolling und Tooltip-Animationen (z. B. für Scroll-Pfeile)

*Datenbank-Anbindung:*
- Benutzerinformationen und Events werden in einer PostgreSQL-Datenbank gespeichert
- Datenbankabfragen und Fehlerbehandlung wurden unter Anleitung der KI erstellt

---

## *Technologien die benutzt wurden:*
- Frameworks: React, Next.js,
- Hosting: Vercel
- Datenbank: PostgreSQL
- Programmiersprachen: JavaScript, HTML, CSS
- Versionierung: GitHub

---

## *Setup und Installation:*

### *Entwicklungsserver starten:*
1. Repository klonen:  
   https://github.com/Veweevil/DMWT_Gruppe_3_Consumerlessm.git

2. Abhängigkeiten installieren:

   npm install
3. Entwicklungsserver starten:

   npm run dev
4. Öffne http://localhost:3000, um die Anwendung im Browser zu sehen

---

Anmerkungen:

KI-Unterstützung:

Bei der Entwicklung komplexer Komponenten wie API-Routen, Datenbankabfragen,
und der Integration dynamischer UI-Elemente wurde (anfangs) ChatGPT genutzt,
um die besten und einfachen Lösungen zu finden.

Durch wiederholte Abfragen konnte der Ansatz verstanden und eigenständig von uns umgesetzt werden.

---

Eckdaten:

MKIB3 Digital Media und Webtechnologien
WiSe 2024/2025 // Abgabe 20.01.2025

Aaron Ahammed (Matrikelnr.: 813034)
Berivan Babur (Matrikelnr.: 810288)
Verena Schelling (Matrikelnr.: 810288)
Efe Özkan (Matrikelnr.: 8132669)