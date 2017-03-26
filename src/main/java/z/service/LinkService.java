package z.service;

import java.util.List;
import java.util.Map;

import z.domain.Link;

public interface LinkService {
  List<Link> getBoss(int memberNo) throws Exception;
  int getVotedCount(int meetingNo) throws Exception;
  int getEntireCount(int meetingNo) throws Exception;
  int getMyUnvoteCount(int memberNo) throws Exception;
  int getMyInviteCount(int memberNo) throws Exception;
  int updateStat(int memberNo2, int meetingNo) throws Exception;
  int refuse(int memberNo, int meetingNo) throws Exception;
  int accept(int memberNo, int meetingNo) throws Exception;
  int linkInsert(Map linkMembMap) throws Exception; // 멤버 초대시 link 테이블 데이터 삽입
  int[] isMeeting(int memberNo) throws Exception;
}
