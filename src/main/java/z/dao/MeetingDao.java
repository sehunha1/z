package z.dao;

import java.util.ArrayList;

import z.domain.Meeting;

/*
 * 작성: 2017-02-22 - 김재녕
 * 내용: Meeting(방 개설 정보) 인터페이스 선언.
 */

public interface MeetingDao {
  int insertMeet(Meeting meeting) throws Exception;
  int insertTime(Meeting meeting) throws Exception;
  int insertLink(Meeting meeting) throws Exception;
  ArrayList<Meeting> getListMeetingCards(int memberNo) throws Exception;
}
