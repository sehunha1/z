package z.domain;

import java.io.Serializable;
import java.util.List;

public class Calendar implements Serializable {
  private static final long serialVersionUID = 1L;

  protected int memberNo;
  protected int meetingNo;
  protected String calendarDate;
  protected String calendarTime;
  protected List<Calendar> selectedDateInfo;

  public int getMemberNo() {
    return memberNo;
  }

  public void setMemberNo(int memberNo) {
    this.memberNo = memberNo;
  }

  public int getMeetingNo() {
    return meetingNo;
  }

  public void setMeetingNo(int meetingNo) {
    this.meetingNo = meetingNo;
  }

  public String getCalendarDate() {
    return calendarDate;
  }

  public void setCalendarDate(String calendarDate) {
    this.calendarDate = calendarDate;
  }

  public String getCalendarTime() {
    return calendarTime;
  }

  public void setCalendarTime(String calendarTime) {
    this.calendarTime = calendarTime;
  }

  public List<Calendar> getSelectedDateInfo() {
    return selectedDateInfo;
  }

  public void setSelectedDateInfo(List<Calendar> selectedDateInfo) {
    this.selectedDateInfo = selectedDateInfo;
  }
}
