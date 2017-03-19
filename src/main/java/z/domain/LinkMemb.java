package z.domain;

import java.io.Serializable;

public class LinkMemb implements Serializable {
  private static final long serialVersionUID = 1L;

  protected int linkMembNo; // 초대할 멤버 리스트

  public LinkMemb() {
  }

  public int getLinkMembNo() {
    return linkMembNo;
  }

  public void setLinkMembNo(int linkMembNo) {
    this.linkMembNo = linkMembNo;
  }

}
