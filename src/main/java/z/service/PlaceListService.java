package z.service;

import java.util.List;

import z.domain.PlaceList;

public interface PlaceListService {
    int add(PlaceList placelist) throws Exception;
    List<PlaceList> getList() throws Exception;
}
