# Calcolatrice Scientifica PWA

Una moderna calcolatrice scientifica implementata come Progressive Web App (PWA) con design professionale e supporto per dispositivi di diverse dimensioni.

![Calculator Desktop](https://github.com/user-attachments/assets/5e246b2e-3dc9-4eb2-b0f9-3739dace5d9d)
![Calculator Mobile](https://github.com/user-attachments/assets/dc5a8cb6-7769-48ca-86aa-2c5a5a0fe745)

## Caratteristiche

✨ **Design Professionale**
- Layout minimale e pulito
- Font Orbitron che simula un display a segmenti
- Tema scuro con colori vivaci per i pulsanti
- Design completamente responsive

🖥️ **Display a Due Righe**
- Riga superiore: mostra l'espressione matematica
- Riga principale: mostra il risultato con caratteri grandi
- Colore verde brillante che simula display LCD/LED

📱 **Progressive Web App**
- Installabile su dispositivi mobili e desktop
- Funziona offline grazie al service worker
- Manifest completo per l'installazione come app nativa

🧮 **Funzioni Scientifiche Complete**
- Operazioni base: +, -, ×, ÷
- Funzioni trigonometriche: sin, cos, tan
- Funzioni logaritmiche: log, ln
- Funzioni matematiche: √, x², x^y, n!, 1/x
- Costanti: π, e
- Parentesi e percentuali
- Funzione Ans per riutilizzare l'ultimo risultato

📚 **Cronologia Navigabile**
- Salva automaticamente i calcoli precedenti
- Navigazione con frecce ↑/↓ tra i risultati
- Mantiene fino a 50 calcoli in cronologia

⌨️ **Supporto Tastiera**
- Input completo da tastiera
- Scorciatoie: Esc (clear), Backspace (delete), Enter (=)
- Frecce su/giù per navigare la cronologia

## Tecnologie Utilizzate

- **HTML5**: Struttura semantica e accessibile
- **CSS3**: Stili avanzati con gradients e responsive design
- **JavaScript ES6+**: Logica del calcolatore con classi moderne
- **PWA**: Manifest e service worker per funzionalità offline
- **Google Fonts**: Font Orbitron per l'aspetto display a segmenti

## Come Utilizzare

### Installazione Locale

1. Clona il repository:
```bash
git clone https://github.com/mad4j/calc.git
cd calc
```

2. Avvia un server HTTP locale:
```bash
python3 -m http.server 8080
```

3. Apri il browser e vai su `http://localhost:8080`

### Installazione come PWA

1. Apri l'applicazione nel browser
2. Cerca l'icona "Installa" nella barra degli indirizzi
3. Clicca su "Installa" per aggiungere l'app al dispositivo

## Funzionalità Avanzate

### Operazioni Scientifiche

- **sin(x)**, **cos(x)**, **tan(x)**: Funzioni trigonometriche (input in radianti)
- **log(x)**: Logaritmo in base 10
- **ln(x)**: Logaritmo naturale
- **√(x)**: Radice quadrata
- **x²**: Elevamento al quadrato
- **x^y**: Elevamento a potenza arbitraria
- **n!**: Fattoriale
- **1/x**: Reciproco

### Scorciatoie Tastiera

| Tasto | Funzione |
|-------|----------|
| 0-9 | Cifre numeriche |
| +, -, *, / | Operatori base |
| Enter, = | Calcola risultato |
| Esc | Cancella tutto |
| Backspace | Cancella ultimo carattere |
| ↑, ↓ | Naviga cronologia |
| ( ) | Parentesi |
| % | Percentuale |
| . | Punto decimale |

## Compatibilità Browser

- ✅ Chrome/Chromium (desktop e mobile)
- ✅ Firefox (desktop e mobile)  
- ✅ Safari (desktop e mobile)
- ✅ Edge (desktop e mobile)

## Contribuire

I contributi sono benvenuti! Per favore:

1. Fork del progetto
2. Crea un branch per la tua feature (`git checkout -b feature/AmazingFeature`)
3. Commit delle modifiche (`git commit -m 'Add some AmazingFeature'`)
4. Push al branch (`git push origin feature/AmazingFeature`)
5. Apri una Pull Request

## Licenza

Questo progetto è distribuito sotto licenza MIT. Vedi il file `LICENSE` per i dettagli.

## Autore

Daniele Olmisani - [@mad4j](https://github.com/mad4j)

---

*Realizzato con ❤️ per fornire uno strumento di calcolo potente e accessibile*