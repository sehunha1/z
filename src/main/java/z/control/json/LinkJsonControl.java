package z.control.json;

import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import z.domain.Link;
import z.service.LinkService;

@RestController
public class LinkJsonControl {
  @Autowired ServletContext sc;
  
  @Autowired LinkService linkService;

  @RequestMapping("html/meetmain/getBoss")
  public AjaxResult getBoss(int memberNo) throws Exception {
    List<Link> boss = linkService.getBoss(memberNo);
    return new AjaxResult(AjaxResult.SUCCESS, boss);
  }
}
