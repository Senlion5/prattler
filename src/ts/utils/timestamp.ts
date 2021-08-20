import { Timestamp } from "../db/firestore";
import moment from "moment";

export const createTimestamp = () => Timestamp.now().toMillis().toString();

export const formatTime = (timestamp: string) =>
  moment(parseInt(timestamp, 10)).fromNow();
