package z.domain;

import java.io.Serializable;

public class Board implements Serializable {
  private static final long serialVersionUID = 1L;
  
  public static final String BOARD = "board";
  public static final String STUDENT = "student";
  public static final String TEACHER = "teacher";
  public static final String MANAGER = "manager";
  
  protected String title;
  protected String content;
  protected String filePath;
  protected int boardNo;
  protected int meetNo;
  protected int memberNo;
  public String getTitle() {
    return title;
  }
  public void setTitle(String title) {
    this.title = title;
  }
  public String getContent() {
    return content;
  }
  public void setContent(String content) {
    this.content = content;
  }
  public String getFilePath() {
    return filePath;
  }
  public void setFilePath(String filePath) {
    this.filePath = filePath;
  }
  public int getBoardNo() {
    return boardNo;
  }
  public void setBoardNo(int boardNo) {
    this.boardNo = boardNo;
  }
  public int getMeetNo() {
    return meetNo;
  }
  public void setMeetNo(int meetNo) {
    this.meetNo = meetNo;
  }
  public int getMemberNo() {
    return memberNo;
  }
  public void setMemberNo(int memberNo) {
    this.memberNo = memberNo;
  }
 
  

  


}


