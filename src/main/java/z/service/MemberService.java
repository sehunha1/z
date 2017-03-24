package z.service;

import java.util.List;

import z.domain.Link;
import z.domain.Member;

public interface MemberService {
  List<Member> getListMeetingMembBoss(int meetingNo) throws Exception;
  List<Member> getListMeetingMembNotBoss(int meetingNo) throws Exception;
  List<Member> getList() throws Exception;
  Member getDetail(int no) throws Exception;
  int add(Member member) throws Exception;
  int chkMbEmail(String email) throws Exception; 
  //int delete(int no) throws Exception;
  int chkMbFacebook(String facebook) throws Exception;
  int updateFBphoto(Member member);
  int update(Member member) throws Exception;
  int updatelogin(Member member) throws Exception;
  // 회원삭제
  //int locmemberdelete(int memberNo) throws Exception;
  //int listmemberdelete(int memberNo) throws Exception;
  //int boardmemberdelete(int memberNo) throws Exception;
  //int calmemberdelete(int memberNo) throws Exception;
  //int linkmemberdelete(int memberNo) throws Exception;
  int memberdelete(int memberNo) throws Exception;
  
  int countEmailPassword(String email, String password) throws Exception;
  public String getSideMemb (String emailAddress) throws Exception; // SideBar 멤버 추가시 회원 유무 조회
  public int getSideLink (Link link) throws Exception; // SideBar 멤버 추가시 초대 여부 조회
  int updatefcbk(Member member) throws Exception;
  int passcheck(int memberNo, String password) throws Exception;
}
