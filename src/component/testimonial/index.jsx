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
    <section className={styles.testimonalsec} id="testimonials">
      <div className="wrap">
        <div className={`${styles.titleWrap} reveal`}>
          <Title title1="Our Student" spantitle="Testimonials" />
        </div>

        <div className={`${styles.testimonialContainer} reveal`} style={{ transitionDelay: '.12s' }}>
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

        <div className={`${styles.ctaWrap} reveal`} style={{ transitionDelay: '.18s' }}>
          <Button className="btn--red btn--lg">Enroll Now ₹499</Button>
        </div>
      </div>

      <Popup open={isModalOpen} onClose={closeModal} variant="video">
        <button className={styles.closeButton} onClick={closeModal} type="button" aria-label="Close testimonial video">
          ✕
        </button>
        {selectedVideo ? (
          <video className={styles.videoPlayer} controls autoPlay>
            <source src={selectedVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : null}
      </Popup>
    </section>
  );
}