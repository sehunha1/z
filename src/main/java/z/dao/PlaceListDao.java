package z.dao;

import z.domain.PlaceList;

public interface PlaceListDao {
  int insert(PlaceList placelist) throws Exception;
  int count(String address) throws Exception;
}
