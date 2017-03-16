package z.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import z.dao.LinkDao;
import z.domain.Link;
import z.service.LinkService;

@Service
public class LinkServiceImpl implements LinkService {
  @Autowired LinkDao linkDao;

  public List<Link> getBoss(int memberNo) throws Exception {
    return linkDao.getBoss(memberNo);
  }

  public int getVotedCount(int meetingNo) throws Exception {
    return linkDao.getVotedCount(meetingNo);
  }

  public int getEntireCount(int meetingNo) throws Exception {
    return linkDao.getEntireCount(meetingNo);
  }

  public int getMyUnvoteCount(int memberNo) throws Exception {
    return linkDao.getMyUnvoteCount(memberNo);
  }
  
  public int getMyInviteCount(int memberNo) throws Exception {
    return linkDao.getMyInviteCount(memberNo);
  }

  public int updateStat(int memberNo2, int meetingNo) throws Exception {
    return linkDao.updateStat(memberNo2, meetingNo);
  }
}
