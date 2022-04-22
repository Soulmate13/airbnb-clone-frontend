import type { NextPage } from 'next';
import Link from 'next/link';
import DashboardMap from '../components/DashboardMap/DashboardMap';
import Layout from '../components/Layout/Layout';
import { sanityClient, urlFor } from '../sanity';
import { Property } from '../types';
import { isSingular } from '../utils/validation';
import Image from 'next/image';

interface IProps {
  properties: Array<Property>;
}

const Home: NextPage<IProps> = ({ properties }: IProps) => {
  const MapProperties = properties.map((property) => {
    return { id: property.id, coordinates: { lat: property.location.lat, lng: property.location.lng } };
  });

  return (properties &&
  <Layout title="Airbnb clone project" description="Airbnb clone project is a practice project made while learning Next.js, following Ania Kubów video.">
    <section className="main">
      <div className="feed-container">
        <h1>Places to stay near you</h1>
        <div className="feed">
          {properties.map((property) => (
            <Link href={`/property/${property.slug.current}`} key={property._id} passHref>
              <div className="card">
                <div className="img-wrapper">
                  <Image src={urlFor(property.mainImage)} priority layout="fill" objectFit="cover" sizes="250px" alt={`${property.title}`} />
                </div>
                <p>
                  {property.review.length} review
                  {isSingular(property.review.length)}
                </p>
                <h2>{property.title}</h2>
                <h3>
                  <b>£{property.pricePerNight}/per Night</b>
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="map">
        <DashboardMap propertiesMapInfo={MapProperties} />
      </div>
    </section>
  </Layout>
  );
};

export const getServerSideProps = async() => {
  const query = '*[_type == "property"]';
  const properties = await sanityClient.fetch(query);

  if (properties.length === 0) {
    return {
      props: {
        properties: []
      }
    };
  } else {
    return {
      props: {
        properties
      }
    };
  }
};

export default Home;
