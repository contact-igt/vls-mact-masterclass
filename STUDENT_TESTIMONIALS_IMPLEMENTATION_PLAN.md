# Student Testimonials Section Implementation Plan

Document created on: 2026-07-06

## Goal

Create a student testimonial section for the MACT Masterclass Next.js project using the provided VLS Practice testimonial reference.

The new section should be a video-style testimonial carousel with thumbnail cards, a centered play button, and a popup video modal. It should replace the current text-card testimonial UI and should be rendered immediately after the FAQ section.

## Current MACT Project State

The current MACT project already has a testimonial section:

```text
src/component/testimonial/index.jsx
```

Current behavior:

- Displays three text testimonial cards.
- Uses local thumbnail images as small avatar images.
- Renders after `CountdownCta` in `src/pageComponents/Home/index.jsx`.
- Does not use carousel, video modal, play button, or popup behavior.

Current render order:

```jsx
<FAQ />
<CountdownCta />
<Testimonial />
```

Required render order:

```jsx
<FAQ />
<Testimonial />
<CountdownCta />
```

## Reference To Follow

Use the VLS Practice testimonial reference structure and behavior:

- `react-slick` carousel.
- `slick-carousel` global CSS.
- Thumbnail card with dark overlay.
- Centered circular play button.
- Play icon from `lucide-react`.
- Reusable `TestimonialCard` component.
- Reusable `Popup` component.
- Video modal with close button.
- CTA button below the carousel.

## Packages To Install

The MACT project currently has only these relevant dependencies:

```json
{
  "next": "^16.2.6",
  "react": "^18.3.1",
  "react-countup": "^6.5.3",
  "react-dom": "^18.3.1"
}
```

Install the testimonial packages from the reference:

```bash
npm install react-slick slick-carousel lucide-react bootstrap
```

## Global CSS Imports

Update `src/pages/_app.jsx` to include Slick and Bootstrap styles:

```jsx
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
```

Keep the existing project global CSS import:

```jsx
import '@/styles/globals.css';
```

Recommended order:

```jsx
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@/styles/globals.css';
```

## Asset Plan

Use the testimonial images already available in this project:

```text
public/assets/images/testimonialimg1.jpg
public/assets/images/testimonialimg2.png
public/assets/images/testimonialimg3.png
```

Reference them from React without `public`:

```js
'/assets/images/testimonialimg1.jpg'
'/assets/images/testimonialimg2.png'
'/assets/images/testimonialimg3.png'
```

If the final required filenames are exactly `testimonial1.png`, `testimonial2.png`, and `testimonial3.png`, then add or rename the files inside:

```text
public/assets/images/
```

Until those exact files exist, use the existing project image names above.

## Video Data Plan

Add video URLs to the testimonial data. If final MACT-specific videos are not ready, temporarily use the VLS Practice reference video URLs and replace them later.

Recommended data format in `src/constants/Home/index.js`:

```js
export const videoTestimonials = [
  {
    name: 'Our Students',
    description: 'Student testimonial for VLS Law Academy MACT Masterclass.',
    imgUrl: '/assets/images/testimonialimg1.jpg',
    videoUrl: 'https://res.cloudinary.com/dd3olj1ax/video/upload/v1761892348/vls-testimonal3_ajrnrk.mp4',
  },
  {
    name: 'Our Students',
    description: 'Student testimonial for VLS Law Academy MACT Masterclass.',
    imgUrl: '/assets/images/testimonialimg2.png',
    videoUrl: 'https://res.cloudinary.com/dd3olj1ax/video/upload/v1762343697/vls_testimonal4_fmdamk.mp4',
  },
  {
    name: 'Our Students',
    description: 'Student testimonial for VLS Law Academy MACT Masterclass.',
    imgUrl: '/assets/images/testimonialimg3.png',
    videoUrl: 'https://res.cloudinary.com/dd3olj1ax/video/upload/v1761891831/vls-testimoanl1_ddcvpb.mp4',
  },
];
```

## Files To Create

Create these reference-style reusable files:

```text
src/common/TestimonialCard/index.jsx
src/common/TestimonialCard/styles.module.css
src/common/Popup/index.jsx
src/common/Popup/styles.module.css
src/common/Title/index.jsx
src/common/Title/styles.module.css
src/component/testimonial/styles.module.css
```

The existing file below should be replaced with the video carousel implementation:

```text
src/component/testimonial/index.jsx
```

## Testimonial Section Placement

Update `src/pageComponents/Home/index.jsx`.

Current order:

```jsx
<FAQ />
<CountdownCta />
<Testimonial />
```

New order:

```jsx
<FAQ />
<Testimonial />
<CountdownCta />
```

This places the student testimonial section immediately after FAQ, as requested.

## Testimonial Component Plan

Update `src/component/testimonial/index.jsx` to use:

- `useState` for modal state.
- `Slider` from `react-slick`.
- `TestimonialCard` for each thumbnail.
- `Popup` for video playback.
- Existing shared `Button` for the CTA.
- `videoTestimonials` from `src/constants/Home/index.js`.

Planned structure:

```jsx
import { useState } from 'react';
import Slider from 'react-slick';
import Button from '@/common/Button';
import Popup from '@/common/Popup';
import TestimonialCard from '@/common/TestimonialCard';
import Title from '@/common/Title';
import { videoTestimonials } from '@/constants/Home';
import styles from './styles.module.css';

export default function Testimonial() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openModal = (videoUrl) => {
    setSelectedVideo(videoUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedVideo(null);
    setIsModalOpen(false);
  };

  const settings = {
    dots: false,
    infinite: false,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: false,
    speed: 500,
    centerMode: videoTestimonials.length === 1,
    centerPadding: '0px',
    cssEase: 'linear',
    responsive: [
      { breakpoint: 1200, settings: { slidesToShow: 2.5, slidesToScroll: 1 } },
      { breakpoint: 992, settings: { slidesToShow: 1.7, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 1.2, slidesToScroll: 1 } },
      { breakpoint: 576, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  return (
    <section className={styles.testimonalsec}>
      <div className="wrap">
        <div className={styles.titleWrap}>
          <Title title1="Our Student" spantitle="Testimonials" />
        </div>

        <div className={styles.testimonialContainer}>
          <Slider {...settings} className={styles.sliderWrapper}>
            {videoTestimonials.map((item) => (
              <div key={item.imgUrl} className={styles.slideWrapperItem}>
                <TestimonialCard
                  imageSrc={item.imgUrl}
                  openModal={() => openModal(item.videoUrl)}
                  name={item.name}
                  testimonial={item.description}
                />
              </div>
            ))}
          </Slider>
        </div>

        <div className={styles.ctaWrap}>
          <Button className="btn--red btn--lg">Enroll Now ₹499</Button>
        </div>
      </div>

      <Popup open={isModalOpen} onClose={closeModal} variant="video">
        <button className={styles.closeButton} onClick={closeModal} type="button">
          ✖
        </button>
        {selectedVideo ? (
          <video width="100%" height="500px" controls autoPlay>
            <source src={selectedVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : null}
      </Popup>
    </section>
  );
}
```

## Testimonial Card Plan

Create `src/common/TestimonialCard/index.jsx`:

```jsx
import { Play } from 'lucide-react';
import styles from './styles.module.css';

export default function TestimonialCard({ imageSrc, openModal, name = 'Student testimonial' }) {
  return (
    <article className={styles.testimonialCard}>
      <img src={imageSrc} alt={name} className={styles.image} />
      <button className={styles.playButton} onClick={openModal} type="button" aria-label={`Play ${name} video`}>
        <Play fill="#b20a0a" color="#b20a0a" size={32} />
      </button>
    </article>
  );
}
```

## Popup Plan

Create `src/common/Popup/index.jsx`:

```jsx
import styles from './styles.module.css';

export default function Popup({ open, onClose, children, variant = 'default' }) {
  if (!open) return null;

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div className={`${styles.popup} ${styles[variant] || ''}`} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
        {children}
      </div>
    </div>
  );
}
```

## Title Plan

Create `src/common/Title/index.jsx`:

```jsx
import styles from './styles.module.css';

export default function Title({ title1, spantitle }) {
  return (
    <h2 className={styles.title}>
      {title1} <span>{spantitle}</span>
    </h2>
  );
}
```

Style this component to match the existing MACT section heading style:

```css
.title {
  font-family: var(--ff-head);
  font-size: clamp(22px, 2.8vw, 36px);
  font-weight: 800;
  line-height: 1.2;
  color: var(--dk);
  text-align: center;
}

.title span {
  color: var(--red);
}
```

## Styling Plan

### `src/component/testimonial/styles.module.css`

Use the reference layout but adapt colors to the MACT project:

```css
.testimonalsec {
  background: var(--ow);
  padding: 90px 0;
}

.titleWrap {
  display: flex;
  justify-content: center;
  text-align: center;
}

.testimonialContainer {
  margin-top: 40px;
}

.slideWrapperItem {
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  width: 100% !important;
  padding: 10px;
  box-sizing: border-box;
}

.ctaWrap {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 48px;
}

.closeButton {
  position: absolute;
  top: -44px;
  right: 0;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: var(--red);
  color: var(--white);
  cursor: pointer;
}
```

### `src/common/TestimonialCard/styles.module.css`

Use the reference card style:

```css
.testimonialCard {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  max-width: 360px;
  height: 480px;
  border-radius: var(--r);
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  transition: transform 0.3s ease;
}

.testimonialCard:hover {
  transform: translateY(-4px);
}

.testimonialCard::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.82), transparent 70%);
  pointer-events: none;
}

.image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.playButton {
  position: absolute;
  z-index: 2;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 72px;
  height: 72px;
  border: none;
  border-radius: 50%;
  background: var(--white);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}
```

### `src/common/Popup/styles.module.css`

```css
.overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.75);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.popup {
  position: relative;
  width: min(920px, 100%);
  background: var(--black);
  border-radius: var(--r);
}

.video video {
  display: block;
  max-height: 70vh;
  border-radius: var(--r);
}
```

## Existing CSS Cleanup

After the new carousel is implemented, remove or stop using old testimonial global classes from `src/styles/globals.css` if they are no longer used:

```css
.testi-grid
.testi-card
.testi-stars
.testi-text
.testi-author
.testi-av
.testi-name
.testi-role
```

This cleanup is optional but recommended after verifying no component still uses those classes.

## Implementation Steps

1. Install `react-slick`, `slick-carousel`, `lucide-react`, and `bootstrap`.
2. Import Slick and Bootstrap CSS in `src/pages/_app.jsx`.
3. Add `videoTestimonials` to `src/constants/Home/index.js`.
4. Create `Popup`, `TestimonialCard`, and `Title` shared components.
5. Replace `src/component/testimonial/index.jsx` with the carousel/modal implementation.
6. Add `src/component/testimonial/styles.module.css`.
7. Move `<Testimonial />` so it renders immediately after `<FAQ />`.
8. Test the CTA button still scrolls to the hero registration form.
9. Test each play button opens the correct video.
10. Test the modal closes through the close button and outside click.
11. Run `npm run build`.

## Acceptance Checklist

- [ ] Testimonial section appears immediately after FAQ.
- [ ] Section title reads `Our Student Testimonials`.
- [ ] Three thumbnail cards display using project images.
- [ ] Cards render inside a responsive carousel.
- [ ] Each card has a centered play button.
- [ ] Clicking play opens a popup modal.
- [ ] Popup plays the selected MP4 video.
- [ ] Popup closes via close button.
- [ ] Popup closes by clicking outside modal content.
- [ ] CTA button below carousel says `Enroll Now ₹499`.
- [ ] CTA scrolls to the registration form.
- [ ] Mobile layout shows one testimonial card cleanly.
- [ ] `npm run build` passes.

## Notes

- The reference document spells `Testimonals`; use the corrected spelling `Testimonials` in the MACT UI.
- The current project image names are `testimonialimg1.jpg`, `testimonialimg2.png`, and `testimonialimg3.png`, not `testimonial1.png`, `testimonial2.png`, and `testimonial3.png`.
- If exact `testimonial1/2/3.png` filenames are required, add those files first or rename the existing assets before implementation.
- Keep the visual language aligned with the MACT page: red CTA color, black overlays, local fonts, and 8px border radius.