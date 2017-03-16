package z.control.json;

import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import z.domain.Member;
import z.service.AuthService;
import z.service.CalendarService;
import z.service.LocationListService;
import z.service.MeetingService;

import java.text.SimpleDateFormat;
import java.util.Date;

@RestController
public class AuthJsonControl {
  
  @Autowired AuthService authService;
  @Autowired MeetingService meetingService;
  @Autowired CalendarService calendarService;
  @Autowired LocationListService locationListService;
  
  @RequestMapping("html/auth/login")
  public AjaxResult login(String email, String password,
      HttpServletResponse response, HttpSession session, Model model) throws Exception {
    
    System.out.printf(email, password);
    System.out.println();
    
    Member member = authService.getMemberInfo(email, password);
        
    if (member == null) {
      return new AjaxResult(AjaxResult.FAIL, "이메일 또는 암호가 틀리거나, 가입된 회원이 아닙니다.");
    }
    
    session.setAttribute("member", member); // HttpSession에 저장한다.
    return new AjaxResult(AjaxResult.SUCCESS, "로그인 성공!");
  }
  
  // 페이스북 회원 조회
  @RequestMapping("html/auth/loginFacebook")
  public AjaxResult loginFacebook(String email, String facebook,
      HttpServletResponse response, HttpSession session, Model model) throws Exception {
    
    Member member = authService.getMemberInfoFacebook(email, facebook);
        
    if (member == null) {
      return new AjaxResult(AjaxResult.FAIL, "페이스북으로 가입된 회원이 아닙니다.");
    }
    
    session.setAttribute("member", member); // HttpSession에 저장한다.
    return new AjaxResult(AjaxResult.SUCCESS, "로그인 성공!");
  }
  
  @RequestMapping("html/auth/logout")
  public AjaxResult logout(HttpSession session) throws Exception {
    session.invalidate(); // 기존 세션을 무효화시킨다.
    return new AjaxResult(AjaxResult.SUCCESS, "로그아웃 성공입니다.");
  }
  
  @RequestMapping("html/auth/loginUser")
  public AjaxResult loginUser(HttpSession session) throws Exception {
    Member member = (Member)session.getAttribute("member");

//  확정대기에서 방장이 선택하고 확인누르면 meet의 mstat을 fin으로 바꿈;
//                                          meet의 floc, fdate, ftime에 각1등을 꽂아줌;

//    select list.lname from list left outer join loc on list.ltnum=loc.ltnum where list.mtnum=1 group by loc.ltnum having count(*) >= (select count(*) from loc where loc.mtnum=1 group by loc.ltnum order by count(*) desc limit 1);


    if (member == null) { // 로그인이 되지 않은 상태
      return new AjaxResult(AjaxResult.FAIL, "로그인을 하지 않았습니다.");
    }

    int memberNo = member.getMemberNo();
    int meetingNo[] = meetingService.getMeetingNo(memberNo);
    long currentTime = System.currentTimeMillis();

    for (int i = 0; i <meetingNo.length; i++) {
      String dline = meetingService.getDline(meetingNo[i]);
      Date date = new Date();
      SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
      date = dateFormat.parse(dline);
      long time = date.getTime();

      if (time < currentTime) {
        int isDuplicateCal = calendarService.isDuplicate(meetingNo[i]);
        int isDuplicateLoc = locationListService.isDuplicate(meetingNo[i]);

        if (isDuplicateCal > 1 || isDuplicateLoc > 1) {
          meetingService.updateMstatWait(meetingNo[i]);
        } else {
          meetingService.updateMstatFin(meetingNo[i]);
          meetingService.updateFdate(meetingNo[i]);
          meetingService.updateFloc(meetingNo[i]);
        }
      }
    }
    
    return new AjaxResult(AjaxResult.SUCCESS, member);
  }
}

