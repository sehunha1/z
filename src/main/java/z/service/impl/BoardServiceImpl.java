package z.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import z.dao.BoardDao;
import z.dao.MemberDao;
import z.domain.Board;
import z.domain.Link;
import z.service.BoardService;

@Service
public class BoardServiceImpl implements BoardService {
  
  @Autowired MemberDao memberDao;
  @Autowired BoardDao boardDao;
  
  
  public List<Board> getList(int mtnum) throws Exception {
    return boardDao.getList(mtnum);
  }
  
  
  public Board getDetail(int no) throws Exception {
    return boardDao.getOne(no);
  }
  public int add(Board board) throws Exception {
    
    /*
    if (memberDao.count(member.getEmail()) == 0) { 
      //memberDao.insert(member);
      
    } else {
      member = memberDao.get OneByEmail(member.getEmail());
      member.setMemberNo(member.getMemberNo());
    }
    */
    int count = boardDao.insert(board);
    if (board.getAddFileList().size() != 0 ) {
      boardDao.insertlink(board);
    }
    return count;
  }
  
  public int fileadd(Link link) throws Exception {
    
    /*
    if (memberDao.count(member.getEmail()) == 0) { 
      //memberDao.insert(member);
      
    } else {
      member = memberDao.get OneByEmail(member.getEmail());
      member.setMemberNo(member.getMemberNo());
    }
    */
    /*return boardDao.insertlink(link);*/
    return 0;
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
    
    if (boardDao.getBoardNo(no) == 0) { 
      //memberDao.insert(member);
      throw new Exception("게시물을 찾지 못했습니다");
    } 
    int count2 = boardDao.delete2(no);
    int count = boardDao.delete(no);
    return count & count2;
   
  }


  @Override
  public int update(Board board) throws Exception {
    return boardDao.update(board);
  }
}
