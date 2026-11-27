# Walk Through Time — v16_v14 consolidata

Base: v16_v13 consolidata.

## Novità
- Chapter 03: nuovo Cinematic Page Turn con quattro scene (chitarra, restauro bicicletta, libri, running), usando le fotografie originali ad alta risoluzione.
- Titolo e testo autobiografico originale conservati nella prima scena.
- Stessa logica di caricamento/preload, transizione e navigazione del Chapter 02.
- Il Chapter 04 conserva il contrasto avorio, senza modifiche.
- Le altre sezioni, la timeline, la musica manuale e il Full Screen sono conservati.

## Avvio
Apri il terminale nella cartella `v16_v14` e digita `python3 -m http.server 8000`. Visita http://localhost:8000.
Se la porta e occupata, prova `python3 -m http.server 8001`.

## Test suggeriti
Apri Chapter 03, sfoglia 4 scene avanti e indietro, torna al Chapter 02 e poi al 03, verifica la leggibilita su mobile e il passaggio al Chapter 04.
Il collaudo visivo Safari/Chrome resta da effettuare.
