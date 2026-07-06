# VLS Law Academy — MACT Masterclass Landing Page
## Module 7: Motor Accident Laws & Practice

### Quick Start
Open `index.html` in any browser — fully functional immediately.
All fonts are **local** (Inter + Montserrat woff/woff2 in assets/fonts/).
All images are contextual SVGs (instant load, no internet needed).

### Project Structure
```
vls-mact-masterclass/
├── index.html                  ← Main landing page
├── README.md                   ← This file
├── download-photos.sh          ← Optional: replace SVGs with real photos
└── assets/
    ├── fonts/                  ← Inter (400–800) + Montserrat (700–900)
    │   ├── inter-latin-*-normal.woff2
    │   └── montserrat-latin-*-normal.woff2
    ├── images/                 ← SVG contextual images (self-contained)
    │   ├── hero-bg.svg
    │   ├── fast-facts.svg
    │   ├── courtroom.svg
    │   ├── legal-docs.svg
    │   ├── professionals.svg
    │   └── classroom.svg
    └── logo/
        └── vls-logo.svg        ← VLS Law Academy logo (SVG vector)
```

### Fonts Used
| Font        | Weights | Purpose         |
|-------------|---------|-----------------|
| Montserrat  | 700–900 | All headings    |
| Inter       | 400–800 | Body & UI text  |

### To Replace with Real Photos
Run `./download-photos.sh` (requires curl and internet).
The script downloads high-res Unsplash photos into assets/images/.

### Customise
| What                    | Where in index.html                    |
|-------------------------|----------------------------------------|
| Class date & time       | Hero section + Countdown section       |
| Registration form link  | Replace `<button class="form-submit">` |
| WhatsApp number         | `.wa-float` href + enroll bar          |
| Phone number            | Navbar + Footer                        |
| Pricing                 | Form card + Countdown + Enroll bar     |
| Google Meet link        | Email the link to registered users     |

### Built By
Invictus Global Tech Pvt Ltd — Digital Marketing & Technology Agency, Chennai
