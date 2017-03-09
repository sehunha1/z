package z.domain;

/*
 * 작성: 2017-03-02 - 김재녕
 * 내용: 게시글 객체 생성
 */

import java.io.Serializable;
import java.util.List;

public class Board implements Serializable {
  private static final long serialVersionUID = 1L;

  protected int boardNo; //////////////// 게시글 일련번호
  protected int memberNo; /////////////// 작성자 일련번호
  protected String name; //////////////// 작성자 이름
  protected int meetNo; ///////////////// 모임 일련번호
  protected String title; /////////////// 제목
  protected String content; ///////////// 내용
  protected String boardDate; /////////// 게시글 DateTime
  protected List<AddFile> addFileList; // 첨부파일

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

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
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

  public List<AddFile> getAddFileList() {
    return addFileList;
  }

  public void setAddFileList(List<AddFile> addFileList) {
    this.addFileList = addFileList;
  }

  public String getBoardDate() {
    return boardDate;
  }

  public void setBoardDate(String boardDate) {
    this.boardDate = boardDate;
  }

}
