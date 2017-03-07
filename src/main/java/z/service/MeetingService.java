package z.service;

import java.util.List;

import z.domain.Meeting;

public interface MeetingService {
  int add(Meeting meeting) throws Exception;
  List<Meeting> getListMeetingCards(int memberNo) throws Exception;
  Meeting getOneMeeting(int meetingNo) throws Exception;
  Meeting getDetailMeeting(int memberNo, int meetingNo) throws Exception;
}
