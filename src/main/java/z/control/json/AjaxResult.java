package z.control.json;

import java.util.HashMap;

public class AjaxResult {
  public static final String SUCCESS = "success";
  public static final String FAIL = "fail";
  
  String status;
  Object data;
  
  public AjaxResult() {}
  
  public AjaxResult(String status, Object data) {
    this.status = status;
    this.data = data;
  }

  public AjaxResult(String status, Object data, Object data1) {
    this.status = status;
    HashMap<Object, Object> map = new HashMap<>();
    map.put("meetingInfo", data);
    map.put("selectedDateInfo", data1);
    this.data = map;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  public Object getData() {
    return data;
  }

  public void setData(Object data) {
    this.data = data;
  }
}
