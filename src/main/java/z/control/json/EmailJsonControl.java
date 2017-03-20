package z.control.json;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class EmailJsonControl {
  
  @RequestMapping("html/send/sendEmail")
  public AjaxResult login(String bossEmail, String[] sendEmailList, int[] linkMembList) throws Exception {
//    System.out.println(bossEmail);
//    
//    for (String email : sendEmailList) {
//      System.out.println(email);
//    }
//    
//    for (int membNo : linkMembList) {
//      System.out.println(membNo);
//    }
    
    
    return new AjaxResult(AjaxResult.SUCCESS, "성공");
  }
 
}

