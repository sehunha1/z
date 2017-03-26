package z.service.impl;

import java.util.List;
import java.util.Map;

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

  public int refuse(int memberNo, int meetingNo) throws Exception {
    return linkDao.refuse(memberNo, meetingNo);
  }
  
  public int accept(int memberNo, int meetingNo) throws Exception {
    return linkDao.accept(memberNo, meetingNo);
  }
  
  // 멤버 초대시 link 테이블 데이터 삽입
  public int linkInsert(Map linkMembMap) throws Exception {
    int meetingNo = (int) linkMembMap.get("meetingNo");
    int[] linkMembNoList = (int[]) linkMembMap.get("linkMembList");
    int count = 0;
    for (int linkMembNo : linkMembNoList) {
      count = linkDao.linkInsert(meetingNo, linkMembNo);
      if (count != 1) {
        return count;
      }
    }
    return count;
  }

  public int[] isMeeting(int memberNo) throws Exception {
    return linkDao.isMeeting(memberNo);
  }
}
