package z.dao;

import java.util.List;

import z.domain.PlaceList;

public interface PlaceListDao {
  int insert(PlaceList placelist) throws Exception;
  int count(String place, String address) throws Exception;
  List<PlaceList> getList() throws Exception;
}
