package z.dao;

import java.util.ArrayList;

import z.domain.Link;

public interface LinkDao {
  ArrayList<Link> getBoss(int memberNo) throws Exception;
  int getVotedCount(int meetingNo) throws Exception;
  int getEntireCount(int meetingNo) throws Exception;
}
