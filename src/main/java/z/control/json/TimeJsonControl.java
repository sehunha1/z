package z.control.json;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import z.domain.Calendar;
import z.domain.Time;
import z.service.CalendarService;
import z.service.LinkService;
import z.service.LocationService;
import z.service.TimeService;

@RestController
public class TimeJsonControl {
  @Autowired ServletContext sc;
  @Autowired TimeService timeService;
  @Autowired CalendarService calendarService;
  @Autowired LocationService locationService;
  @Autowired LinkService linkService;

  @RequestMapping("html/meetmain/getTime")
  public AjaxResult getTime(int meetingNo) throws Exception {
    Time time = timeService.getTime(meetingNo);
    return new AjaxResult(AjaxResult.SUCCESS, time);
  }
  
  // 투표 날짜 리스트
  @RequestMapping(value="html/meetmain/getSelectDate", method=RequestMethod.GET)
  public AjaxResult getSelectDate(int meetingNo) throws Exception {
    Time time = timeService.getTime(meetingNo);
    List<Calendar> selectedDateInfo = calendarService.getSelectedDateInfo(meetingNo);
    return new AjaxResult(AjaxResult.SUCCESS, time, selectedDateInfo);
  }

  @RequestMapping(value="html/meetmain/getSelectDate", method=RequestMethod.POST)
  public AjaxResult getSelectDate(@RequestBody Object jsonData, HttpServletRequest httpServletRequest) throws Exception {
    Calendar calendar = new Calendar();
    LinkedHashMap<String, ArrayList<LinkedHashMap<String, Object>>> map_jsonData = (LinkedHashMap<String, ArrayList<LinkedHashMap<String, Object>>>) jsonData;
    ArrayList<LinkedHashMap<String, Object>> aData = map_jsonData.get("aData");
    int memberNo2 = Integer.parseInt(httpServletRequest.getParameter("memberNo"));
    int meetingNo = Integer.parseInt(httpServletRequest.getParameter("meetingNo"));
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

    int count2 = locationService.getCheckLoc(memberNo2, meetingNo);
    if (count2 > 0) {
      linkService.updateStat(memberNo2, meetingNo);
    }

    return this.getSelectDate(meetingNo);
  }
}