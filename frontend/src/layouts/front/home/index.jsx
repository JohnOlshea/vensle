import { useState } from "react";

import Header from "components/front/header/Header";
import Sliders from "components/front/sliders/Sliders";
import FirstBanner from "components/front/firstBanner/FirstBanner";
import SecondBanner from "components/front/secondBanner/SecondBanner";
import Subscribe from "components/front/subscribe/Subscribe";
import Footer from "components/front/footer/Footer";

const Home = () => {
  const [activePill, setActivePill] = useState(1)

  return (
    <div className="min-h-full">
      <Header activePill={activePill} setActivePill={setActivePill} />
      <Sliders activePill={activePill} setActivePill={setActivePill} />
      <FirstBanner />
      <SecondBanner />
      <Subscribe />
      <Footer />
    </div>
  );
};

export default Home;
