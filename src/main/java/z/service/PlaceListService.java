package z.service;

import java.util.List;

import z.domain.PlaceList;

public interface PlaceListService {
    int add(PlaceList placelist) throws Exception;
    //List<PlaceList> getList(int pageNo, int pageSiz) throws Exception; // 페이징 처리 후
    int getSize() throws Exception;
    List<PlaceList> getList(int meetingNo) throws Exception;
    int unvote(PlaceList placelist) throws Exception;
}
