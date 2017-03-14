package z.dao;

import z.domain.Calendar;

import java.util.List;

public interface CalendarDao {
    List<Calendar> getDateDuplication(int meetingNo) throws Exception;
    List<Calendar> getSelectedDateInfo(int meetingNo) throws Exception;
    int deleteCal(int meetingNo) throws Exception;
    int insertCal(Calendar calendar) throws Exception;
}
