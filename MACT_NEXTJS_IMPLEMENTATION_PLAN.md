# MACT Masterclass Next.js Implementation Plan

Document created on: 2026-07-06

## Goal

Create a Next.js version of the existing MACT Masterclass landing page by using only these two references:

1. `index.html` in this MACT project for the final UI, content, section order, colors, spacing, local fonts, images, CTA behavior, and landing-page copy.
2. The VLS Practice project reference for the Next.js Pages Router structure, folder naming, component separation, global app setup, analytics script placement, static asset handling, and form/API patterns.

The new MACT Masterclass project should look like the current `index.html` page, but it should be rebuilt as a maintainable Next.js application with reusable components and shared constants like the VLS Practice project.

## Important Requirements

- Use Next.js Pages Router, matching the VLS Practice reference.
- Use `src/pages`, `src/pageComponents`, `src/component`, `src/common`, `src/constants`, `src/hooks`, `src/service`, `src/styles`, and `src/utils` style folders.
- Move static assets into `public`, matching the reference project pattern.
- Preserve the UI from `index.html` accurately.
- Preserve the existing local font family setup:
  - `Montserrat` for headings, weights `700`, `800`, `900`.
  - `Inter` for body/UI text, weights `400`, `500`, `600`, `700`, `800`.
- Remove the static HTML preloader/loading screen in the Next.js project.
- Do not add the VLS Practice `Preloader` component to the MACT project.
- Add Google Tag Manager and Microsoft Clarity using the same global script strategy as the VLS Practice reference.
- Keep the registration form section in the hero and scroll all register CTAs to that form.
- Convert static JavaScript behavior from `index.html` into React state/hooks.

## Target Tech Stack

| Item | Planned Value |
| --- | --- |
| Framework | Next.js `^16.2.6`, matching the VLS Practice reference |
| Router | Pages Router |
| React | `^18.3.1`, matching the VLS Practice reference |
| Styling | Global CSS + component CSS modules, matching VLS Practice pattern |
| Assets | `public/assets` and `public/fonts` |
| Scripts | `next/script` for analytics and third-party scripts |
| Forms | React component form first; API/service integration can follow the VLS Practice pattern |
| Icons | Prefer existing visual style from `index.html`; add `lucide-react` only when needed |

## Proposed Project Structure

```text
vls-mact-masterclass/
├── jsconfig.json
├── next.config.mjs
├── package.json
├── package-lock.json
├── README.md
├── MACT_NEXTJS_IMPLEMENTATION_PLAN.md
├── public/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── hero-bg.svg
│   │   │   ├── fast-facts.svg
│   │   │   ├── courtroom.svg
│   │   │   ├── legal-docs.svg
│   │   │   ├── professionals.svg
│   │   │   └── classroom.svg
│   │   └── logo/
│   │       └── vls-logo.svg
│   ├── fonts/
│   │   ├── inter-latin-400-normal.woff2
│   │   ├── inter-latin-500-normal.woff2
│   │   ├── inter-latin-600-normal.woff2
│   │   ├── inter-latin-700-normal.woff2
│   │   ├── inter-latin-800-normal.woff2
│   │   ├── montserrat-latin-700-normal.woff2
│   │   ├── montserrat-latin-800-normal.woff2
│   │   └── montserrat-latin-900-normal.woff2
│   └── favicon.ico
└── src/
    ├── common/
    │   ├── Button/
    │   ├── Footer/
    │   ├── Header/
    │   ├── Meta/MetaTitle/
    │   ├── RegisterSticky/
    │   └── WhatsAppFloat/
    ├── component/
    │   ├── banner/
    │   ├── countdownCta/
    │   ├── faq/
    │   ├── fastfact/
    │   ├── gapFix/
    │   ├── speaker/
    │   ├── testimonial/
    │   ├── whatlearn/
    │   ├── whoJoin/
    │   ├── whycourse/
    │   └── whyvls/
    ├── constants/
    │   ├── navlink.js
    │   └── Home/index.js
    ├── hooks/
    │   ├── useCountdown.js
    │   ├── useRevealOnScroll.js
    │   └── useScrolledHeader.js
    ├── pageComponents/
    │   └── Home/index.jsx
    ├── pages/
    │   ├── _app.jsx
    │   ├── _document.jsx
    │   └── index.jsx
    ├── service/
    │   └── MactRegistration/index.js
    ├── styles/
    │   ├── globals.css
    │   └── Home.module.css
    └── utils/
        └── useUTMSource/index.jsx
```

## Asset Migration Plan

Move the current static assets as follows:

| Current Path | Next.js Path | Usage |
| --- | --- | --- |
| `assets/logo/vls-logo.svg` | `public/assets/logo/vls-logo.svg` | Header, speaker card, footer |
| `assets/images/hero-bg.svg` | `public/assets/images/hero-bg.svg` | Hero background |
| `assets/images/fast-facts.svg` | `public/assets/images/fast-facts.svg` | Fast facts section |
| `assets/images/courtroom.svg` | `public/assets/images/courtroom.svg` | Why this masterclass section |
| `assets/images/legal-docs.svg` | `public/assets/images/legal-docs.svg` | What you will learn section |
| `assets/images/professionals.svg` | `public/assets/images/professionals.svg` | Who should attend section |
| `assets/images/classroom.svg` | `public/assets/images/classroom.svg` | Why VLS section |
| `assets/fonts/*` | `public/fonts/*` | Local `@font-face` declarations |

In JSX/CSS, asset URLs should use root-relative public paths:

```jsx
<img src="/assets/logo/vls-logo.svg" alt="VLS Law Academy" />
```

```css
background-image: url('/assets/images/hero-bg.svg');
```

## Font Plan

Move the font declarations from `index.html` into `src/styles/globals.css`.

Use the same CSS variables from the static page:

```css
:root {
  --red: #CC0000;
  --red-d: #8B0000;
  --black: #0a0a0a;
  --dk: #111111;
  --dk2: #1a1a1a;
  --white: #ffffff;
  --ow: #f8f8f8;
  --muted: #777777;
  --ff-head: 'Montserrat', 'Segoe UI', Arial, sans-serif;
  --ff-body: 'Inter', 'Segoe UI', Arial, sans-serif;
  --wrap: 1180px;
  --r: 8px;
}
```

Update font URLs from `assets/fonts/...` to `/fonts/...`.

## Section Mapping From `index.html` To Components

| Static HTML Section | Next.js Component | Folder |
| --- | --- | --- |
| Navbar | `Header` | `src/common/Header` |
| Hero + registration form | `Banner` | `src/component/banner` |
| Fast Facts | `FastFact` | `src/component/fastfact` |
| Why This Masterclass | `WhyCourse` | `src/component/whycourse` |
| The Gap / The Fix | `GapFix` | `src/component/gapFix` |
| What You'll Learn | `WhatLearn` | `src/component/whatlearn` |
| Speaker | `Speaker` | `src/component/speaker` |
| Who Should Attend | `WhoJoin` | `src/component/whoJoin` |
| Why VLS Academy | `WhyVls` | `src/component/whyvls` |
| FAQ | `FAQ` | `src/component/faq` |
| Countdown CTA | `CountdownCta` | `src/component/countdownCta` |
| Testimonials | `Testimonial` | `src/component/testimonial` |
| Footer | `Footer` | `src/common/Footer` |
| Sticky enroll bar | `RegisterSticky` | `src/common/RegisterSticky` |
| WhatsApp floating button | `WhatsAppFloat` | `src/common/WhatsAppFloat` |

## Home Page Render Order

Match the static page order, while following the VLS Practice `pageComponents/Home/index.jsx` composition style:

```jsx
import MetaTitle from '@/common/Meta/MetaTitle';
import Banner from '@/component/banner';
import FastFact from '@/component/fastfact';
import WhyCourse from '@/component/whycourse';
import GapFix from '@/component/gapFix';
import WhatLearn from '@/component/whatlearn';
import Speaker from '@/component/speaker';
import WhoJoin from '@/component/whoJoin';
import WhyVls from '@/component/whyvls';
import FAQ from '@/component/faq';
import CountdownCta from '@/component/countdownCta';
import Testimonial from '@/component/testimonial';
import RegisterSticky from '@/common/RegisterSticky';
import WhatsAppFloat from '@/common/WhatsAppFloat';

export default function Home() {
  return (
    <>
      <MetaTitle />
      <Banner />
      <FastFact />
      <WhyCourse />
      <GapFix />
      <WhatLearn />
      <Speaker />
      <WhoJoin />
      <WhyVls />
      <FAQ />
      <CountdownCta />
      <Testimonial />
      <RegisterSticky />
      <WhatsAppFloat />
    </>
  );
}
```

`Header` and `Footer` should be mounted globally in `_app.jsx`, following the VLS Practice reference.

## Content Constants Plan

Create `src/constants/Home/index.js` and move repeatable/static content into data arrays.

Recommended constants:

- `heroBullets`
- `fastFacts`
- `gapItems`
- `fixItems`
- `learnItems`
- `speakerStats`
- `whoJoinItems`
- `whyVlsItems`
- `faqItems`
- `testimonials`
- `courseDetails`
- `footerLinks`
- `socialLinks`

This keeps the JSX clean and matches the content/data separation style used by the VLS Practice reference.

## Global App Setup

Create `src/pages/_app.jsx` using the VLS Practice global wrapper pattern, but without `Preloader`.

Planned responsibilities:

- Import `src/styles/globals.css`.
- Import any package CSS only if actually installed and used.
- Add global providers only if needed for MACT registration flow.
- Mount `Header` before the page component.
- Mount `Footer` after the page component.
- Run UTM tracking hook from `src/utils/useUTMSource` if registration tracking needs it.
- Add Google Tag Manager and Microsoft Clarity scripts using `next/script`.

Example structure:

```jsx
import Script from 'next/script';
import Header from '@/common/Header';
import Footer from '@/common/Footer';
import '@/styles/globals.css';
import useUTMSource from '@/utils/useUTMSource';

export default function App({ Component, pageProps }) {
  useUTMSource();
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_ID;

  return (
    <>
      {gtmId ? (
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
      ) : null}

      {clarityId ? (
        <Script id="clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${clarityId}");`}
        </Script>
      ) : null}

      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
```

Final implementation should guard against missing analytics IDs so empty scripts are not injected in local development.

## Custom Document Plan

Create `src/pages/_document.jsx` for document-level markup, matching the Pages Router reference.

Responsibilities:

- Set the language to `en`.
- Add GTM `<noscript>` fallback immediately after `<body>` begins.
- Keep metadata that belongs in the page inside `MetaTitle`, not hardcoded in `_document`.

Example structure:

```jsx
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        {process.env.NEXT_PUBLIC_GTM_ID ? (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        ) : null}
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
```

## Analytics Environment Variables

Use environment variables instead of hardcoding tracking IDs:

```env
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
NEXT_PUBLIC_CLARITY_ID=xxxxxxxxxx
```

Add `.env.example` during implementation with placeholder values.

## Remove Loading / Preloader

The following static HTML pieces should not be migrated:

- `<div id="preloader">...</div>`
- `#preloader` CSS rules
- `@keyframes spin` if only used by preloader
- `@keyframes pulse` if only used by preloader or warning text can be simplified
- `window.addEventListener('load', ...)` preloader script
- VLS Practice `Preloader` component usage in `_app.jsx`

The Next.js page should render directly with the header and hero section.

## JavaScript Behavior Conversion Plan

| Static Script Behavior | Next.js Conversion |
| --- | --- |
| Preloader fade on window load | Remove completely |
| Navbar shadow on scroll | `useScrolledHeader` hook used by `Header` |
| Scroll reveal with `IntersectionObserver` | `useRevealOnScroll` hook or CSS class applied by reusable `Reveal` wrapper |
| Smooth scroll to `#register` | `scrollToRegister()` utility or anchor with controlled click handler |
| FAQ inline `onclick="toggleFaq(this)"` | React `useState` active FAQ index |
| 15-minute countdown using DOM IDs | `useCountdown(15 * 60)` hook returning hours/minutes/seconds |

## Registration Form Plan

Initial implementation:

- Build the registration form UI inside `src/component/banner` to match the hero form from `index.html`.
- Use controlled React inputs for `name`, `email`, and `mobile`.
- Keep form labels and placeholder text from the static page.
- Validate required email and mobile before submission.
- CTA buttons across the page should scroll to this form.

API integration options, following the VLS Practice reference:

- Create `src/service/MactRegistration/index.js` for registration API calls.
- Add `src/hooks/useMactRegistrationQuery.jsx` if React Query is used like the VLS Practice project.
- If Razorpay or WhatsApp flows are required later, mirror the VLS Practice API route approach under `src/pages/api`.

## Page Metadata Plan

Create `src/common/Meta/MetaTitle/index.jsx` using `next/head`.

Use metadata from the current static page:

```text
Title: MACT Masterclass — Motor Accident Claims Practice | VLS Law Academy
Description: Master MACT procedure in 3 hours — Sarla Verma formulas, negligence proof, petition drafting & insurance tactics. Tamil medium. ₹499 only.
```

Add Open Graph and Twitter metadata during implementation using the same title/description and `/assets/images/hero-bg.svg` as the default preview image if no separate OG image is available.

## Styling Plan

Use `src/styles/globals.css` for:

- Local font declarations.
- Root tokens.
- CSS reset.
- Shared utilities such as `.wrap`, `.text-center`, `.red`, spacing helpers.
- Shared section backgrounds like `.sec--light`, `.sec--white`, `.sec--dark` if kept global.

Use component CSS modules for component-specific styles:

```text
src/component/banner/styles.module.css
src/component/fastfact/styles.module.css
src/component/faq/styles.module.css
src/common/Header/styles.module.css
src/common/Footer/styles.module.css
```

Keep the visual design from `index.html`:

- Red/black/white VLS palette.
- 8px radius token.
- Sticky black header.
- Hero background with vignette.
- Alternating light, white, and dark sections.
- Red CTA buttons.
- Sticky enroll bar at bottom.
- WhatsApp floating button.

## Navigation Plan

Create `src/constants/navlink.js`:

```js
export const navLinks = [
  { label: 'Home', href: 'https://www.vlslawacademy.com' },
  { label: 'Courses', href: 'https://www.vlslawacademy.com/courses' },
  { label: 'Why VLS', href: 'https://www.vlslawacademy.com/whyvls' },
  { label: 'Contact', href: 'https://www.vlslawacademy.com/contact' },
];
```

Header should also include:

- Phone: `+91 95002 07811`
- CTA: `Register ₹499`
- CTA target: hero registration form

## Implementation Phases

### Phase 1: Scaffold Next.js Project

1. Create Next.js project files in this MACT project.
2. Add `jsconfig.json` with `@/*` alias.
3. Add `next.config.mjs` with `reactStrictMode: true`.
4. Add scripts: `dev`, `build`, `start`, `lint`.
5. Install only dependencies needed for the first build.

### Phase 2: Move Static Assets

1. Create `public/assets/images`, `public/assets/logo`, and `public/fonts`.
2. Move/copy current assets into `public`.
3. Update all JSX/CSS references to root-relative public paths.
4. Keep the old static `assets` folder only until migration is verified.

### Phase 3: Global Layout And Analytics

1. Create `_app.jsx`.
2. Import global styles.
3. Mount `Header`, page, and `Footer`.
4. Add GTM and Clarity with `next/script` and env variables.
5. Create `_document.jsx` with GTM noscript fallback.
6. Do not add any preloader.

### Phase 4: Convert UI Into Components

1. Create Home page route in `src/pages/index.jsx`.
2. Create `src/pageComponents/Home/index.jsx`.
3. Convert static sections one by one into React components.
4. Move repeated content into `src/constants/Home/index.js`.
5. Convert images and links to Next-compatible paths.
6. Preserve the current section order and copy.

### Phase 5: Convert Interactive Behavior

1. Add `useScrolledHeader` for sticky header shadow.
2. Add reveal-on-scroll behavior using `IntersectionObserver` inside a React hook.
3. Convert FAQ accordion to React state.
4. Convert countdown timer to `useCountdown`.
5. Convert register CTA clicks to scroll the registration form into view.
6. Keep WhatsApp float as a normal external link.

### Phase 6: Form And Tracking Readiness

1. Build controlled registration form fields.
2. Add basic client-side validation.
3. Capture UTM parameters using `useUTMSource`, following the VLS Practice reference.
4. Prepare service/API folder for backend registration integration.
5. Add event hooks for GTM if required, for example `mact_register_submit`.

### Phase 7: Verification

1. Run `npm install`.
2. Run `npm run dev` and verify the home page visually.
3. Run `npm run build`.
4. Confirm there is no preloader/loading screen.
5. Confirm local fonts load from `/fonts`.
6. Confirm all public images load.
7. Confirm GTM and Clarity scripts are present only when env variables exist.
8. Confirm all CTA buttons scroll to the registration form.
9. Confirm FAQ and countdown work without direct DOM manipulation.

## Acceptance Checklist

- [ ] Next.js Pages Router project structure matches the VLS Practice reference.
- [ ] `index.html` UI is accurately converted into React sections.
- [ ] Header and footer are global via `_app.jsx`.
- [ ] Home route is composed through `src/pageComponents/Home/index.jsx`.
- [ ] Static content is moved into constants where practical.
- [ ] Fonts remain local Inter and Montserrat.
- [ ] Assets are served from `public`.
- [ ] Preloader/loading screen is removed.
- [ ] GTM is added with `next/script`.
- [ ] GTM noscript fallback is added in `_document.jsx`.
- [ ] Microsoft Clarity is added with `next/script`.
- [ ] FAQ, countdown, reveal animation, and sticky header are React-safe.
- [ ] Registration CTA behavior works across all sections.
- [ ] Production build succeeds.

## Notes For Implementation

- Keep the current static `index.html` until the Next.js version is verified.
- Avoid importing browser-only code at module level.
- Do not use inline `onclick` handlers in JSX.
- Do not access `window` or `document` outside `useEffect`.
- Keep the MACT project content specific to Motor Accident Claims Practice; do not copy VLS Practice page content.
- Use the VLS Practice project only as the folder/component/analytics architecture reference.