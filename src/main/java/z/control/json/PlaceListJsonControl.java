package z.control.json;

import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import z.domain.PlaceList;
import z.service.PlaceListService;

@RestController
public class PlaceListJsonControl {
  @Autowired ServletContext sc;
  @Autowired PlaceListService placeListService;

  @RequestMapping("html/meetmain/listadd")
  public AjaxResult add(PlaceList placelist, HttpSession session) throws Exception {
    int count = placeListService.add(placelist);
    
    if (count == 0) {
      return new AjaxResult(AjaxResult.FAIL, "등록 실패입니다.");
    }
    
    session.setAttribute("placelist", placelist);
    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }
  // 페이징 처리 전
  @RequestMapping("html/meetmain/placelist")
  public AjaxResult list(int meetingNo) throws Exception {
    
    List<PlaceList> list = placeListService.getList(meetingNo);
    
    return new AjaxResult(AjaxResult.SUCCESS, list);
  }
  
  // 페이징 처리 적용
  /* 
  @RequestMapping("html/meetmain/placelist")
  public AjaxResult list(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="5") int pageSize) throws Exception {
    
    if (pageNo < 1) {
      pageNo = 1;
    }
    
    if (pageSize < 5 || pageSize > 20) {
      pageSize = 5;
    }
    
    List<PlaceList> list = placeListService.getList(pageNo, pageSize);
    int totalCount = placeListService.getSize();
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("list", list);
    resultMap.put("totalCount", totalCount);
    
    return new AjaxResult(AjaxResult.SUCCESS, resultMap);
  }
  */
}
