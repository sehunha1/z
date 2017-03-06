package z.control.json;

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

  @RequestMapping("html/auth/listadd")
  public AjaxResult add(PlaceList placelist) throws Exception {
    placeListService.add(placelist);

    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }
}
