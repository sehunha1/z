package z.service;

import java.util.List;

import z.domain.Board;
import z.domain.Meeting;

public interface MeetingService {
  int add(Meeting meeting) throws Exception; // 모임 생성시 데이터 삽입
  List<Meeting> getListMeetingCards(int memberNo) throws Exception;
  Meeting getOneMeeting(int meetingNo) throws Exception;
  Meeting getDetailMeeting(int memberNo, int meetingNo) throws Exception;
  List<Board> boardList(int meetingNo) throws Exception; // 완료모임 게시글 가져오기
  List<Board> keywordBoardList(int meetingNo, String keyWord) throws Exception; // 완료모임 특정 게시글 가져오기
  List<Meeting> invite(int memberNo) throws Exception;
  String getDline(int meetingNo) throws Exception;
  int updateMstatWait(int meetingNo) throws Exception;
  int updateMstatFin(int meetingNo) throws Exception;
  int[] getMeetingNo(int memberNo) throws Exception;
  int updateFdate(int meetingNo) throws Exception;
  int updateFdateNonVote(int meetingNo) throws Exception;
  int updateFloc(int meetingNo) throws Exception;
  int updateFlocNonVote(int meetingNo) throws Exception;
  int updateFtime(int meetingNo) throws Exception;
  int updateFtimeNonVote(int meetingNo) throws Exception;
  int updateCal(int meetingNo, String cal) throws Exception;
  int updateTime(int meetingNo, String cal) throws Exception;
  int updateLoc(int meetingNo, String loc) throws Exception;
  String[] getDdayTitle(int memberNo) throws Exception;
  String[] getDdayDline(int memberNo) throws Exception;
  int[] getDdayMeetingNo(int memberNo) throws Exception;
}