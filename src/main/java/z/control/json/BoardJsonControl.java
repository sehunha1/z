package z.control.json;

import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import z.domain.AddFile;
import z.domain.Board;
import z.domain.Link;
import z.service.BoardService;

@RestController
public class BoardJsonControl {
  
  @Autowired ServletContext sc;
  @Autowired BoardService boardService;
 
  @RequestMapping("/html/meetmain/list")
  public AjaxResult list(int mtnum) throws Exception {
    List<Board> list = boardService.getList(mtnum);
    return new AjaxResult(AjaxResult.SUCCESS, list);
  }
  
  @RequestMapping("/html/meetmain/detail")
  public AjaxResult detail(int bnum) throws Exception {
    Board board = boardService.getDetail(bnum);
    
    if (board == null) {
      throw new Exception("해당게시물이 없습니다.");
    }
    
    // 페이지 컨트롤러는 모델 객체가 리턴한 값을 JSP가 사용할 수 있도록 가공하는 일을 한다.
   // model.addAttribute("board", board);
   // model.addAttribute("title", "학생관리-상세정보");
   // model.addAttribute("contentPage", "view/detail.jsp");
    return new AjaxResult(AjaxResult.SUCCESS, board);
  }
  
 /* @RequestMapping("html/meetmain/")
  public AjaxResult detail(int memberNo) throws Exception {
    Member member = boardService.getDetail(memberNo);
    
    if (member == null) {
      return new AjaxResult(AjaxResult.FAIL, "해당 학생이 없습니다.");
    }
    
    return new AjaxResult(AjaxResult.SUCCESS, member);
  }
  */
  @RequestMapping("/html/meetmain/add")
  public AjaxResult add(Board board) throws Exception {
    
    List<AddFile> list = board.getAddFileList();
    if (list.size() == 0) {
      list.add(new AddFile("noimage.jpg"));
    }
    board.setAddFileList(list);
    /*for (int i = 0; i < list.size(); i++) {
      System.out.println(i+"번째 addFile = "+ ((AddFile)list.get(i)).getFilePath());
    }*/
    // 페이지 컨트롤러는 입력 파라미터 값을 가공하여 모델 객체에게 전달하는 일을 한다.
    
    boardService.add(board);
    
    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }
  /* 사진포함
  @RequestMapping("/member/add")
  public AjaxResult add(Member member, MultipartFile photo) throws Exception {
    
    // 페이지 컨트롤러는 입력 파라미터 값을 가공하여 모델 객체에게 전달하는 일을 한다.
    if (photo != null && photo.getSize() > 0) { 
      String newFilename = MultipartUtil.generateFilename();
      photo.transferTo(new File(sc.getRealPath("/upload/" + newFilename)));
      member.setPhotoPath(newFilename);
    }
    
    memberService.add(member);
    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }*/
  @RequestMapping("/html/meetmain/file")
  public AjaxResult file(Link link) throws Exception {
    
    // 페이지 컨트롤러는 입력 파라미터 값을 가공하여 모델 객체에게 전달하는 일을 한다.
    boardService.fileadd(link);
    
    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }
  
  @RequestMapping("/html/meetmain/delete")
  public AjaxResult delete(int boardNo) throws Exception {
    int count = boardService.delete(boardNo);
    if (count == 0) {
      return new AjaxResult(AjaxResult.FAIL, "게시글이 없습니다.");
    }
    return new AjaxResult(AjaxResult.SUCCESS, "삭제 성공입니다.");
  }

  // Board, File 객체 프로퍼티 변경 >> 확인 후 수정 요망 -- 김재녕
  
//  @RequestMapping("/member/update")
//  public AjaxResult update(Board board, MultipartFile photo) throws Exception {
//    
//    if (photo != null && photo.getSize() > 0) { // 파일이 업로드 되었다면,
//      String newFilename = MultipartUtil.generateFilename();
//      photo.transferTo(new File(sc.getRealPath("/upload/" + newFilename)));
//      
//      // board.setFilePath(newFilename);
//    }
//    
//    int count = boardService.update(board);
//    
//    if (count == 0) {
//      return new AjaxResult(AjaxResult.FAIL, "해당 번호의 학생이 없습니다.");
//    }
//    
//    return new AjaxResult(AjaxResult.SUCCESS, "변경 성공입니다.");
//  }

  @RequestMapping("/html/meetmain/update")
  public AjaxResult update(Board board, MultipartFile photo) throws Exception {
    
    //if (photo != null && photo.getSize() > 0) { // 파일이 업로드 되었다면,
     // String newFilename = MultipartUtil.generateFilename();
     // photo.transferTo(new File(sc.getRealPath("/upload/" + newFilename)));
     // board.setFilePath(newFilename);
    //}
    
    int count = boardService.update(board);
    
    if (count == 0) {
      return new AjaxResult(AjaxResult.FAIL, "해당 게시물이 없습니다.");
    }
    
    return new AjaxResult(AjaxResult.SUCCESS, "변경 성공입니다.");
  }
  
}
