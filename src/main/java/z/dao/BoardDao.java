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
  int delete(int boarNo) throws Exception;
  


}

