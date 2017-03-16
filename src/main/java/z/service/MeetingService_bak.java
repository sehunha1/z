package z.service;

import z.domain.Board;
import z.domain.Meeting;

import java.util.List;

public interface MeetingService_bak {
  int add(Meeting meeting) throws Exception; // 모임 생성시 데이터 삽입
  List<Meeting> getListMeetingCards(int memberNo) throws Exception;
  Meeting getOneMeeting(int meetingNo) throws Exception;
  Meeting getDetailMeeting(int memberNo, int meetingNo) throws Exception;
  List<Board> boardList(int meetingNo) throws Exception; // 완료모임 게시글 가져오기
  List<Board> keywordBoardList(int meetingNo, String keyWord) throws Exception; // 완료모임 특정 게시글 가져오기
  String[] getDline(String time) throws Exception;
  int updateMstatWait(String dline) throws Exception;
}
