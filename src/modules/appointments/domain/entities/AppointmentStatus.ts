export enum AppointmentStatusEnum {
  PROPOSED = 1,
  APPROVED,
  REJECTED,
  CANCELED,
}

class AppointmentStatus {
  id: number;
  code: string;
  title: string;
}

export default AppointmentStatus;
