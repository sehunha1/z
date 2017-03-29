package z.domain;

/*
 * 작성: 2017-03-02 - 김재녕
 * 내용: 파일 객체 생성
 */

import java.io.Serializable;

public class AddFile implements Serializable {
  private static final long serialVersionUID = 1L;

  protected int fileNo; /////// 첨부파일 일련번호
  protected int boardNo;
  protected String filePath; // 파일 링크주소
  protected String fileDesc; // 파일 종류

  public AddFile() {
  }

  public AddFile(String filePath) {
    this.filePath = filePath;
  }

  public int getFileNo() {
    return fileNo;
  }

  public void setFileNo(int fileNo) {
    this.fileNo = fileNo;
  }

  public String getFilePath() {
    return filePath;
  }

  public void setFilePath(String filePath) {
    this.filePath = filePath;
  }

  public String getFileDesc() {
    return fileDesc;
  }

  public void setFileDesc(String fileDesc) {
    this.fileDesc = fileDesc;
  }

  public int getBoardNo() {
    return boardNo;
  }

  public void setBoardNo(int boardNo) {
    this.boardNo = boardNo;
  }

}
