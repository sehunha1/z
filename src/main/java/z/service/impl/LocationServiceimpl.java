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
}
