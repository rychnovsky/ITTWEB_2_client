export class Alert {
  type: AlertType;
  message: string;
  keepAfterRouteChange: boolean;

  constructor(init?: Partial<Alert>) {
    Object.assign(this, init);
  }
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning,
}
