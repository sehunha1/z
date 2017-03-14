package z.domain;

public class Location {
  protected int locationListNo; // 주키
  protected int locationNo;
  protected int memberNo;
  protected int meetingNo;
  
  public int getLocationListNo() {
    return locationListNo;
  }
  public void setLocationListNo(int locationListNo) {
    this.locationListNo = locationListNo;
  }
  public int getLocationNo() {
    return locationNo;
  }
  public void setLocationNo(int locationNo) {
    this.locationNo = locationNo;
  }
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
}
