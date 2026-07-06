import { useEffect, useState } from 'react';
import MetaTitle from '@/common/Meta/MetaTitle';
import RegisterSticky from '@/common/RegisterSticky';
import WhatsAppFloat from '@/common/WhatsAppFloat';
import Banner from '@/component/banner';
import CountdownCta from '@/component/countdownCta';
import FAQ from '@/component/faq';
import FastFact from '@/component/fastfact';
import GapFix from '@/component/gapFix';
import Speaker from '@/component/speaker';
import Testimonial from '@/component/testimonial';
import WhatLearn from '@/component/whatlearn';
import WhoJoin from '@/component/whoJoin';
import WhyCourse from '@/component/whycourse';
import WhyVls from '@/component/whyvls';
import useRevealOnScroll from '@/hooks/useRevealOnScroll';
import { clearPaymentDetails } from '@/utils/paymentStorage';

export default function Home() {
  const [ipAddress, setIpAddress] = useState('');

  useRevealOnScroll();

  useEffect(() => {
    clearPaymentDetails();

    fetch('https://api.ipify.org?format=json')
      .then((response) => response.json())
      .then((data) => setIpAddress(data.ip || ''))
      .catch(() => setIpAddress(''));
  }, []);

  return (
    <>
      <MetaTitle />
      <Banner ipAddress={ipAddress} />
      <FastFact />
      <WhyCourse />
      <GapFix />
      <WhatLearn />
      <Speaker />
      <WhoJoin />
      <WhyVls />
      <FAQ />
      <Testimonial />
      <CountdownCta />
      <RegisterSticky />
      <WhatsAppFloat />
    </>
  );
}