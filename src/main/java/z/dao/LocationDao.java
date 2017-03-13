package z.dao;

import java.util.List;

import z.domain.Location;
import z.domain.PlaceList;

public interface LocationDao {
  int insert(Location locaion) throws Exception;

  List<PlaceList> getmemberList() throws Exception;
}
