package z.dao;

import java.util.ArrayList;

import z.domain.Link;

public interface LinkDao {
  ArrayList<Link> getBoss(int memberNo) throws Exception;
}
