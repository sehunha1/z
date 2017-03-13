package z.domain;

import java.io.Serializable;

public class Member implements Serializable {
  private static final long serialVersionUID = 1L;
  
  protected int memberNo;
  protected String email;
  protected String name;
  protected String password;
  protected String photo;
  protected String kakao;
  protected String facebook;
  protected boolean meetStat;

  public int getMemberNo() {
    return memberNo;
  }

  public void setMemberNo(int memberNo) {
    this.memberNo = memberNo;
  }

  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
    this.email = email;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getPhoto() {
    return photo;
  }

  public void setPhoto(String photo) {
    this.photo = photo;
  }

  public String getKakao() {
    return kakao;
  }

  public void setKakao(String kakao) {
    this.kakao = kakao;
  }

  public String getFacebook() {
    return facebook;
  }

  public void setFacebook(String facebook) {
    this.facebook = facebook;
  }

  public boolean isMeetStat() {
    return meetStat;
  }

  public void setMeetStat(boolean meetStat) {
    this.meetStat = meetStat;
  }

}
