import { NotificationMessage } from "../electron";

export default {
  setup() {
    if (!("Notification" in window)) {
      console.error("This browser does not support notifications!");
    } else if (Notification.permission === "granted") {
      return;
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          console.log("Permission for notifications is granted.");
        }
      });
    }
  },

  show({ title, body }: NotificationMessage) {
    new Notification(title, { body });
  },
};
