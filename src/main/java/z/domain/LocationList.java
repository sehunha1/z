package z.domain;

import java.io.Serializable;

public class LocationList implements Serializable {
  private static final long serialVersionUID = 1L;

  protected int locationListNo;
  protected int memberNo;
  protected int meetingNo;
  protected String locationListName;
  protected String locationListAddress;

  public int getLocationListNo() {
    return locationListNo;
  }

  public void setLocationListNo(int locationListNo) {
    this.locationListNo = locationListNo;
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

  public String getLocationListName() {
    return locationListName;
  }

  public void setLocationListName(String locationListName) {
    this.locationListName = locationListName;
  }

  public String getLocationListAddress() {
    return locationListAddress;
  }

  public void setLocationListAddress(String locationListAddress) {
    this.locationListAddress = locationListAddress;
  }
}
