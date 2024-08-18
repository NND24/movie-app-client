import Header from "../components/Header";
import Heading from "../components/Heading";

type Props = {};

const NotFound = (props: Props) => {
  return (
    <div>
      <Heading title='404 NOT FOUND' description='' keywords='' icon='../../public/favicon.ico' />
      <Header />
      <img src='../../public/notFound.jpg' className='w-screen h-screen' alt='' />
    </div>
  );
};

export default NotFound;
