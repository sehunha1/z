package z.dao;

import java.util.ArrayList;
import java.util.Map;

import z.domain.Member;

public interface MemberDao {
  ArrayList<Member> getListMeetingMembBoss(int memberNo, int meetingNo) throws Exception;
  ArrayList<Member> getListMeetingMembNotBoss(int memberNo, int meetingNo) throws Exception;
  ArrayList<Member> getList() throws Exception;
  Member getOne(int memberNo) throws Exception;
  Member getOneByEmail(String email) throws Exception;
  int insert(Member member) throws Exception;
  int count(String email) throws Exception;
  Member getOneByEmailPassword(Map<String,String> paramMap) throws Exception;
  Member getOneByEmailFacebook(Map<String,String> paramMap) throws Exception;
  public int chkMbEmail (String email);
  int chkMbFacebook (String facebook);
  /*int countByNo(int memberNo) throws Exception;
  int update(Member student) throws Exception;
  int delete(int memberNo) throws Exception;*/
  int chkFacebookPhoto(String facebook, String photo);
  int updateFBphoto(Member member);
}
