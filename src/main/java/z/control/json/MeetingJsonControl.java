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
  
  // 방 개설시 방정보 삽입.
  @RequestMapping("/meeting/add")
  public AjaxResult add(Meeting meeting, HttpSession session) throws Exception {
    Member member = (Member) session.getAttribute("member");
    meeting.setMeetMembNo(member.getMemberNo());
    meetingService.add(meeting);
    session.setAttribute("meeting", meeting);
    System.out.println(session.getAttribute("meeting"));
    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }
  
  // 모임 리스트 가져오기.
  @RequestMapping("html/mylist/listMeetingCards")
  public AjaxResult listMeetingCards(int memberNo) throws Exception {
    List<Meeting> listMeetingCards = meetingService.getListMeetingCards(memberNo);
    return new AjaxResult(AjaxResult.SUCCESS, listMeetingCards);
  }
}
