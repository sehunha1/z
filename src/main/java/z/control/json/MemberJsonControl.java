package z.control.json;

import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import z.domain.Link;
import z.domain.Member;
import z.service.MemberService;

@RestController
public class MemberJsonControl {
  @Autowired
  ServletContext sc;
  @Autowired
  MemberService memberService;

  @RequestMapping("html/meetmain/listMeetingMembBoss")
  public AjaxResult listMeetingMembBoss(int meetingNo) throws Exception {
    List<Member> listMeetingMembBoss = memberService.getListMeetingMembBoss(meetingNo);
    return new AjaxResult(AjaxResult.SUCCESS, listMeetingMembBoss);
  }

  @RequestMapping("html/meetmain/listMeetingMembNotBoss")
  public AjaxResult listMeetingMembNotBoss(int meetingNo) throws Exception {
    List<Member> listMeetingMembNotBoss = memberService.getListMeetingMembNotBoss(meetingNo);
    return new AjaxResult(AjaxResult.SUCCESS, listMeetingMembNotBoss);
  }

  @RequestMapping("html/detail/detailMeetList")
  public AjaxResult detailMeetList(int meetingNo) throws Exception {
    List<Member> detailMeetList = memberService.getListMeetingMembBoss(meetingNo);
    List<Member> testList = memberService.getListMeetingMembNotBoss(meetingNo);
    for (Member memb : testList) {
      if (memb != null) {
        detailMeetList.add(memb);
      }
    }
    return new AjaxResult(AjaxResult.SUCCESS, detailMeetList);
  }

  // SideBar 멤버 추가시 회원 유무 조회
  @RequestMapping("html/sidebar/getSideMemb")
  public AjaxResult getSideMemb(String emailAddress) throws Exception {
    String membNo = memberService.getSideMemb(emailAddress);
    if (membNo == null) {
      return new AjaxResult(AjaxResult.FAIL, "이메일이 존재하지 않습니다.");
    } else {
      return new AjaxResult(AjaxResult.SUCCESS, membNo);
    }
  }

  // SideBar 멤버 추가시 초대 여부 조회
  @RequestMapping("html/sidebar/getSideLink")
  public AjaxResult getSideLink(Link link) throws Exception {
    int membAddYn = memberService.getSideLink(link);
    if (membAddYn != 0) {
      return new AjaxResult(AjaxResult.FAIL, "이미 초대된 회원입니다.");
    } else {
      return new AjaxResult(AjaxResult.SUCCESS, "초대 가능한 회원입니다.");
    }
  }

  /*
   * @RequestMapping("html/main/list") public AjaxResult list() throws Exception
   * { List<Member> list = memberService.getList(); return new
   * AjaxResult(AjaxResult.SUCCESS, list); }
   * 
   * @RequestMapping("html/main/detail") public AjaxResult detail(int memberNo)
   * throws Exception { Member member = memberService.getDetail(memberNo);
   * 
   * if (member == null) { return new AjaxResult(AjaxResult.FAIL,
   * "해당 학생이 없습니다."); }
   * 
   * return new AjaxResult(AjaxResult.SUCCESS, member); }
   */

  /*
   * @RequestMapping("html/auth/add") public AjaxResult add(Member member,
   * MultipartFile photo) throws Exception {
   * 
   * if (photo != null && photo.getSize() > 0) { String newFilename =
   * MultipartUtil.generateFilename(); photo.transferTo(new
   * File(sc.getRealPath("/upload/" + newFilename)));
   * member.setPhoto(newFilename); }
   * 
   * // 페이지 컨트롤러는 입력 파라미터 값을 가공하여 모델 객체에게 전달하는 일을 한다.
   * 
   * int count = memberService.add(member);
   * 
   * if (count != 1) { return new AjaxResult(AjaxResult.FAIL, "등록에 실패했습니다."); }
   * return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
   * 
   * }
   */

  @RequestMapping("html/auth/add")
  public AjaxResult add(Member member, MultipartFile photo) throws Exception {

    memberService.add(member);

    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }

  @RequestMapping("html/auth/checkEmail")
  public AjaxResult chkMbEmail(String email) throws Exception {

    int count = memberService.chkMbEmail(email);
    
    if (count == 0) {
      return new AjaxResult(AjaxResult.SUCCESS, "사용가능한 이메일 입니다.");
    } else {
      return new AjaxResult(AjaxResult.FAIL, "중복된 이메일 입니다.");
    }
  }

  @RequestMapping("html/auth/checkFacebook")
  public AjaxResult chkMbFacebook(String facebook) throws Exception {

    int resultCnt = memberService.chkMbFacebook(facebook);
    
    if (resultCnt == 0) {
      return new AjaxResult(AjaxResult.SUCCESS, "사용가능한 계정 입니다.");
    } else {
      return new AjaxResult(AjaxResult.FAIL, "중복된 페이스북 계정 입니다.");
    }
  }

  @RequestMapping("html/mypage/checkfbemail")
  public AjaxResult checkfbemail(String facebook) throws Exception {

    int resultCnt = memberService.chkMbFacebook(facebook);
    return new AjaxResult(AjaxResult.SUCCESS, resultCnt);
  }

  @RequestMapping("html/auth/updateFBphoto")
  public AjaxResult updateFBphoto(Member member, String photo) throws Exception {

    memberService.updateFBphoto(member);

    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }

  @RequestMapping("html/mypage/updatemember")
  public AjaxResult update(HttpSession session, Member member) throws Exception {
    int count = memberService.update(member);

    if (count == 0) {
      return new AjaxResult(AjaxResult.FAIL, "멤버가 없습니다.");
    }

    // session.invalidate();
    session.setAttribute("member", member);
    return new AjaxResult(AjaxResult.SUCCESS, "변경 성공입니다.");
  }

  @RequestMapping("html/mypage/updateemailpassword")
  public AjaxResult updatelogin(HttpSession session, Member member) throws Exception {
    int count = memberService.updatelogin(member);

    if (count == 0) {
      return new AjaxResult(AjaxResult.FAIL, "멤버가 없습니다.");
    }

    // session.invalidate();
    session.setAttribute("member", member);
    return new AjaxResult(AjaxResult.SUCCESS, "변경 성공입니다.");
  }

  @RequestMapping("html/mypage/membercheck")
  public AjaxResult membercheck(String email, String password) throws Exception {
    int count = memberService.countEmailPassword(email, password);

    if (count == 0) {
      return new AjaxResult(AjaxResult.FAIL, "멤버가 없습니다.");
    }
    return new AjaxResult(AjaxResult.SUCCESS, "멤버가 있습니다.");
  }
  
  // 암호 중복검사
  @RequestMapping("html/mypage/passcheck")
  public AjaxResult passcheck(int memberNo, String password) throws Exception {
    int count = memberService.passcheck(memberNo, password);

    if (count == 1) {
      return new AjaxResult(AjaxResult.FAIL, false);
    }
    return new AjaxResult(AjaxResult.SUCCESS, true);
  }

  @RequestMapping("html/mypage/memberdelete")
  public AjaxResult delete(int memberNo, HttpServletRequest request, HttpSession session) throws Exception {
    session.invalidate(); // 세션 초기화

    int count = memberService.memberdelete(memberNo);

    if (count == 0) {
      return new AjaxResult(AjaxResult.FAIL, "삭제 실패 입니다");
    }

    return new AjaxResult(AjaxResult.SUCCESS, "삭제 성공입니다.");
  }

  @RequestMapping("html/mypage/updatefcbk")
  public AjaxResult updatefcbk(HttpSession session, Member member) throws Exception {

    memberService.updatefcbk(member);

    session.setAttribute("member", member);
    return new AjaxResult(AjaxResult.SUCCESS, "변경 성공입니다.");
  }
}

/*
 * @RequestMapping("/member/delete") public AjaxResult delete(int memberNo,
 * HttpServletRequest request) throws Exception { int count =
 * memberService.delete(memberNo); if (count == 0) { return new
 * AjaxResult(AjaxResult.FAIL, "해당 번호의 학생이 없습니다."); } return new
 * AjaxResult(AjaxResult.SUCCESS, "삭제 성공입니다."); }
 * 
 * @RequestMapping("/member/update") public AjaxResult update(Member member,
 * MultipartFile photo) throws Exception {
 * 
 * if (photo != null && photo.getSize() > 0) { // 파일이 업로드 되었다면, String
 * newFilename = MultipartUtil.generateFilename(); photo.transferTo(new
 * File(sc.getRealPath("/upload/" + newFilename)));
 * member.setPhotoPath(newFilename); }
 * 
 * int count = memberService.update(member);
 * 
 * if (count == 0) { return new AjaxResult(AjaxResult.FAIL, "해당 번호의 학생이 없습니다.");
 * }
 * 
 * return new AjaxResult(AjaxResult.SUCCESS, "변경 성공입니다."); }
 */

