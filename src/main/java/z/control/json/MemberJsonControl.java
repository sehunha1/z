package z.control.json;

import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import z.domain.Member;
import z.service.MemberService;

//@Controller
@RestController // 이 애노테이션을 붙이면, 스프링 설정 파일에 JSON 변환기 'MappingJackson2JsonView' 객체를 등록하지 않아도 된다.
public class MemberJsonControl {
  @Autowired ServletContext sc;
  @Autowired MemberService memberService;

  @RequestMapping("html/meetmain/listMeetingMembBoss")
  public AjaxResult listMeetingMembBoss(int memberNo, int meetingNo) throws Exception {
    List<Member> listMeetingMembBoss = memberService.getListMeetingMembBoss(memberNo, meetingNo);
    return new AjaxResult(AjaxResult.SUCCESS, listMeetingMembBoss);
  }

  @RequestMapping("html/meetmain/listMeetingMembNotBoss")
  public AjaxResult listMeetingMembNotBoss(int memberNo, int meetingNo) throws Exception {
    List<Member> listMeetingMembNotBoss = memberService.getListMeetingMembNotBoss(memberNo, meetingNo);
    return new AjaxResult(AjaxResult.SUCCESS, listMeetingMembNotBoss);
  }
  
  /*
  @RequestMapping("html/main/list")
  public AjaxResult list() throws Exception {
    List<Member> list = memberService.getList();
    return new AjaxResult(AjaxResult.SUCCESS, list);
  }
  
  @RequestMapping("html/main/detail")
  public AjaxResult detail(int memberNo) throws Exception {
    Member member = memberService.getDetail(memberNo);
    
    if (member == null) {
      return new AjaxResult(AjaxResult.FAIL, "해당 학생이 없습니다.");
    }
    
    return new AjaxResult(AjaxResult.SUCCESS, member);
  }*/
  
  /*
  @RequestMapping("html/auth/add")
  public AjaxResult add(Member member, MultipartFile photo) throws Exception {
    
    if (photo != null && photo.getSize() > 0) { 
      String newFilename = MultipartUtil.generateFilename();
      photo.transferTo(new File(sc.getRealPath("/upload/" + newFilename)));
      member.setPhoto(newFilename);
    }
    
    // 페이지 컨트롤러는 입력 파라미터 값을 가공하여 모델 객체에게 전달하는 일을 한다.
    
    int count = memberService.add(member);
    
    if (count != 1) {
        return new AjaxResult(AjaxResult.FAIL, "등록에 실패했습니다.");
    } 
    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
    
  }
  */
  
  @RequestMapping("html/auth/add")
  public AjaxResult add(Member member, MultipartFile photo) throws Exception {
    
    
    memberService.add(member);

    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }
  
  
  @RequestMapping("html/auth/checkEmail")
  public AjaxResult chkMbEmail(String email) throws Exception {

    int resultCnt = memberService.chkMbEmail(email);
    if ( resultCnt == 0 ){
      return new AjaxResult(AjaxResult.SUCCESS, "사용가능한 이메일 입니다.");
    } else {
      return new AjaxResult(AjaxResult.FAIL, "중복된 이메일 입니다.");
    }
  }
  
  
  @RequestMapping("html/auth/checkFacebook")
  public AjaxResult chkMbFacebook(String facebook) throws Exception {

    int resultCnt = memberService.chkMbFacebook(facebook);
    if ( resultCnt == 0 ){
      return new AjaxResult(AjaxResult.SUCCESS, "사용가능한 계정 입니다.");
    } else {
      return new AjaxResult(AjaxResult.FAIL, "중복된 페이스북 계정 입니다.");
    }
  }
  
  @RequestMapping("html/auth/updateFBphoto")
  public AjaxResult updateFBphoto(Member member, String photo) throws Exception {
    
    
    memberService.updateFBphoto(member);

    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }
  
  @RequestMapping("html/mypage/updatemember")
  public AjaxResult update(HttpSession session,  Member member) throws Exception {
    int count = memberService.update(member);

    if (count == 0) {
      return new AjaxResult(AjaxResult.FAIL, "멤버가 없습니다.");
    }

    //session.invalidate();
    session.setAttribute("member", member);
    return new AjaxResult(AjaxResult.SUCCESS, "변경 성공입니다.");
  }
}
  
  
  /*
  @RequestMapping("/member/delete")
  public AjaxResult delete(int memberNo, HttpServletRequest request) throws Exception {
    int count = memberService.delete(memberNo);
    if (count == 0) {
      return new AjaxResult(AjaxResult.FAIL, "해당 번호의 학생이 없습니다.");
    }
    return new AjaxResult(AjaxResult.SUCCESS, "삭제 성공입니다.");
  }
  
  @RequestMapping("/member/update")
  public AjaxResult update(Member member, MultipartFile photo) throws Exception {
    
    if (photo != null && photo.getSize() > 0) { // 파일이 업로드 되었다면,
      String newFilename = MultipartUtil.generateFilename();
      photo.transferTo(new File(sc.getRealPath("/upload/" + newFilename)));
      member.setPhotoPath(newFilename);
    }
    
    int count = memberService.update(member);
    
    if (count == 0) {
      return new AjaxResult(AjaxResult.FAIL, "해당 번호의 학생이 없습니다.");
    }
    
    return new AjaxResult(AjaxResult.SUCCESS, "변경 성공입니다.");
  }
  */





