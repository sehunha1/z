package z.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import z.dao.LocationListDao;
import z.domain.LocationList;
import z.service.LocationListService;

import java.util.List;

@Service
public class LocationListServiceImpl implements LocationListService {
  @Autowired LocationListDao locationListDao;

  @Override
  public List<LocationList> getLocationListDuplication(int meetingNo) throws Exception {
    return locationListDao.getLocationListDuplication(meetingNo);
  }

  @Override
  public int isDuplicate(int meetingNo) throws Exception {
    return locationListDao.isDuplicate(meetingNo);
  }
}
