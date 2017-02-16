package z.dao;

import java.util.ArrayList;
import java.util.Map;

import z.domain.Member;


public interface MemberDao {
  ArrayList<Member> getList() throws Exception;
  Member getOne(int memberNo) throws Exception;
  Member getOneByEmail(String email) throws Exception;
  int insert(Member member) throws Exception;
  int count(String email) throws Exception;
  Member getOneByEmailPassword(Map<String,String> paramMap) throws Exception;
  /*int countByNo(int memberNo) throws Exception;
  int update(Member student) throws Exception;
  int delete(int memberNo) throws Exception;*/
}
