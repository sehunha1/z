package z.control.json;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class JavaJsonControl {

  @RequestMapping("email/send")
  public AjaxResult emailSend(String bossEmail, String[] sendEmailList) throws Exception {
    System.out.println(bossEmail);
    for (String sendEmail : sendEmailList) {
      System.out.println(sendEmail);
    }
    
    return new AjaxResult(AjaxResult.SUCCESS, "");
  }

}