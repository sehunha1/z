package z.service.impl;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import z.dao.MemberDao;
import z.domain.Member;
import z.service.AuthService;

@Service
public class AuthServiceImpl implements AuthService {
  
  @Autowired MemberDao memberDao;
  
  public Member getMemberInfo(String email, String password) throws Exception {
    HashMap<String,String> paramMap = new HashMap<>();
    paramMap.put("email", email);
    paramMap.put("password", password);
    
    Member member = memberDao.getOneByEmailPassword(paramMap);
    
    if (member == null) {
      return null;
    }
      return memberDao.getOne(member.getMemberNo());
  }

  /*
  public Member getMemberInfoFacebook(String email, String facebook) throws Exception {
    HashMap<String,String> paramMap = new HashMap<>();
    paramMap.put("email", email);
    paramMap.put("facebook", facebook);
    
    Member member = memberDao.getOneByEmailFacebook(paramMap);
    
    if (member == null) {
      return null;
    }
      return memberDao.getOne(member.getMemberNo());
  }*/
  
  public Member getMemberInfoFacebook(String facebook) throws Exception {

    Member member = memberDao.getOneByFacebook(facebook);
    
    if (member == null) {
      return null;
    }
      return memberDao.getOne(member.getMemberNo());
  }
}
