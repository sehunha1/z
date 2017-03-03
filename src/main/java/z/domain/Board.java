package z.domain;

/*
 * 작성: 2017-03-02 - 김재녕
 * 내용: 게시글 객체 생성
 */

import java.io.Serializable;

public class Board implements Serializable {
  private static final long serialVersionUID = 1L;

  protected int boardNo; //////// 게시글 일련번호
  protected int memberNo; /////// 작성자 일련번호
  protected int meetNo; ////// 모임 일련번호
  protected String title; /////// 제목
  protected String content; ///// 내용
  protected AddFile[] addFileList; // 첨부파일

  public Board() {
  }

  public int getBoardNo() {
    return boardNo;
  }

  public void setBoardNo(int boardNo) {
    this.boardNo = boardNo;
  }

  public int getMemberNo() {
    return memberNo;
  }

  public void setMemberNo(int memberNo) {
    this.memberNo = memberNo;
  }

  public int getMeetNo() {
    return meetNo;
  }

  public void setMeetNo(int meetNo) {
    this.meetNo = meetNo;
  }

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

  public AddFile[] getAddFileList() {
    return addFileList;
  }

  public void setAddFileList(AddFile[] addFileList) {
    this.addFileList = addFileList;
  }

  // public static final String BOARD = "board";
  // public static final String STUDENT = "student";
  // public static final String TEACHER = "teacher";
  // public static final String MANAGER = "manager";
  //
  // protected String title;
  // protected String content;
  // protected String filePath;
  // protected int boardNo;
  // protected int meetNo;
  // protected int memberNo;
  //
  // public String getTitle() {
  // return title;
  // }
  // public void setTitle(String title) {
  // this.title = title;
  // }
  // public String getContent() {
  // return content;
  // }
  // public void setContent(String content) {
  // this.content = content;
  // }
  // public String getFilePath() {
  // return filePath;
  // }
  // public void setFilePath(String filePath) {
  // this.filePath = filePath;
  // }
  // public int getBoardNo() {
  // return boardNo;
  // }
  // public void setBoardNo(int boardNo) {
  // this.boardNo = boardNo;
  // }
  // public int getMeetNo() {
  // return meetNo;
  // }
  // public void setMeetNo(int meetNo) {
  // this.meetNo = meetNo;
  // }
  // public int getMemberNo() {
  // return memberNo;
  // }
  // public void setMemberNo(int memberNo) {
  // this.memberNo = memberNo;
  // }

}
