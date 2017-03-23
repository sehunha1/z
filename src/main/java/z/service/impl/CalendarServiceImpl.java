package z.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import z.dao.CalendarDao;
import z.domain.Calendar;
import z.service.CalendarService;

import java.util.List;

@Service
public class CalendarServiceImpl implements CalendarService {
  @Autowired CalendarDao calendarDao;

  @Override
  public List<Calendar> getDateDuplication(int meetingNo) throws Exception {
    return calendarDao.getDateDuplication(meetingNo);
  }

  @Override
  public List<Calendar> getSelectedDateInfo(int meetingNo) throws Exception {
    return calendarDao.getSelectedDateInfo(meetingNo);
  }

  @Override
  public int deleteCal(int meetingNo) throws Exception {
    return calendarDao.deleteCal(meetingNo);
  }

  @Override
  public int insertCal(Calendar calendar) throws Exception {
    return calendarDao.insertCal(calendar);
  }

  @Override
  public int isDuplicate(int meetingNo) throws Exception {
    return calendarDao.isDuplicate(meetingNo);
  }

  @Override
  public int getCheckCal(int memberNo, int meetingNo) throws Exception {
    return calendarDao.getCheckCal(memberNo, meetingNo);
  }
}
