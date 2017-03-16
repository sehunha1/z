package z.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import z.domain.Member;

public class LoginCheckInterceptor extends HandlerInterceptorAdapter {
  @Override
  public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
    HttpSession session = request.getSession();
    Member member = (Member)session.getAttribute("member");
    
    if (member == null) {
      response.sendRedirect(request.getContextPath() + "/html/auth/login.html");
      return false;
    }
    System.out.println(request.getContextPath());
    
    return true;
  }
}
