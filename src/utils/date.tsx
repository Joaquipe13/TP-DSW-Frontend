import React from "react";

interface DateComponentProps {
  date: Date;
  style?: object | undefined;
}

export const DateComponent: React.FC<DateComponentProps> = ({
  date,
  style,
}) => {
  // Formatea la fecha
  const newDate = new Date(date);
  const formattedDate = newDate
    ? newDate.toLocaleDateString("es-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Date not available";
  return <span style={style}>{formattedDate}</span>;
};
