package z.dao;

import java.util.ArrayList;

import z.domain.Board;

public interface BoardDao{
  int count(String title) throws Exception;
  int countByNo(int boardNo) throws Exception;
  ArrayList<Board> getList(int mtnum) throws Exception;
  int insert(Board board) throws Exception;
  Board getOne(int BoardNo) throws Exception;
  int update(Board board) throws Exception;
  int delete(int boardNo) throws Exception;
  int delete2(int boardNo) throws Exception;
  int detail(int boardNo) throws Exception;
  int getBoardNo(int boardNo) throws Exception;
  int insertlink(Board board) throws Exception;
}
