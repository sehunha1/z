package z.service;

import z.domain.Time;

public interface TimeService {
  Time getTime(int meetingNo) throws Exception;
}