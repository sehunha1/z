package z.service;

import z.domain.LocationList;

import java.util.List;

public interface LocationListService {
    List<LocationList> getLocationListDuplication(int meetingNo) throws Exception;
    int isDuplicate(int meetingNo) throws Exception;
}
