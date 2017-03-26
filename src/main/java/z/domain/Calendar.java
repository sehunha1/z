package z.domain;

import java.io.Serializable;

public class Calendar implements Serializable {
  private static final long serialVersionUID = 1L;

  protected int memberNo;
  protected int meetingNo;
  protected int nTotalSelector;
  protected int caleanderNo;
  protected String calendarDate;
  protected String calendarTime;
  protected String userName;
  protected String userPhoto;

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

  public int getnTotalSelector() {
    return nTotalSelector;
  }

  public void setnTotalSelector(int nTotalSelector) {
    this.nTotalSelector = nTotalSelector;
  }

  public int getCaleanderNo() {
    return caleanderNo;
  }

  public void setCaleanderNo(int caleanderNo) {
    this.caleanderNo = caleanderNo;
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

  public String getUserName() {
    return userName;
  }

  public void setUserName(String userName) {
    this.userName = userName;
  }

  public String getUserPhoto() {
    return userPhoto;
  }

  public void setUserPhoto(String userPhoto) {
    this.userPhoto = userPhoto;
  }

}
