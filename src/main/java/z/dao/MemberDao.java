package z.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import z.domain.Member;

public interface MemberDao {
  ArrayList<Member> getListMeetingMembBoss(int meetingNo) throws Exception;
  ArrayList<Member> getListMeetingMembNotBoss(int meetingNo) throws Exception;
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
  int update(Member member) throws Exception;
  int countByNo(int memberNo);
  int updatelogin(Member member);
  int memberdelete(int no);
  int getOneByEmailPasswordCount(HashMap<String, String> paramMap);
  int linkmemberdelete(int no);
  int getSideMemb(@Param("emailAddress") String emailAddress) throws Exception;
}
