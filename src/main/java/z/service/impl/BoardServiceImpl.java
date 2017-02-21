package z.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import z.dao.BoardDao;
import z.dao.MemberDao;
import z.domain.Board;
import z.service.BoardService;

@Service
public class BoardServiceImpl implements BoardService {
  
  @Autowired MemberDao memberDao;
  @Autowired BoardDao boardDao;
  
  
  public List<Board> getList() throws Exception {
    return boardDao.getList();
  }
  
  
  public Board getDetail(int no) throws Exception {
    return boardDao.getOne(no);
  }
  public int add(Board board) throws Exception {
    
    if (boardDao.count(board.getTitle()) > 0) {
      throw new Exception("같은 학생의 이메일이 존재합니다. 등록을 취소합니다.");
    }
    /*
    if (memberDao.count(member.getEmail()) == 0) { 
      //memberDao.insert(member);
      
    } else {
      member = memberDao.get OneByEmail(member.getEmail());
      member.setMemberNo(member.getMemberNo());
    }
    */
    return boardDao.insert(board);
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


  @Override
  public int delete(int no) throws Exception {
    // TODO Auto-generated method stub
    return 0;
  }


  @Override
  public int update(Board board) throws Exception {
    // TODO Auto-generated method stub
    return 0;
  }
}
