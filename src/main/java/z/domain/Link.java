package z.domain;

import java.io.Serializable;

public class Link implements Serializable {
  private static final long serialVersionUID = 1L;

  protected int memberNo; //////// 회원 일련번호
  protected int meetingNo; /////// 모임 일련번호
  protected String boss; ///////// 방장여부
  protected String status; /////// 모임 투표 상태
  protected String acceptMeet; /// 모임 승락 여부

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

  public String getBoss() {
    return boss;
  }

  public void setBoss(String boss) {
    this.boss = boss;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public String getAcceptMeet() {
    return acceptMeet;
  }

  public void setAcceptMeet(String acceptMeet) {
    this.acceptMeet = acceptMeet;
  }

}
