"use client";
import React, { useState } from "react";
import { generateDate, months } from "@/lib/calendar";
import cn from "@/lib/cn";
import dayjs from "dayjs";

const MyCalendar = () => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  return (
    <div className="w-96 h-96">
      {/* Help bar */}
      <div className="flex justify-center">
        {/* arrow buttons + current month displayed */}
        <div className="w-full flex justify-between">
          <span className="cursor-pointer text-teal-500 text-xl font-bold">
            {"<<"}
          </span>
          <span className="cursor-pointer text-teal-500 text-xl font-bold">
            {"<"}
          </span>
          <h1 className="font-bold text-purple-500 text-xl">
            {months[today.month()]} {today.year()}
          </h1>
          <span className="cursor-pointer text-teal-500 text-xl font-bold">
            {">"}
          </span>
          <span className="cursor-pointer text-teal-500 text-xl font-bold">
            {">>"}
          </span>
        </div>
      </div>
      {/* Week days */}
      <div className="w-full grid grid-cols-7 font-bold">
        {days.map((day, index) => {
          return (
            <h1 key={index} className="h-14 grid place-content-center">
              {day}
            </h1>
          );
        })}
      </div>
      {/* Days number */}
      <div className="w-full grid grid-cols-7">
        {generateDate().map(({ date, currentMonth, today }, index) => {
          return (
            <div
              key={index}
              className="h-14 border-t grid place-content-center"
            >
              <h1
                className={cn(
                  currentMonth ? "" : "text-gray-400",
                  today ? "bg-purple-500 text-white" : "",
                  "h-10 w-10 grid place-content-center rounded-full hover:bg-teal-400 hover:text-white transition-all cursor-pointer"
                )}
              >
                {date.date()}
              </h1>
            </div>
          );
        })}
      </div>
      {/* goto and today */}
      <div className="w-full flex items-center justify-between px-4">
        {/* goto */}
        <div className="flex items-center overflow-hidden rounded-md border-2 border-purple-500">
          <input className="w-28 px-2" placeholder="mm/yyyy"></input>
          <button className="cursor-pointer border-l-2 border-purple-500 px-2 hover:text-white hover:bg-purple-500">
            Go
          </button>
        </div>
        {/* today */}
        <div className="cursor-pointer rounded-md border-2 border-purple-500 px-2 hover:text-white hover:bg-purple-500">
          Today
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
