"use client";
import React, { useState } from "react";
import { generateDate, months } from "@/lib/calendar";
import cn from "@/lib/cn";
import dayjs from "dayjs";

const MyCalendar = ({ onSelectDate }) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const currentDate = dayjs();
  const [today, setToday] = useState(currentDate);
  const [inputValue, setInputValue] = useState("");
  const [selectDate, setSelectDate] = useState(currentDate);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleGoButtonClick = () => {
    // Extract month and year from input value
    const [month, year] = inputValue.split("/");

    // Validate input values
    const parsedMonth = parseInt(month);
    const parsedYear = parseInt(year);

    if (isNaN(parsedMonth) || parsedMonth < 1 || parsedMonth > 12) {
      alert("Please enter a valid month (1-12)");
    }
    if (isNaN(parsedYear) || parsedYear < 0) {
      alert("Please enter a valid year");
    }

    // Update calendar to specified month and year
    setToday(
      dayjs()
        .year(parsedYear)
        .month(parsedMonth - 1)
    ); // Month is 0-indexed in dayjs
  };

  const handleDayClick = (date) => {
    onSelectDate(date); // Pass the selected date to the parent component
  };

  return (
    <div className="w-96 h-96">
      {/* Help bar */}
      <div className="flex justify-center">
        {/* arrow buttons + current month displayed */}
        <div className="w-full flex justify-between">
          <span
            className="cursor-pointer text-teal-500 text-xl font-bold"
            onClick={() => {
              setToday(today.year(today.year() - 1));
            }}
          >
            {"<<"}
          </span>
          <span
            className="cursor-pointer text-teal-500 text-xl font-bold"
            onClick={() => {
              setToday(today.month(today.month() - 1));
            }}
          >
            {"<"}
          </span>
          <h1 className="font-bold text-purple-500 text-xl">
            {months[today.month()]} {today.year()}
          </h1>
          <span
            className="cursor-pointer text-teal-500 text-xl font-bold"
            onClick={() => {
              setToday(today.month(today.month() + 1));
            }}
          >
            {">"}
          </span>
          <span
            className="cursor-pointer text-teal-500 text-xl font-bold"
            onClick={() => {
              setToday(today.year(today.year() + 1));
            }}
          >
            {">>"}
          </span>
        </div>
      </div>
      {/* Week days */}
      <div className="w-full grid grid-cols-7 font-bold">
        {days.map((day, index) => {
          let textColorClass;
          switch (index) {
            case 0: // Sunday
              textColorClass = "text-red-500";
              break;
            case 1: // Monday
              textColorClass = "text-orange-500";
              break;
            case 2: // Tuesday
              textColorClass = "text-yellow-500";
              break;
            case 3: // Wednesday
              textColorClass = "text-green-500";
              break;
            case 4: // Thursday
              textColorClass = "text-blue-500";
              break;
            case 5: // Friday
              textColorClass = "text-indigo-500";
              break;
            case 6: // Saturday
              textColorClass = "text-purple-500";
              break;
            default:
              textColorClass = ""; // Default color
          }

          return (
            <h1
              key={index}
              className={`h-14 grid place-content-center ${textColorClass}`}
            >
              {day}
            </h1>
          );
        })}
      </div>

      {/* Days number */}
      <div className="w-full grid grid-cols-7">
        {generateDate(today.month(), today.year()).map(
          ({ date, currentMonth, today }, index) => {
            return (
              <div
                key={index}
                className="h-14 border-t grid place-content-center"
              >
                <h1
                  className={cn(
                    currentMonth ? "" : "text-gray-400",
                    today ? "bg-purple-500 text-white" : "",
                    selectDate.toDate().toDateString() ===
                      date.toDate().toDateString()
                      ? "bg-black text-white"
                      : "",
                    "h-10 w-10 grid place-content-center rounded-full hover:bg-teal-400 hover:text-white transition-all cursor-pointer"
                  )}
                  onClick={() => {
                    handleDayClick(date);
                  }}
                >
                  {date.date()}
                </h1>
              </div>
            );
          }
        )}
      </div>
      {/* goto and today */}
      <div className="w-full flex items-center justify-between px-4">
        {/* goto */}
        <div className="flex items-center overflow-hidden rounded-md border-2 border-purple-500">
          <input
            className="w-28 px-2"
            placeholder="mm/yyyy"
            value={inputValue}
            onChange={handleInputChange}
          ></input>
          <button
            className="cursor-pointer border-l-2 border-purple-500 px-2 hover:text-white hover:bg-purple-500"
            onClick={handleGoButtonClick}
          >
            Go
          </button>
        </div>
        {/* today */}
        <div
          className="cursor-pointer rounded-md border-2 border-purple-500 px-2 hover:text-white hover:bg-purple-500"
          onClick={() => {
            setToday(currentDate);
          }}
        >
          Today
        </div>
      </div>
    </div>
  );
};

export default MyCalendar;
