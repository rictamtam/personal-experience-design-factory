# Walk Through Time - v16_v8 (Lumiere)

Questa release parte da v16_v7 e integra la copertina Lumiere x Biografia con la fotografia autentica `cover_3.png`, ottimizzata come `assets/cover-lumiere.webp` con trasparenza.

- RICCARDO / TAMMARO: due righe complete, carattere serif editoriale, sovrapposte alla mano e al busto senza coprire il viso.
- Fotografia senza sfondo rettangolare, su fondale tortora/antracite.
- Capitoli 01-04: contenuti e fotografie preservati.
- Capitoli 05-06: atmosfera dark Lumiere, fotografie sfumate nello sfondo.
- Timeline 00-06, galleria, Full Screen e musica ON/OFF preservati.
- Audio: `media/the-great-gatsby.mp3`, disattivato all'avvio, riproduzione solo su richiesta.
- Video della camminata non integrato: ancora in attesa del filmato definitivo.

## Avvio

Apri il terminale nella cartella che contiene `index.html` e avvia:

    python3 -m http.server 8000

Poi visita http://localhost:8000. Se la porta e occupata, usa 8001.

Non serve npm. Compatibile con hosting statico e GitHub Pages.

## Note

La resa del carattere serif dipende dai font installati nel browser: usa Bodoni MT / Didot quando disponibili, con fallback Times New Roman/Georgia. Non vengono distribuiti file font. L'anteprima visiva va collaudata in Safari e Chrome sul Mac, in particolare a schermo stretto. Verificare la licenza della traccia musicale prima della pubblicazione.
