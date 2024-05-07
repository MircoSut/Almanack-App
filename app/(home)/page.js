"use client";
import React, { useState } from "react";
import MyCalendar from "@/components/calendar";
import dayjs from "dayjs";

const HomePage = () => {
  const currentDate = dayjs();
  const [selectDate, setSelectDate] = useState(currentDate);

  const handleSelectDate = (date) => {
    setSelectDate(date);
  };

  return (
    <div className="flex w-full px-10 mx-auto divide-x-2 gap-10 h-screen">
      <MyCalendar onSelectDate={handleSelectDate} selectDate={selectDate} />
      {/* Schedule */}
      <div className="h-96 w-96 px-5">
        <h1 className="font-semibold text-purple-500">
          Schedule for {selectDate.toDate().toDateString()}
        </h1>
        <p>Nothing for today</p>
      </div>
    </div>
  );
};

export default HomePage;
