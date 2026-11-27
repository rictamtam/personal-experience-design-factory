# Walk Through Time — Chapter 02 / Page Turn

Prototipo autonomo. Non modifica il sito principale.

## Avvio
Apri il terminale nella cartella `Chapter02_PageTurn` ed esegui:

```sh
python3 -m http.server 8000
```

Apri http://localhost:8000. Se la porta e' occupata, usa `8001`.

## Interazione
- Pulsanti PREVIOUS e NEXT PAGE
- Tastiera: frecce sinistra/destra o PageUp/PageDown
- Smartphone: swipe orizzontale

Il prototipo riproduce una rotazione 3D di una scena intera, non un libro fisico. La curvatura e' simulata con luci e ombre CSS. Le fotografie sono quelle originali gia' condivise. Il browser deve poter caricare Google Fonts per la variante Italiana; altrimenti usa un serif di sistema. Nessuna dipendenza npm.

## Da valutare
- Ritmo dello sfoglio (1,05 secondi)
- Leggibilita' della tipografia sopra le immagini
- Tagli fotografici su monitor e mobile
- Coerenza del movimento avanti/indietro

Nota: il movimento e' un prototipo CSS 3D, non una simulazione fisica della piega di un foglio.
