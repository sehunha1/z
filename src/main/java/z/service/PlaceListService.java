package z.service;

import java.util.List;

import z.domain.PlaceList;

public interface PlaceListService {
    int add(PlaceList placelist) throws Exception;
    List<PlaceList> getList() throws Exception; // 페이징 처리 전
    //List<PlaceList> getList(int pageNo, int pageSiz) throws Exception; // 페이징 처리 후
    int getSize() throws Exception;
}
