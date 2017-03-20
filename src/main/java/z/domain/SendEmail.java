package z.domain;

import java.io.Serializable;

public class SendEmail implements Serializable {
  private static final long serialVersionUID = 1L;

  protected String bossEmail; //////// 방장 이메일(송신자)
  protected String[] sendEmailList; // 초대 멤버 이메일 리스트(수신자)
  protected int[] memberNo; ////////// 초대 멤버 일련번호 리스트

  public SendEmail() {
  }

  public String getBossEmail() {
    return bossEmail;
  }

  public void setBossEmail(String bossEmail) {
    this.bossEmail = bossEmail;
  }

  public String[] getSendEmailList() {
    return sendEmailList;
  }

  public void setSendEmailList(String[] sendEmailList) {
    this.sendEmailList = sendEmailList;
  }

  public int[] getMemberNo() {
    return memberNo;
  }

  public void setMemberNo(int[] memberNo) {
    this.memberNo = memberNo;
  }

}
