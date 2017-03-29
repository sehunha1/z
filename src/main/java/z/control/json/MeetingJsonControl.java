package z.control.json;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import z.domain.Board;
import z.domain.Meeting;
import z.domain.Member;
import z.service.MeetingService;

/*
 * 작성: 2017/02/22 - 김재녕
 * 내용: Meeting 데이터. 
 */

@RestController
public class MeetingJsonControl {
  @Autowired
  ServletContext sc;
  @Autowired
  MeetingService meetingService;

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
    Meeting detailMeeting = meetingService.getDetailMeeting(memberNo, meetingNo);
    if (detailMeeting != null) {
      return new AjaxResult(AjaxResult.SUCCESS, detailMeeting);
    }
    return new AjaxResult(AjaxResult.SUCCESS, "완료 모임 상세정보 가져오기 실패");
  }

  // 완료 모임 게시글 정보 가져오기
  @RequestMapping("html/detail/meetBoardList")
  public AjaxResult boardList(int meetingNo) throws Exception {
    List<Board> boardList = meetingService.boardList(meetingNo);
    if (boardList != null && boardList.size() != 0) {
      return new AjaxResult(AjaxResult.SUCCESS, boardList);
    }
    return new AjaxResult(AjaxResult.FAIL, "완료 모임 상세정보 가져오기 실패");
  }

  // 완료 모임 특정 게시글 정보 가져오기
  @RequestMapping("html/detail/keywordBoardList")
  public AjaxResult keywordBoardList(int meetingNo, String keyWord) throws Exception {
    List<Board> boardList = meetingService.keywordBoardList(meetingNo, keyWord);
    if (boardList != null && boardList.size() != 0) {
      return new AjaxResult(AjaxResult.SUCCESS, boardList);
    }
    return new AjaxResult(AjaxResult.FAIL, "완료 모임 상세정보 가져오기 실패");
  }
  
  // 미수락 초대 가져오기
  @RequestMapping("html/mypage/invite")
  public AjaxResult invite(int memberNo) throws Exception {
    List<Meeting> invite = meetingService.invite(memberNo);
    
    return new AjaxResult(AjaxResult.SUCCESS, invite);
  }

  @RequestMapping("html/detail/updateMstatFin")
  public AjaxResult updateMstat(int meetingNo, HttpServletRequest httpServletRequest) throws Exception {
    meetingService.updateMstatFin(meetingNo);
    String cal = httpServletRequest.getParameter("cal");
    String time = httpServletRequest.getParameter("time");
    String loc = httpServletRequest.getParameter("loc");

    if (cal.length() > 1) {
      meetingService.updateCal(meetingNo, cal);
      meetingService.updateTime(meetingNo, time);
    }

    if (loc.length() > 3) {
      meetingService.updateLoc(meetingNo, loc);
    }

    return new AjaxResult(AjaxResult.SUCCESS, "성공");
  }

  @RequestMapping("html/dday")
  public AjaxResult getDday(int memberNo) throws Exception {
    String[] ddayTitle = meetingService.getDdayTitle(memberNo);
    String[] ddayDline = meetingService.getDdayDline(memberNo);
    int[] meetingNo = meetingService.getDdayMeetingNo(memberNo);
    ArrayList dday = new ArrayList();
    SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
    long currentTime = System.currentTimeMillis();

    for (int i = 0; i < ddayDline.length; i++) {
      HashMap<String, Object> dday1 = new HashMap<>();
      Date dline = dateFormat.parse(ddayDline[i]);
      long diff = dline.getTime() - currentTime;
      long ddayCount = diff / (24 * 60 * 60 * 1000);
      int ddayCount1 = (int)ddayCount;

      dday1.put("ddayTitle", ddayTitle[i]);
      dday1.put("ddayCount", ddayCount1);
      dday1.put("memberNo", memberNo);
      dday1.put("meetingNo", meetingNo[i]);

      dday.add(dday1);
    }

    return new AjaxResult(AjaxResult.SUCCESS, dday);
  }
  
  // 모임멤버 초대
//  @RequestMapping("html/link/membAdd")
//  public AjaxResult emailLink(EmailList emailList) throws Exception {
//    int[] membNoList = meetingService.getMembNoList(emailList);
////    int count = meetingService.emailLink(emailList);
//    // 로그인 한 경우만 모임 개설
//    if (count == 0) {
//
//      return new AjaxResult(AjaxResult.SUCCESS, "성공");
//    }
//    return new AjaxResult(AjaxResult.FAIL, "실패");
//  }
  
  
}
