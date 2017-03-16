package z.dao;

import org.apache.ibatis.annotations.Param;
import z.domain.Board;
import z.domain.Meeting;

import java.util.ArrayList;
import java.util.List;

/*
 * 작성: 2017-02-22 - 김재녕
 * 내용: Meeting(방 개설 정보) 인터페이스 선언.
 */

public interface MeetingDao_bak {
  int insertMeet(Meeting meeting) throws Exception; // 방 개설시 meet 테이블 데이터 삽입
  int insertTime(Meeting meeting) throws Exception; // 방 개설시 time 테이블 데이터 삽입
  int insertLink(Meeting meeting) throws Exception; // 방 개설시 link 테이블 데이터 삽입
  ArrayList<Meeting> getListMeetingCards(int memberNo) throws Exception; // 모임 리스트 가져오기
  Meeting getDetailMeeting(@Param("memberNo") int memberNo, @Param("meetingNo") int meetingNo) throws Exception; // 완료 모임 상세 정보 가져오기
  Meeting getOneMeeting(int meetingNo) throws Exception;
  List<Board> meetBoardList(int meetingNo) throws Exception; // 완료 모임 게시글 정보 가져오기
  List<Board> keywordBoardList(@Param("meetingNo") int meetingNo, @Param("keyWord") String keyWord) throws Exception; // 완료 모임 게시글 정보 가져오기
  String[] getDline(String time) throws Exception;
  int updateMstatWait(String dline) throws Exception;
}
