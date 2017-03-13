package z.domain;

import java.io.Serializable;

public class Time implements Serializable {
  private static final long serialVersionUID = 1L;

  protected String startDate;
  protected String endDate;

  public String getStartDate() {
    return startDate;
  }

  public void setStartDate(String startDate) {
    this.startDate = startDate;
  }

  public String getEndDate() {
    return endDate;
  }

  public void setEndDate(String endDate) {
    this.endDate = endDate;
  }
}
