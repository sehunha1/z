package z.control.json;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import z.domain.Calendar;
import z.domain.Test;
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

  @RequestMapping(value="html/meetmain/getSelectDate", method=RequestMethod.GET)
  public AjaxResult getSelectDate(int meetingNo) throws Exception {
    Time time = timeService.getTime(meetingNo);
    List<Calendar> selectedDateInfo = calendarService.getSelectedDateInfo(meetingNo);
    return new AjaxResult(AjaxResult.SUCCESS, time, selectedDateInfo);
  }

  @RequestMapping(value="html/meetmain/getSelectDate", method=RequestMethod.POST)
  public AjaxResult getSelectDate(@RequestBody Object jsonData) throws Exception {
    Calendar calendar = new Calendar();
    LinkedHashMap<String, ArrayList<LinkedHashMap<String, Object>>> map_jsonData = (LinkedHashMap<String, ArrayList<LinkedHashMap<String, Object>>>) jsonData;
    ArrayList<LinkedHashMap<String, Object>> aData = map_jsonData.get("aData");
    LinkedHashMap<String, Object> map_list = aData.get(0);
    int meetingNo = (int)map_list.get("meetingNo");
    int count = calendarService.deleteCal(meetingNo);

    for (int i = 0; i < aData.size(); i++) {
      LinkedHashMap<String, Object> map_list1 = aData.get(i);
      ArrayList<Object> calendarTime = (ArrayList<Object>)map_list1.get("calendarTime");
      ArrayList<Object> memberNo = (ArrayList<Object>)map_list1.get("memberNo");
      for (int j = 0; j < calendarTime.size(); j++) {
        String calendarDate = (String)map_list1.get("calendarDate");
        String calendarTime1 = (String)calendarTime.get(j);
        int memberNo1;

        if (memberNo.get(j).getClass().getName().equals("java.lang.Integer")) {
          memberNo1 = (int)memberNo.get(j);
        } else {
          memberNo1 = Integer.parseInt((String)memberNo.get(j));
        }

        calendar.setMemberNo(memberNo1);
        calendar.setMeetingNo(meetingNo);
        calendar.setCalendarDate(calendarDate);
        calendar.setCalendarTime(calendarTime1);

        int count1 = calendarService.insertCal(calendar);
      }
    }

    Time time = timeService.getTime(meetingNo);
    List<Calendar> selectedDateInfo = calendarService.getSelectedDateInfo(meetingNo);
    return new AjaxResult(AjaxResult.SUCCESS, time, selectedDateInfo);
  }
}