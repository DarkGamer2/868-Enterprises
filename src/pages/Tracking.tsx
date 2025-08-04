import NavigationBar from '../components/NavigationBar';
import Footer from '../components/Footer';
import Tracker from '../components/Tracker';

const Tracking = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavigationBar />
      <div className="flex-grow">
        <Tracker />
      </div>
      <Footer />
    </div>
  );
};

export default Tracking;