import React from "react";

import MyCalendar from "@/components/calendar";

const HomePage = () => {
  return (
    <div className="flex w-full px-10 mx-auto divide-x-2 gap-10 h-screen">
      <MyCalendar></MyCalendar>
      {/* Schedule */}
      <div className="h-96 w-96 px-5">
        <h1>Schedule for today</h1>
        <p>Nothing for today</p>
      </div>
    </div>
  );
};

export default HomePage;
