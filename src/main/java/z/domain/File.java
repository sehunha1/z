package z.domain;

import java.io.Serializable;

public class File implements Serializable {
  private static final long serialVersionUID = 1L;
  
  protected int no;
  protected String filePath;
  protected int ownerNo;
  
  public File() {}
  
  public File(String filePath) {
    this.filePath = filePath;
  }
  
  public int getNo() {
    return no;
  }
  public File setNo(int no) {
    this.no = no;
    return this;
  }
  public String getFilePath() {
    return filePath;
  }
  public File setFilePath(String filePath) {
    this.filePath = filePath;
    return this;
  }
  public int getOwnerNo() {
    return ownerNo;
  }
  public File setOwnerNo(int ownerNo) {
    this.ownerNo = ownerNo;
    return this;
  }
  
  
  
}

