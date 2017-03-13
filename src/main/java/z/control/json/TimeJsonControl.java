package z.control.json;

import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import z.domain.Calendar;
import z.domain.Time;
import z.service.CalendarService;
import z.service.TimeService;

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