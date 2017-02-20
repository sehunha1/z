package z.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import z.dao.LinkDao;
import z.domain.Link;
import z.service.LinkService;

@Service
public class LinkServiceImpl implements LinkService {
  @Autowired LinkDao linkDao;

  public List<Link> getBoss(int memberNo) throws Exception {
    return linkDao.getBoss(memberNo);
  }
}
