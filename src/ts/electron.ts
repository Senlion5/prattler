export interface MyElectron {
  notificationApi: {
    sendNotification: (message: NotificationMessage) => void;
  };
  appApi: {
    quitApp: () => void;
  };
}

export interface NotificationMessage {
  title: string;
  body: string;
}

const electron = (window as any).electron as MyElectron;

export default electron;
