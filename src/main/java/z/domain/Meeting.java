package z.domain;

import java.io.Serializable;
import java.util.List;

/*
 * 작성: 2017-02-22 - 김재녕
 * 내용: Meeting(방 개설 정보) 객체 선언.
 */

public class Meeting implements Serializable {
  private static final long serialVersionUID = 1L;

  protected int meetBossNo; ///////// 방장 일련번호
  protected int meetingNo; ////////// 모임 일련번호
  protected String title; /////////// 모임명
  protected String content; ///////// 모임상세설명
  protected String category; //////// 모임분류
  protected String deadline; //////// 모임 선택 마감기한
  protected String photo; /////////// 모임 대표 이미지
  protected String meetStat; //////// 모임 진행 상태(ing, wait, fin)
  protected String location; //////// 확정 장소
  protected String date; //////////// 확정 날짜
  protected String time; //////////// 확정 시간
  protected String sdate; /////////// 투표 가능 시작일
  protected String edate; /////////// 투표 가능 종료일
  protected List<Board> boardList; // 게시글

  public int getMeetBossNo() {
    return meetBossNo;
  }

  public void setMeetBossNo(int meetBossNo) {
    this.meetBossNo = meetBossNo;
  }

  public int getMeetingNo() {
    return meetingNo;
  }

  public void setMeetingNo(int meetingNo) {
    this.meetingNo = meetingNo;
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

  public String getCategory() {
    return category;
  }

  public void setCategory(String category) {
    this.category = category;
  }

  public String getDeadline() {
    return deadline;
  }

  public void setDeadline(String deadline) {
    this.deadline = deadline;
  }

  public String getPhoto() {
    return photo;
  }

  public void setPhoto(String photo) {
    this.photo = photo;
  }

  public String getMeetStat() {
    return meetStat;
  }

  public void setMeetStat(String meetStat) {
    this.meetStat = meetStat;
  }

  public String getLocation() {
    return location;
  }

  public void setLocation(String location) {
    this.location = location;
  }

  public String getDate() {
    return date;
  }

  public void setDate(String date) {
    this.date = date;
  }

  public String getTime() {
    return time;
  }

  public void setTime(String time) {
    this.time = time;
  }

  public String getSdate() {
    return sdate;
  }

  public void setSdate(String sdate) {
    this.sdate = sdate;
  }

  public String getEdate() {
    return edate;
  }

  public void setEdate(String edate) {
    this.edate = edate;
  }

  public List<Board> getBoardList() {
    return boardList;
  }

  public void setBoardList(List<Board> boardList) {
    this.boardList = boardList;
  }

}
