package z.dao;

import java.util.List;

import z.domain.PlaceList;

public interface PlaceListDao {
  int insert(PlaceList placelist) throws Exception;
  int insertloc(PlaceList placelist) throws Exception;
  int count(String place, String address, int meetingNo);
  List<PlaceList> getList(int meetingNo) throws Exception; // 페이징 처리 전
  // List<PlaceList> getList(Map<String,Object> paramMap) throws Exception; // 페이징 처리 후
  int countAll() throws Exception;
  int unvote(PlaceList placelist) throws Exception;
}
