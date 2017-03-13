package z.control.json;

import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import z.domain.Location;
import z.domain.PlaceList;
import z.service.LocationService;

@RestController
public class LocationJsonControl {
  @Autowired ServletContext sc;
  @Autowired LocationService locationService;

  @RequestMapping("html/meetmain/locadd")
  public AjaxResult add(Location location) throws Exception {
    int count = locationService.add(location);
    
    if (count == 0) {
      return new AjaxResult(AjaxResult.FAIL, "등록 실패입니다.");
    }

    return new AjaxResult(AjaxResult.SUCCESS, "등록 성공입니다.");
  }
  
  @RequestMapping("html/meetmain/membloc")
  public AjaxResult memblist() throws Exception {
    
    List<PlaceList> list = locationService.getmemberList();
    
    return new AjaxResult(AjaxResult.SUCCESS, list);
  }
}
