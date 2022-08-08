import React,{ useState } from 'react';
import Spline from '@splinetool/react-spline';

const SplineSection = () => {
  // const [spline, setSpline] = useState();

  // function triggerAnimation() {
  //   spline.emitEvent('mouseHover', '8E8C2DDD-18B6-4C54-861D-7ED2519DE20E');
  // }

  return (
    <div className="">
      <Spline scene="https://prod.spline.design/2PPIdBzs0CXumg2p/scene.splinecode" />

    </div>
  );
}

export default SplineSection;