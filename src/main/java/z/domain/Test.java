package z.domain;

import java.io.Serializable;
import java.util.List;

public class Test implements Serializable {
  private static final long serialVersionUID = 1L;

  protected List<Ttest> aData;

  public List<Ttest> getaData() {
    return aData;
  }

  public void setaData(List<Ttest> aData) {
    this.aData = aData;
  }

  public class Ttest {
    protected String calendarDate;
    protected List<String> calendarTime;
    protected int meetingNo;
    protected List memberNo;

    public String getCalendarDate() {
      return calendarDate;
    }

    public void setCalendarDate(String calendarDate) {
      this.calendarDate = calendarDate;
    }

    public List<String> getCalendarTime() {
      return calendarTime;
    }

    public void setCalendarTime(List<String> calendarTime) {
      this.calendarTime = calendarTime;
    }

    public int getMeetingNo() {
      return meetingNo;
    }

    public void setMeetingNo(int meetingNo) {
      this.meetingNo = meetingNo;
    }

    public List getMemberNo() {
      return memberNo;
    }

    public void setMemberNo(List memberNo) {
      this.memberNo = memberNo;
    }
  }
}
