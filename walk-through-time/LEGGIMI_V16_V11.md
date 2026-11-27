# Walk Through Time — v16_v11 consolidata

Correzione mirata del caricamento delle fotografie del Chapter 02.

- Precaricamento e cache in memoria di tutte le sette immagini Page Turn.
- Lo sfoglio attende che la fotografia di destinazione sia pronta.
- Ritorno alle scene precedenti senza nuovi caricamenti.
- Sincronizzazione della fine dell’animazione con transitionend, con timeout di sicurezza.
- Caricamento eager del Chapter 02 e delle fotografie delle gallerie.
- Design, contenuti, musica, fullscreen e timeline invariati.

Avvio: entra nella cartella v16_v11 ed esegui `python3 -m http.server 8000`.
Apri http://localhost:8000 e prova ripetutamente NEXT/PREVIOUS nel capitolo 02, poi esci e rientra.

Se il browser conserva file vecchi, esegui un hard refresh (Cmd+Shift+R).
