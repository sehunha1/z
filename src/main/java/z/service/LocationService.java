package z.service;

import java.util.List;

import z.domain.Location;
import z.domain.PlaceList;

public interface LocationService {
    int add(Location location) throws Exception;
    int vote(Location location) throws Exception;
    List<PlaceList> getmemberList() throws Exception;
    int getCheckLoc(int memberNo2, int meetingNo) throws Exception;
}
