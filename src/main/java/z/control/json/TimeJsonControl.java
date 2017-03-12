package z.control.json;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import z.domain.Calendar;
import z.domain.Time;
import z.service.CalendarService;
import z.service.TimeService;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
public class TimeJsonControl {
  @Autowired ServletContext sc;
  @Autowired TimeService timeService;
  @Autowired CalendarService calendarService;

  @RequestMapping("html/meetmain/getTime")
  public AjaxResult getTime(int meetingNo) throws Exception {
    Time time = timeService.getTime(meetingNo);
    return new AjaxResult(AjaxResult.SUCCESS, time);
  }

  @RequestMapping("html/meetmain/getSelectDate")
  public AjaxResult getSelectDate(int meetingNo) throws Exception {
    Time time = timeService.getTime(meetingNo);
    List<Calendar> selectedDateInfo = calendarService.getSelectedDateInfo(meetingNo);
    return new AjaxResult(AjaxResult.SUCCESS, time, selectedDateInfo);
  }
}