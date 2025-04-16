import { DateFormatterProps } from "@/utils/interface";
import { BsCalendar2Date } from "react-icons/bs";

export const DateFormatter = ({length, dateString }: DateFormatterProps) => {
  const formattedDate = new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: length || "short", // Displays the full month name (e.g., "March")
    day: "numeric", // Displays the day of the month
  });

  return <span className="text-inherit text-md flex gap-2 items-center"><BsCalendar2Date className="text-inherit"/> {formattedDate}</span>;
};
