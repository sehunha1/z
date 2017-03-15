package z.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import z.dao.LocationDao;
import z.domain.Location;
import z.domain.PlaceList;
import z.service.LocationService;

@Service
public class LocationServiceimpl implements LocationService {
  @Autowired LocationDao locationDao;

  @Override
  public int add(Location location) throws Exception {
    return locationDao.insert(location);
  }

  @Override
  public List<PlaceList> getmemberList() throws Exception {
    return locationDao.getmemberList();
  }

  @Override
  public int vote(Location location) throws Exception {
    if (locationDao.count(location.getLocationNo(), location.getMemberNo(), location.getMeetingNo()) == 1) {
      //throw new Exception("같은 장소가 존재합니다. 등록을 취소합니다.");
      return 0;
    }
    
    return locationDao.insertvote(location);
  }

  @Override
  public int getCheckLoc(int memberNo2, int meetingNo) throws Exception {
    return locationDao.getCheckLoc(memberNo2, meetingNo);
  }
}
