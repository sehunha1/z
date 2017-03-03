package z.dao;

import z.domain.Calendar;

import java.util.List;

public interface CalendarDao {
    List<Calendar> getDateDuplication(int meetingNo) throws Exception;
}
