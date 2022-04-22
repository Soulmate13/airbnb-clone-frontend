import { urlFor } from '../../sanity';
import { Review } from '../../types';
import Image from 'next/image';
import { isSingular } from '../../utils/validation';

const Review = ({ reviewDescription, traveller, rating }: Review) => {
  return <div className="review-box">
    <h1>{rating} star{isSingular(rating)}</h1>
    <h2>{traveller?.fullName}</h2>
    <p>{reviewDescription}</p>
    <div className="avatar-wrapper">
      <Image src={urlFor(traveller?.photo)} layout="fill" objectFit="cover" alt={`User ${traveller.fullName} avatar`}/>
    </div>
  </div>;
};

export default Review;
