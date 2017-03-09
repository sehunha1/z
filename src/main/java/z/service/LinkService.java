package z.service;

import java.util.List;

import z.domain.Link;

public interface LinkService {
  List<Link> getBoss(int memberNo) throws Exception;
  int getVotedCount(int meetingNo) throws Exception;
  int getEntireCount(int meetingNo) throws Exception;
}
