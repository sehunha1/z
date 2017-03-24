package z.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.apache.ibatis.annotations.Param;

import z.domain.Link;
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
  //Member getOneByEmailFacebook(Map<String,String> paramMap) throws Exception;
  Member getOneByFacebook(String facebook) throws Exception;
  int chkMbEmail (String email);
  int chkMbFacebook (String facebook);
  /*int countByNo(int memberNo) throws Exception;
  int update(Member student) throws Exception;
  int delete(int memberNo) throws Exception;*/
  int chkFacebookPhoto(String facebook, String photo);
  int updateFBphoto(Member member);
  int update(Member member) throws Exception;
  int countByNo(int memberNo);
  int updatelogin(Member member);
  int getOneByEmailPasswordCount(HashMap<String, String> paramMap);
  // 회원 탈퇴
  //int locmemberdelete(int memberNo); 
  //int listmemberdelete(int memberNo); 
  //int boardmemberdelete(int memberNo);
  //int calmemberdelete(int memberNo);
  //int linkmemberdelete(int memberNo);
  int memberdelete(int memberNo);
  int memberChange(int no);
  // 회원 삭제 끝
  String getSideMemb(@Param("emailAddress") String emailAddress) throws Exception; // Sidebar 멤버 추가시 회원 유무 조회
  int getSideLink(Link link) throws Exception; // SideBar 멤버 추가시 초대 여부 조회
  int updatefcbk(Member member) throws Exception;
  int linkCheck(int no) throws Exception;
  int passcheck(int memberNo, String password) throws Exception;
}
