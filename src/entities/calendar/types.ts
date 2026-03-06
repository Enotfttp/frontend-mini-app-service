export interface ICalendar {
  id: string;
  title: string;
  description?: string;
  dateTime: string;
  userId?: string;
}

export interface ICreateCalendarPayload {
  title: string;
  description?: string;
  dateTime: string;
  userId?: string;
}

// PUT /calendar-events — id передаётся в теле запроса (как в CalendarController)
export interface IUpdateCalendarPayload {
  id: string;
  title: string;
  description?: string;
  dateTime: string;
  userId?: string;
}
