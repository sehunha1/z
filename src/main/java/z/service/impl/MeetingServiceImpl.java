package z.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import z.dao.MeetingDao;
import z.domain.Meeting;
import z.service.MeetingService;

@Service
public class MeetingServiceImpl implements MeetingService {
  
  @Autowired MeetingDao meetingDao;

  @Override
  public int add(Meeting meeting) throws Exception {
    meetingDao.insertmeet(meeting);
    return meetingDao.inserttime(meeting);
  }

}
