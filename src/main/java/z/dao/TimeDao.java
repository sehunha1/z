package z.dao;

import z.domain.Time;

public interface TimeDao {
  Time getTime(int meetingNo) throws Exception;
}