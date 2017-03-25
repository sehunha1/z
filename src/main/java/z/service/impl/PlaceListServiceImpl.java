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
    if (placeListDao.count(placelist.getPlace(), placelist.getAddress(), placelist.getMeetingNo()) == 1) {
      //throw new Exception("같은 장소가 존재합니다. 등록을 취소합니다.");
      return 0;
    }
    return placeListDao.insert(placelist);
  }
  // 페이징 처리 전
  public List<PlaceList> getList(int meetingNo) throws Exception {
    return placeListDao.getList(meetingNo);
  }
  // 페이징 처리 후
  /*
  public List<PlaceList> getList(int pageNo, int pageSize) throws Exception {
    HashMap<String,Object> paramMap = new HashMap<>();
    paramMap.put("startRowIndex", (pageNo - 1) * pageSize);
    paramMap.put("rowSize", pageSize);
    
    return placeListDao.getList(paramMap);
  }
  */
  
  public int getSize() throws Exception {
    return placeListDao.countAll();
  }

  public int unvote(PlaceList placelist) throws Exception {
    return placeListDao.unvote(placelist);
  }
}
