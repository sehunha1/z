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
}
