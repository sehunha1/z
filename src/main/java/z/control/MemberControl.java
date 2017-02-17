package z.control;

import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import z.domain.Member;
import z.service.MemberService;

@Controller
public class MemberControl {
  @Autowired ServletContext sc;
  
  @Autowired MemberService memeberService;
  /*
  @RequestMapping("/memeber/form")
  public String form(Model model) {
    model.addAttribute("title", "학생 입력폼");
    model.addAttribute("contentPage", "memeber/form.jsp");
    return "main";
  }*/
  
  @RequestMapping("/memeber/list")
  public String list(Model model) throws Exception {
    List<Member> list = memeberService.getList();
    model.addAttribute("memebers", list);
    model.addAttribute("title", "학생관리-목록");
    model.addAttribute("contentPage", "memeber/list.jsp");
    return "main";
  }
  /*
  @RequestMapping("/memeber/detail")
  public String detail(int memberNo, Model model) throws Exception {
    Member memeber = memeberService.getDetail(memberNo);
    
    if (memeber == null) {
      throw new Exception("해당 학생이 없습니다.");
    }
    
    // 페이지 컨트롤러는 모델 객체가 리턴한 값을 JSP가 사용할 수 있도록 가공하는 일을 한다.
    model.addAttribute("memeber", memeber);
    model.addAttribute("title", "학생관리-상세정보");
    model.addAttribute("contentPage", "memeber/detail.jsp");
    return "main";
  }
  
  @RequestMapping("/memeber/add")
  public String add(Member memeber, MultipartFile photo) throws Exception {
    
    // 페이지 컨트롤러는 입력 파라미터 값을 가공하여 모델 객체에게 전달하는 일을 한다.
    if (photo.getSize() > 0) { 
      String newFilename = MultipartUtil.generateFilename();
      photo.transferTo(new File(sc.getRealPath("/upload/" + newFilename)));
      memeber.setPhotoPath(newFilename);
    }
    
    memeberService.add(memeber);

    return "redirect:list.do";
  }

  @RequestMapping("/memeber/delete")
  public String delete(int memberNo, HttpServletRequest request) throws Exception {
    memeberService.delete(memberNo);
    return "redirect:list.do";
  }
  
  @RequestMapping("/memeber/update")
  public String update(Member memeber, MultipartFile photo) throws Exception {
    
    if (photo.getSize() > 0) { // 파일이 업로드 되었다면,
      String newFilename = MultipartUtil.generateFilename();
      photo.transferTo(new File(sc.getRealPath("/upload/" + newFilename)));
      memeber.setPhotoPath(newFilename);
    }
    memeberService.update(memeber);
    
    return "redirect:list.do";
  }*/
}





