package z.service;

import java.util.List;

import z.domain.Link;

public interface LinkService {
  List<Link> getBoss(int memberNo) throws Exception;
  int getVotedCount(int meetingNo) throws Exception;
  int getEntireCount(int meetingNo) throws Exception;
  int getMyUnvoteCount(int memberNo) throws Exception;
  int getMyInviteCount(int memberNo) throws Exception;
  int updateStat(int memberNo2, int meetingNo) throws Exception;
}
