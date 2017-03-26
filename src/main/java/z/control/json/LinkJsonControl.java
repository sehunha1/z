package z.control.json;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import z.domain.Link;
import z.service.LinkService;

@RestController
public class LinkJsonControl {
  @Autowired ServletContext sc;
  
  @Autowired LinkService linkService;

  @RequestMapping("html/meetmain/getBoss")
  public AjaxResult getBoss(int memberNo) throws Exception {
    List<Link> boss = linkService.getBoss(memberNo);
    return new AjaxResult(AjaxResult.SUCCESS, boss);
  }

  @RequestMapping("html/detail/getVotedCount")
  public AjaxResult getVotedCount(int meetingNo) throws Exception {
    int votedCount = linkService.getVotedCount(meetingNo);
    return new AjaxResult(AjaxResult.SUCCESS, votedCount);
  }

  @RequestMapping("html/detail/getEntireCount")
  public AjaxResult getEntireCount(int meetingNo) throws Exception {
    int entireCount = linkService.getEntireCount(meetingNo);
    return new AjaxResult(AjaxResult.SUCCESS, entireCount);
  }

  @RequestMapping("getMyUnvoteCount")
  public AjaxResult getMyUnvoteCount(int memberNo) throws Exception {
    int myUnvoteCount = linkService.getMyUnvoteCount(memberNo);
    return new AjaxResult(AjaxResult.SUCCESS, myUnvoteCount);
  }
  
  @RequestMapping("getMyInviteCount")
  public AjaxResult getMyInviteCount(int memberNo) throws Exception {
    int myInviteCount = linkService.getMyInviteCount(memberNo);
    return new AjaxResult(AjaxResult.SUCCESS, myInviteCount);
  }
  
  @RequestMapping("html/mypage/refuse")
  public AjaxResult refuse(int memberNo, int meetingNo) throws Exception {
    int refuseCount = linkService.refuse(memberNo, meetingNo);
    
    if (refuseCount == 0) {
      return new AjaxResult(AjaxResult.FAIL, "거절 실패하였습니다");
    }
    return new AjaxResult(AjaxResult.SUCCESS, "거절 성공하였습니다");
  }
  
  @RequestMapping("html/mypage/accept")
  public AjaxResult accept(int memberNo, int meetingNo) throws Exception {
    int refuseCount = linkService.accept(memberNo, meetingNo);
    
    if (refuseCount == 0) {
      return new AjaxResult(AjaxResult.FAIL, "수락 실패하였습니다");
    }
    return new AjaxResult(AjaxResult.SUCCESS, "수락 성공하였습니다");
  }
  
  // 멤버 초대시 link 테이블 데이터 삽입
  @RequestMapping("html/link/insert")
  public AjaxResult linkInsert(@RequestParam(value="meetingNo") int meetingNo, @RequestParam(value="linkMembList") int[] linkMembList) throws Exception {
    Map linkMembMap = new HashMap();
    linkMembMap.put("meetingNo", meetingNo); //////// 모임번호
    linkMembMap.put("linkMembList", linkMembList); // 모임 초대 멤버
    
    int count = linkService.linkInsert(linkMembMap);
    
    if (count == 0) {
      return new AjaxResult(AjaxResult.FAIL, "데이터 삽입 실패");
    }
    return new AjaxResult(AjaxResult.SUCCESS, "데이터 삽입 성공");
  }

  @RequestMapping("html/isMeeting")
  public AjaxResult isMeeting(int memberNo) throws Exception {
    int[] meetingNos = linkService.isMeeting(memberNo);
    return new AjaxResult(AjaxResult.SUCCESS, meetingNos);
  }
}