import Head from 'next/head';

export default function MetaTitle() {
  const title = 'MACT Masterclass — Motor Accident Claims Practice | VLS Law Academy';
  const description = 'Master MACT procedure in 3 hours — Sarla Verma formulas, negligence proof, petition drafting & insurance tactics. Tamil medium. ₹499 only.';

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content="/assets/images/banner-img.jpg" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content="/assets/images/banner-img.jpg" />
    </Head>
  );
}