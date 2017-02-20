package z.service;

import java.util.List;

import z.domain.Board;

public interface BoardService {
  List<Board> getList() throws Exception;
  Board getDetail(int no) throws Exception;
  int add(Board board) throws Exception;
  int delete(int no) throws Exception;
  int update(Board board) throws Exception;
}












