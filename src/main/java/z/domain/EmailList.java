package z.domain;

import java.io.Serializable;

public class EmailList implements Serializable {
  private static final long serialVersionUID = 1L;

  protected String[] emailList;

  public String[] getEmailList() {
    return emailList;
  }

  public void setEmailList(String[] emailList) {
    this.emailList = emailList;
  }
 
}
