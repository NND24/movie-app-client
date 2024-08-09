import Footer from "../components/Footer";
import Header from "../components/Header";
import Heading from "../components/Heading";
import Hero from "../components/Hero";

type Props = {};

const Home = (props: Props) => {
  return (
    <div>
      <Heading title='MOVIE APP' description='' keywords='' />
      <Header />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
