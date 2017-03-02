package z.service;

import java.util.List;

import z.domain.Member;

public interface MemberService {
  List<Member> getListMeetingMembBoss(int meetingNo) throws Exception;
  List<Member> getListMeetingMembNotBoss(int meetingNo) throws Exception;
  List<Member> getList() throws Exception;
  Member getDetail(int no) throws Exception;
  int add(Member member) throws Exception;
  public int chkMbEmail(String email) throws Exception; 
  //int delete(int no) throws Exception;
  int chkMbFacebook(String facebook) throws Exception;
  int updateFBphoto(Member member);
  int update(Member member) throws Exception;
  int updatelogin(Member member) throws Exception;
  int delete(int memberNo) throws Exception;
  int countEmailPassword(String email, String password) throws Exception;
}
