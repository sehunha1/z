package z.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import z.dao.PlaceListDao;
import z.domain.PlaceList;
import z.service.PlaceListService;

@Service
public class PlaceListServiceImpl implements PlaceListService {
  @Autowired PlaceListDao placeListDao;

  public int add(PlaceList placelist) throws Exception {
    if (placeListDao.count(placelist.getPlace(), placelist.getAddress()) == 1) {
      //throw new Exception("같은 장소가 존재합니다. 등록을 취소합니다.");
      return 0;
    }
    return placeListDao.insert(placelist);
  }
  
  public List<PlaceList> getList() throws Exception {
    return placeListDao.getList();
  }
}
