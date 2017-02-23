package z.control.json;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import z.domain.Meeting;
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
  public AjaxResult add(Meeting meeting) throws Exception {
    meetingService.add(meeting);
    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }
}
