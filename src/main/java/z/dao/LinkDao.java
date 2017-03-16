package z.dao;

import java.util.ArrayList;

import z.domain.Link;

public interface LinkDao {
  ArrayList<Link> getBoss(int memberNo) throws Exception;
  int getVotedCount(int meetingNo) throws Exception;
  int getEntireCount(int meetingNo) throws Exception;
  int getMyUnvoteCount(int memberNo) throws Exception;
  int updateStat(int memberNo2, int meetingNo) throws Exception;
  int getMyInviteCount(int memberNo) throws Exception;
  int refuse(int memberNo, int meetingNo) throws Exception;
  int accept(int memberNo, int meetingNo) throws Exception;
}
