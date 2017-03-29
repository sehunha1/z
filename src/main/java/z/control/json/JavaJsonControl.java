package z.control.json;

import javax.servlet.http.HttpSession;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import z.domain.Member;
import z.domain.SendMail;

@RestController
public class JavaJsonControl {

  @RequestMapping("email/send")
  public AjaxResult emailSend(String[] sendEmailList, HttpSession session) throws Exception {
    Member member = (Member)session.getAttribute("member");
    
    SendMail sendMail = new SendMail();
    sendMail.mailSend();
    
    return new AjaxResult(AjaxResult.SUCCESS, "");
  }

}