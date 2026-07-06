import Button from '@/common/Button';
import { courseDetails } from '@/constants/Home';

export default function RegisterSticky() {
  return (
    <div className="enroll-bar">
      <div className="wrap enroll-bar__inner">
        <p>
          Motor Accident Claims Masterclass — <strong>{courseDetails.date}</strong>
        </p>
        <p className="px">
          <s>{courseDetails.originalPrice}</s>
          {courseDetails.offerPrice}
        </p>
        <Button className="btn--white btn--sticky">Enroll Now</Button>
      </div>
    </div>
  );
}