package z.dao;

import z.domain.LocationList;

import java.util.List;

public interface LocationListDao {
    List<LocationList> getLocationListDuplication(int meetingNo) throws Exception;
    int isDuplicate(int meetingNo) throws Exception;
}
