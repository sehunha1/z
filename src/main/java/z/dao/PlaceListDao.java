package z.dao;

import java.util.List;

import z.domain.PlaceList;

public interface PlaceListDao {
  int insert(PlaceList placelist) throws Exception;
  int count(String place, String address, int meetingNo);
  List<PlaceList> getList() throws Exception; // 페이징 처리 전
  // List<PlaceList> getList(Map<String,Object> paramMap) throws Exception; // 페이징 처리 후
  int countAll() throws Exception;
}
