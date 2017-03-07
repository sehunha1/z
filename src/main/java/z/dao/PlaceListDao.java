package z.dao;

import java.util.List;

import z.domain.PlaceList;

public interface PlaceListDao {
  int insert(PlaceList placelist) throws Exception;
  int count(String place, String address, int meetingNo);
  List<PlaceList> getList() throws Exception;
}
