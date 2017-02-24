package z.service;

import java.util.List;

import z.domain.Member;

public interface MemberService {
  List<Member> getListMeetingMembBoss(int memberNo) throws Exception;
  List<Member> getListMeetingMembNotBoss(int memberNo) throws Exception;
  List<Member> getList() throws Exception;
  Member getDetail(int no) throws Exception;
  int add(Member member) throws Exception;
  public int chkMbEmail(String email) throws Exception; 
  //int delete(int no) throws Exception;
  //int update(Member student) throws Exception;
  int chkMbFacebook(String facebook) throws Exception;
  int updateFBphoto(Member member);
}
