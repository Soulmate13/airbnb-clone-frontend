import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="logo-wrap">
        <Image src="/images/airbnb-logo.png" width="130px" height="40px" className="logo" alt="airbnb company logo"/>
      </div>
    </nav>
  );
};

export default Navbar;
