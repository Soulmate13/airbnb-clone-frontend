import { GetServerSideProps, NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/Layout/Layout';
import Review from '../../components/Review/Review';
import { sanityClient } from '../../sanity';
import { Property } from '../../types';
import { isSingular } from '../../utils/validation';
import { urlFor } from '../../sanity';
import Map from '../../components/Map/Map';

interface IProps {
    property: Property
}

const Property: NextPage<IProps> = ({ property }) => {
  const reviewsAmount = property.review?.length;
  const secondaryImagesToShow = property.images.slice(0, 4);

  return (
    <Layout title={`${property.title} - Airbnb clone project`} description={`Property ${property.title} on Airbnb clone project`}>
      <div className="container">
        <h1><b>{property.title}</b></h1>
        <h2>
          {reviewsAmount} review{isSingular(reviewsAmount)}
        </h2>
        <section className="images-section">
          <div className="main-image">
            <Image src={urlFor(property.mainImage)} layout="fill" objectFit="cover" priority sizes="50vw" alt="main property image"/>
          </div>
          <div className="sub-images-section">
            {secondaryImagesToShow.map(({ _key, asset }) => (
              <div className="sub-image" key={_key}>
                <Image src={urlFor(asset)} className="image" layout="fill" objectFit="cover" sizes="25vw" priority alt="secondary property images"/>
              </div>
            ))}
          </div>
        </section>
        <section className="section">
          <div className="information">
            <h2><b>{property.propertyType}</b></h2>
            <h3>{property.bedrooms} bedroom{isSingular(property.bedrooms)} * {property.beds}
              bed{isSingular(property.beds)}</h3>
            <hr/>
            <h4>
              <b>Enhanced Clean</b>
            </h4>
            <p>
              This host is committed to Airbnb&apos;s 5-step enhanced cleaning process.
            </p>
            <h4>
              <b>Amenities for everyday living</b>
            </h4>
            <p>
              The host has equipped this place for long stays - kitchen, shampoo,
              conditioner, hairdryer included.
            </p>
            <h4>
              <b>House rules</b>
            </h4>
            <p>
              This place isn&apos;t suitable for pets and the host does not allow
              parties or smoking.
            </p>
          </div>
          <div className="price-box">
            <h4>£{property.pricePerNight}</h4>
            <h4>
              {reviewsAmount} review{isSingular(reviewsAmount)}
            </h4>
            <Link href="/" passHref>
              <button className="button">Change Dates</button>
            </Link>
          </div>
        </section>

        <hr />
        <section>
          <h4>{property.description}</h4>

          <hr />

          <h4>
            {reviewsAmount} review{isSingular(reviewsAmount)}
          </h4>

          {reviewsAmount > 0 && <div className="reviews-wrapper">
            {property.review.map((review) => <Review key={review._key} {...review} />)}
            </div>}
        </section>
        <section>
          <h2>Location</h2>

          <Map latLang={{ lat: property.location.lat, lng: property.location.lng }}/>
        </section>

      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async(context) => {
  const slug = context.query.slug;
  const query = `*[_type == "property" && slug.current == $slug][0]{
    title,
    location,
    propertyType,
    mainImage,
    images,
    pricePerNight,
    beds,
    bedrooms,
    description,
    host->{
      _id,
      fullName,
      slug,
      photo
    },
    review[]{
      ...,
      traveller->{
        _id,
        fullName,
        slug,
        photo
      }
    }
  }`;
  const property: Property = await sanityClient.fetch(query, { slug });

  if (!property) {
    return {
      notFound: true,
      props: null
    };
  } else {
    return {
      props: {
        property
      }
    };
  }
};

export default Property;
