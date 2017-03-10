package z.service;

import z.domain.Calendar;

import java.util.List;

public interface CalendarService {
    List<Calendar> getDateDuplication(int meetingNo) throws Exception;
    List<Calendar> getSelectedDateInfo(int meetingNo) throws Exception;
}