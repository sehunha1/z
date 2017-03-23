package z.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import z.dao.MeetingDao;
import z.domain.Board;
import z.domain.Meeting;
import z.service.MeetingService;

@Service
public class MeetingServiceImpl implements MeetingService {
  @Autowired MeetingDao meetingDao;
  
  // 모임 개설시 방정보 삽입.
  @Override
  public int add(Meeting meeting) throws Exception {
    meetingDao.insertMeet(meeting);
    meetingDao.insertTime(meeting);
    return meetingDao.insertLink(meeting);
  }
  
  // 모임 리스트 가져오기.
  @Override
  public List<Meeting> getListMeetingCards(int memberNo) throws Exception {
    return meetingDao.getListMeetingCards(memberNo);
  }

  @Override
  public Meeting getOneMeeting(int meetingNo) throws Exception {
    return meetingDao.getOneMeeting(meetingNo);
  }
  
  // 완료 모임 상세 정보 가져오기.
  @Override
  public Meeting getDetailMeeting(int memberNo, int meetingNo) throws Exception {
    return meetingDao.getDetailMeeting(memberNo, meetingNo);
  }
  
  // 완료 모임 게시글 정보 가져오기.
  @Override
  public List<Board> boardList(int meetingNo) throws Exception {
    return meetingDao.meetBoardList(meetingNo);
  }
  
  // 완료 모임 특정 게시글 정보 가져오기.
  @Override
  public List<Board> keywordBoardList(int meetingNo, String keyWord) throws Exception {
//    HashMap<String, Object> keyWordList = new HashMap<String, Object>();
//    keyWordList.put("meetingNo", meetingNo);
//    keyWordList.put("keyWord", keyWord);
    return meetingDao.keywordBoardList(meetingNo, keyWord);
  }
  
  // 미수락 초대 가져오기 
  public List<Meeting> invite(int memberNo) throws Exception {
    return meetingDao.invite(memberNo);
  }

  @Override
  public String getDline(int meetingNo) throws Exception {
    return meetingDao.getDline(meetingNo);
  }

  @Override
  public int updateMstatWait(int meetingNo) throws Exception {
    return meetingDao.updateMstatWait(meetingNo);
  }

  @Override
  public int updateMstatFin(int meetingNo) throws Exception {
    return meetingDao.updateMstatFin(meetingNo);
  }

  @Override
  public int[] getMeetingNo(int memberNo) throws Exception {
    return meetingDao.getMeetingNo(memberNo);
  }

  @Override
  public int updateFdate(int meetingNo) throws Exception {
    return meetingDao.updateFdate(meetingNo);
  }

  @Override
  public int updateFdateNonVote(int meetingNo) throws Exception {
    return meetingDao.updateFdateNonVote(meetingNo);
  }

  @Override
  public int updateFloc(int meetingNo) throws Exception {
    return meetingDao.updateFloc(meetingNo);
  }

  @Override
  public int updateFlocNonVote(int meetingNo) throws Exception {
    return meetingDao.updateFlocNonVote(meetingNo);
  }

  @Override
  public int updateFtime(int meetingNo) throws Exception {
    return meetingDao.updateFtime(meetingNo);
  }

  @Override
  public int updateFtimeNonVote(int meetingNo) throws Exception {
    return meetingDao.updateFtimeNonVote(meetingNo);
  }

  @Override
  public int updateCal(int meetingNo, String cal) throws Exception {
    return meetingDao.updateCal(meetingNo, cal);
  }

  @Override
  public int updateTime(int meetingNo, String time) throws Exception {
    return meetingDao.updateTime(meetingNo, time);
  }

  @Override
  public int updateLoc(int meetingNo, String loc) throws Exception {
    return meetingDao.updateLoc(meetingNo, loc);
  }

  @Override
  public String[] getDdayTitle(int memberNo) throws Exception {
    return meetingDao.getDdayTitle(memberNo);
  }

  @Override
  public String[] getDdayDline(int memberNo) throws Exception {
    return meetingDao.getDdayDline(memberNo);
  }

  @Override
  public int[] getDdayMeetingNo(int memberNo) throws Exception {
    return meetingDao.getDdayMeetingNo(memberNo);
  }
}