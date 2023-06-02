import { parseISO, formatDistanceToNow } from "date-fns/esm";

import React from "react";

const TimeAgo = ({ timestamp }) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }
  return <>{timeAgo}</>;
};

export default TimeAgo;
