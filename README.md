# NapoliTrans — Gestione rifornimento

App Next.js per la gestione del rifornimento carburante. Lo step di scansione veicolo è pensato per **palmari Datalogic** (scanner hardware in modalità keyboard wedge), non per la fotocamera del browser.

## Avvio locale

```bash
npm install
npm run dev
```

Apri [http://localhost:3000](http://localhost:3000).

## Scanner palmare Datalogic

### 1. Pagina di test (`/scan-test`)

1. Sul palmare connesso in WiFi, apri **Test scanner** nel menu (o `/scan-test`).
2. Metti il focus nel campo di cattura (automatico).
3. Scansiona uno dei QR mostrati a schermo (payload noto, es. `NAPOLITRANS-TEST-ABC123`).
4. Controlla il pannello **Ultima scansione** (e la console DevTools se disponibile):
   - `parsedValue` — testo utile dopo normalizzazione
   - `charCodes` — rivela CR (13), LF (10), Tab (9) o altri suffissi nascosti
   - `lastKey` — di solito `Enter` a fine wedge

### 2. Configurazione sul device

Su Datalogic (Scan2Deploy / impostazioni scanner):

- Profilo **QR Code**
- Modalità **Keyboard wedge**
- Suffisso di fine scansione: in genere **CR/LF** (Invio)

### 3. Suffisso custom in deploy

Se il palmare aggiunge una stringa fissa in coda (non solo Invio), imposta in `.env`:

```env
NEXT_PUBLIC_SCAN_SUFFIX=|tua-stringa|
```

### 4. Flusso produzione

Dopo la selezione pompa, lo step **Scansiona il QR del veicolo**:

- **Palmare (default):** wedge + Invio → autocomplete → passo successivo automatico. Menu veicoli e lista suggerimenti opzionali.
- **Telefono:** icona smartphone in alto a destra → fotocamera con loader → stessa logica autocomplete → passo successivo automatico.

## Script

| Comando        | Descrizione        |
|----------------|--------------------|
| `npm run dev`  | Server sviluppo    |
| `npm run build`| Build produzione   |
| `npm run start`| Server produzione  |
| `npm run lint` | ESLint             |
