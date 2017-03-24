package z.service.impl;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import z.dao.MemberDao;
import z.domain.Link;
import z.domain.Member;
import z.service.MemberService;

@Service
public class MemberServiceImpl implements MemberService {
  @Autowired
  MemberDao memberDao;

  public List<Member> getListMeetingMembBoss(int meetingNo) throws Exception {
    return memberDao.getListMeetingMembBoss(meetingNo);
  }

  public List<Member> getListMeetingMembNotBoss(int meetingNo) throws Exception {
    return memberDao.getListMeetingMembNotBoss(meetingNo);
  }

  public List<Member> getList() throws Exception {
    return memberDao.getList();
  }
  
  // Sidebar 멤버 추가시 회원 유무 조회
  public String getSideMemb (String emailAddress) throws Exception {
    return memberDao.getSideMemb(emailAddress);
  }
  
  // SideBar 멤버 추가시 초대 여부 조회
  public int getSideLink (Link link) throws Exception {
    return memberDao.getSideLink(link);
  }

  public Member getDetail(int no) throws Exception {
    return memberDao.getOne(no);
  }

  public int add(Member member) throws Exception {

    if (memberDao.count(member.getEmail()) > 0) {
      // throw new Exception("같은 학생의 이메일이 존재합니다. 등록을 취소합니다.");
    }
    /*
     * if (memberDao.count(member.getEmail()) == 0) {
     * //memberDao.insert(member);
     * 
     * } else { member = memberDao.getOneByEmail(member.getEmail());
     * member.setMemberNo(member.getMemberNo()); }
     */
    return memberDao.insert(member);
  }

  public int update(Member member) throws Exception {
    if (memberDao.countByNo(member.getMemberNo()) == 0) {
      throw new Exception("회원을 찾지 못했습니다.");
    }
    memberDao.update(member);
    return memberDao.update(member);
  }

  public int updatelogin(Member member) throws Exception {
    if (memberDao.countByNo(member.getMemberNo()) == 0) {
      throw new Exception("회원을 찾지 못했습니다.");
    }
    //memberDao.updatelogin(member);
    return memberDao.updatelogin(member);
  }

  public int chkMbEmail(String email) throws Exception {
    return memberDao.chkMbEmail(email);
  }
  
  public int chkMbFacebook(String facebook) throws Exception {
    return memberDao.chkMbFacebook(facebook);
  }

  public int updateFBphoto(Member member) {

    return memberDao.updateFBphoto(member);
  }

  public int memberdelete(int no) throws Exception {
    if (memberDao.countByNo(no) == 0) {
      throw new Exception("회원을 찾지 못했습니다.");
    }
    
    int count = memberDao.linkCheck(no);
    
    if (count == 0) {
      int count2 = memberDao.memberdelete(no);
      return count2;
    } 
      memberDao.memberChange(no);
      return count;
  }

  public int countEmailPassword(String email, String password) throws Exception {
    HashMap<String, String> paramMap = new HashMap<>();
    paramMap.put("email", email);
    paramMap.put("password", password);

    int count = memberDao.getOneByEmailPasswordCount(paramMap);

    if (count == 0) {
      return 0;
    }
    return count;
  }

  public int updatefcbk(Member member) throws Exception {
    return memberDao.updatefcbk(member);
  }
/*
  public int locmemberdelete(int memberNo) throws Exception {
    int count = memberDao.locmemberdelete(memberNo);
    return count;
  }

  public int listmemberdelete(int memberNo) throws Exception {
    int count = memberDao.listmemberdelete(memberNo);
    return count;
  }

  public int boardmemberdelete(int memberNo) throws Exception {
    int count = memberDao.boardmemberdelete(memberNo);
    return count;
  }

  public int calmemberdelete(int memberNo) throws Exception {
    int count = memberDao.calmemberdelete(memberNo);
    return count;
  }

  public int linkmemberdelete(int memberNo) throws Exception {
    int count = memberDao.linkmemberdelete(memberNo);
    return count;
  }*/

  public int passcheck(int memberNo, String password) throws Exception {
    return memberDao.passcheck(memberNo, password);
  }
}
