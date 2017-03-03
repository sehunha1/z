package z.control.json;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.ServletContext;

import z.domain.Calendar;
import z.service.CalendarService;

import java.util.List;

@RestController
public class CalendarJsonControl {
  @Autowired ServletContext sc;
  @Autowired CalendarService calendarService;

  @RequestMapping("html/detail/getDateDuplication")
  public AjaxResult getDateDuplication(int meetingNo) throws Exception {
    List<Calendar> dateDuplication = calendarService.getDateDuplication(meetingNo);
    return new AjaxResult(AjaxResult.SUCCESS, dateDuplication);
  }
}
