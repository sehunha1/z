package z.service;

import java.util.List;

import z.domain.Board;
import z.domain.Link;

public interface BoardService {
  List<Board> getList(int mtnum) throws Exception;
  Board getDetail(int no) throws Exception;
  int add(Board board) throws Exception;
  int delete(int no) throws Exception;
  int update(Board board) throws Exception;
  int fileadd(Link link) throws Exception;
}











