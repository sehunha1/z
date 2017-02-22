package z.service;

import org.springframework.stereotype.Service;

import z.domain.Meeting;

@Service
public interface MeetingService {
  int add(Meeting meeting) throws Exception;
}
