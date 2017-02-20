package z.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import z.dao.MemberDao;
import z.domain.Member;
import z.service.MemberService;

@Service
public class MemberServiceImpl implements MemberService {
  @Autowired MemberDao memberDao;

  public List<Member> getListMeetingMemb(int memberNo) throws Exception {
    return memberDao.getListMeetingMemb(memberNo);
  }
  
  public List<Member> getList() throws Exception {
    return memberDao.getList();
  }
  
  
  public Member getDetail(int no) throws Exception {
    return memberDao.getOne(no);
  }
  public int add(Member member) throws Exception {
    
    if (memberDao.count(member.getEmail()) > 0) {
      //throw new Exception("같은 학생의 이메일이 존재합니다. 등록을 취소합니다.");
    }
    /*
    if (memberDao.count(member.getEmail()) == 0) { 
      //memberDao.insert(member);
      
    } else {
      member = memberDao.getOneByEmail(member.getEmail());
      member.setMemberNo(member.getMemberNo());
    }
    */
    return memberDao.insert(member);
  }
  
  public int chkMbEmail(String email) throws Exception {
   
    return memberDao.chkMbEmail(email);
  }
  
  /*
  public int delete(int no) throws Exception {
    if (studentDao.countByNo(no) == 0) {
      throw new Exception("학생을 찾지 못했습니다.");
    }
    
    int count = studentDao.delete(no);

    if (managerDao.countByNo(no) == 0 && teacherDao.countByNo(no) == 0) {
      memberDao.delete(no);
    }
    
    return count;
  }
  
  public int update(Student student) throws Exception {
    if (studentDao.countByNo(student.getMemberNo()) == 0) {
      throw new Exception("학생을 찾지 못했습니다.");
    }
    memberDao.update(student);
    return studentDao.update(student);
  }*/
}
















