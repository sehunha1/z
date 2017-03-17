package z.control.json;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import z.domain.LocationList;
import z.service.LocationListService;

import javax.servlet.ServletContext;
import java.util.List;

@RestController
public class LocationListJsonControl {
  @Autowired ServletContext sc;
  @Autowired LocationListService locationListService;

  @RequestMapping("html/detail/getLocationListDuplication")
  public AjaxResult getLocationListDuplication(int meetingNo) throws Exception {
    List<LocationList> locationListDuplication = locationListService.getLocationListDuplication(meetingNo);
    return new AjaxResult(AjaxResult.SUCCESS, locationListDuplication);
  }

  @RequestMapping("html/detail/isDuplicateLoc")
  public AjaxResult isDuplicate(int meetingNo) throws Exception {
    int isDuplicate = locationListService.isDuplicate(meetingNo);
    return new AjaxResult(AjaxResult.SUCCESS, isDuplicate);
  }
}
