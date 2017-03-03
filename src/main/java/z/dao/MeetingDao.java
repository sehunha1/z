package z.dao;

import java.util.ArrayList;

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
//  Meeting getDetailMeeting(int meetingNo) throws Exception; // 완료 모임 상세 정보 가져오기
  Meeting getOneMeeting(int meetingNo) throws Exception;
}
