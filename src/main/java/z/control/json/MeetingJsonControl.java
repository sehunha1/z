package z.control.json;

import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import z.domain.Meeting;
import z.domain.Member;
import z.service.MeetingService;

/*
 * 작성: 2017/02/22 - 김재녕
 * 내용: Meeting 데이터. 
 */

@RestController
public class MeetingJsonControl {
  @Autowired ServletContext sc;
  @Autowired MeetingService meetingService;
  
  // 모임 개설시 방정보 삽입.
  @RequestMapping("html/meeting/add")
  public AjaxResult add(Meeting meeting, HttpSession session) throws Exception {
    Member member = (Member) session.getAttribute("member");
    
    // 로그인 한 경우만 모임 개설
    if (member != null) {
      meeting.setMeetBossNo(member.getMemberNo());
      meetingService.add(meeting);
      return new AjaxResult(AjaxResult.SUCCESS, meeting);
    }
    return new AjaxResult(AjaxResult.FAIL, "방 개설 실패.");
  }

  @RequestMapping("html/getOneMeeting")
  public AjaxResult getOneMeeting(int meetingNo) throws Exception {
    Meeting oneMeeting = meetingService.getOneMeeting(meetingNo);
    return new AjaxResult(AjaxResult.SUCCESS, oneMeeting);
  }
  
  // 모임 리스트 가져오기.
  @RequestMapping("html/mylist/listMeetingCards")
  public AjaxResult listMeetingCards(int memberNo) throws Exception {
    List<Meeting> listMeetingCards = meetingService.getListMeetingCards(memberNo);
    return new AjaxResult(AjaxResult.SUCCESS, listMeetingCards);
  }
  
  // 완료 모임 상세 정보 가져오기
  @RequestMapping("html/detail/detailMeet")
  public AjaxResult detailMeeting(int memberNo, int meetingNo) throws Exception {
    
    return new AjaxResult(AjaxResult.SUCCESS, "성공");
  }
}
