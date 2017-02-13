package z.service;

import z.domain.Member;

public interface AuthService {
  Member getMemberInfo(String email, String password, String userType) throws Exception;
}
