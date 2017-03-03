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
}
