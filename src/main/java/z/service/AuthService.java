package z.service;

import z.domain.Member;

public interface AuthService {
  Member getMemberInfo(String email, String password) throws Exception;
  Member getMemberInfoFacebook(String facebook) throws Exception;
  //Member getMemberInfoFacebook(String email, String facebook) throws Exception;
}
