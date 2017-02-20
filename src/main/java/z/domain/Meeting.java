package z.domain;

import java.io.Serializable;

public class Meeting implements Serializable {
  private static final long serialVersionUID = 1L;
  
  protected int meetingNo;
  protected String title;
  protected String content;
  protected String category;
  protected String deadline;
  protected String photo;
  protected String location;
  protected String date;
  protected String time;
  
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
}
