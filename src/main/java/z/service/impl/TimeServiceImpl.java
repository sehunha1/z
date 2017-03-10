package z.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import z.dao.TimeDao;
import z.domain.Time;
import z.service.TimeService;

@Service
public class TimeServiceImpl implements TimeService {
  @Autowired TimeDao timeDao;

  public Time getTime(int meetingNo) throws Exception {
    return timeDao.getTime(meetingNo);
  }
}