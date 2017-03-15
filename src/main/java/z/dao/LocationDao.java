package z.dao;

import java.util.List;

import z.domain.Location;
import z.domain.PlaceList;

public interface LocationDao {
  int insert(Location locaion) throws Exception;
  int insertvote(Location location) throws Exception;
  int count(int locationNo, int memberNo, int meetingNo) throws Exception;
  List<PlaceList> getmemberList() throws Exception;
  int getCheckLoc(int memberNo2, int meetingNo) throws Exception;
}
