package z.dao;

import z.domain.PlaceList;

public interface PlaceListDao {
  int insert(PlaceList placelist) throws Exception;
  int countP(String place) throws Exception;
  int countA(String address) throws Exception;
}
