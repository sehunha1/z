package z.service;

import z.domain.Calendar;

import java.util.List;

public interface CalendarService {
    List<Calendar> getDateDuplication(int meetingNo) throws Exception;
    List<Calendar> getSelectedDateInfo(int meetingNo) throws Exception;
    int deleteCal(int meetingNo) throws Exception;
    int insertCal(Calendar calendar) throws Exception;
    int isDuplicate(int meetingNo) throws Exception;
    int getCheckCal(int memberNo, int meetingNo) throws Exception;
}