package z.dao;

import java.util.ArrayList;
import java.util.List;

import org.apache.ibatis.annotations.Param;

import z.domain.Board;
import z.domain.Meeting;

/*
 * 작성: 2017-02-22 - 김재녕
 * 내용: Meeting(방 개설 정보) 인터페이스 선언.
 */

public interface MeetingDao {
  int insertMeet(Meeting meeting) throws Exception; // 방 개설시 meet 테이블 데이터 삽입
  int insertTime(Meeting meeting) throws Exception; // 방 개설시 time 테이블 데이터 삽입
  int insertLink(Meeting meeting) throws Exception; // 방 개설시 link 테이블 데이터 삽입
  ArrayList<Meeting> getListMeetingCards(int memberNo) throws Exception; // 모임 리스트 가져오기
  Meeting getDetailMeeting(@Param("memberNo") int memberNo, @Param("meetingNo") int meetingNo) throws Exception; // 완료 모임 상세 정보 가져오기
  Meeting getOneMeeting(int meetingNo) throws Exception;
  List<Board> meetBoardList (int meetingNo) throws Exception; // 완료 모임 게시글 정보 가져오기
  List<Board> keywordBoardList (@Param("meetingNo") int meetingNo, @Param("keyWord") String keyWord) throws Exception; // 완료 모임 게시글 정보 가져오기
  List<Meeting> invite(int memberNo) throws Exception; // 미수락 초대 가져오기
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
  int updateCal(@Param("meetingNo")int meetingNo, @Param("cal")String cal) throws Exception;
  int updateTime(@Param("meetingNo")int meetingNo, @Param("time")String time) throws Exception;
  int updateLoc(@Param("meetingNo")int meetingNo, @Param("loc")String loc) throws Exception;
  String[] getDdayTitle(int memberNo) throws Exception;
  String[] getDdayDline(int memberNo) throws Exception;
  int[] getDdayMeetingNo(int memberNo) throws Exception;
}