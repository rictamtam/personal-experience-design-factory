# Walk Through Time — Release consolidata (v16_v9)

Base: v16_v8 Lumière. Il Chapter 02 incorpora il prototipo Page Turn approvato, il Chapter 04 integra il ritratto trasparente cover_5.png. Tutti gli altri capitoli e la colonna sonora rimangono dalla base.

## Avvio

Apri il terminale nella cartella v16_v9 e avvia:

```bash
python3 -m http.server 8000
```

Visita http://localhost:8000. Se la porta è occupata, usa 8001. Nessuna compilazione npm richiesta.

## Navigazione

- Timeline 00–06 e scrolling continuo per passare tra capitoli.
- Nel Chapter 02, pulsanti NEXT/PREVIOUS, frecce tastiera e swipe per sfogliare le sette fotografie. Il comando CONTINUE torna al Chapter 03.
- Sound ON/OFF manuale; Full Screen; lightbox per le fotografie dei capitoli tradizionali.

## Stato e limiti

Release di integrazione da collaudare visivamente su Mac. Le scene 01, 03, 05 e 06 conservano il layout precedente: non sono state dichiarate approvate nuove regie per questi capitoli. Il Chapter 02 è incorporato come modulo HTML autonomo per isolare l'animazione e non interferire con la navigazione generale. Il Chapter 04 usa il ritratto scontornato originale, senza taglio del volto. La camminata video non è inclusa.
