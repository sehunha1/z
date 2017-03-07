package z.control.json;

import java.util.List;

import javax.servlet.ServletContext;

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
  public AjaxResult add(PlaceList placelist) throws Exception {
    int count = placeListService.add(placelist);
    
    if (count == 0) {
      return new AjaxResult(AjaxResult.FAIL, "등록 실패입니다.");
    }

    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }
  
  @RequestMapping("html/meetmain/placelist")
  public AjaxResult list() throws Exception {
    
    List<PlaceList> list = placeListService.getList();
    
    return new AjaxResult(AjaxResult.SUCCESS, list);
  }
}
