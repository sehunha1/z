package z.domain;

import java.io.Serializable;

public class Time implements Serializable {
  private static final long serialVersionUID = 1L;
  
  protected int limitedDateNo;
  protected int meetingNo;
  protected String startDate;
  protected String endDate;

  public int getLimitedDateNo() {
    return limitedDateNo;
  }

  public void setLimitedDateNo(int limitedDateNo) {
    this.limitedDateNo = limitedDateNo;
  }

  public int getMeetingNo() {
    return meetingNo;
  }

  public void setMeetingNo(int meetingNo) {
    this.meetingNo = meetingNo;
  }

  public String getStartDate() {
    return startDate;
  }

  public void setStartDate(String startDate) {
    this.startDate = startDate;
  }

  public String getEndDate() {
    return endDate;
  }

  public void setEndDate(String endDate) {
    this.endDate = endDate;
  }
}
