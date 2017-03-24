package z.Filter;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;

/**
 * Created by hase on 2017. 3. 19..
 */
public class LoginCheckFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest)request;
        HttpServletResponse httpServletResponse = (HttpServletResponse)response;
        HttpSession httpSession = httpServletRequest.getSession();

        if (excludeUrl(httpServletRequest)) {
            chain.doFilter(request, response);
        } else {
            if (httpSession.getAttribute("member") == null) {
                httpServletResponse.sendRedirect("../auth/login.html");
            }
            chain.doFilter(request, response);
        }
    }

    @Override
    public void destroy() {

    }

    private boolean excludeUrl(HttpServletRequest httpServletRequest) {
        String uri = httpServletRequest.getRequestURI().toString().trim();
        if (uri.endsWith("main.html") || uri.startsWith("/z/html/auth") || uri.endsWith("header.html") || uri.endsWith("footer.html")) {
            if (uri.startsWith("/z/html/meetmain") || uri.startsWith("/z/html/mypage")) return false;
            return true;
        } else {
            return false;
        }
    }
}
