package z.testjava;

import java.awt.image.BufferedImage;
import java.io.DataInputStream;
import java.io.File;
import java.net.URL;
import java.net.URLConnection;

import javax.imageio.ImageIO;

import org.apache.commons.io.IOUtils;

public class sslhttps {
  public void readImage() {
    BufferedImage originImage = null;
    URLConnection imgConnection = null;
    DataInputStream dis = null;
    
    String urlString = "http://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?oh=0bb129c4bacce2fd26d99c098ed48ce3";
    try {
      URL imgURL = new URL(urlString);
      imgConnection =imgURL.openConnection();
      dis = new DataInputStream(imgConnection.getInputStream());

      originImage = ImageIO.read(dis);
      
      File file=new File("D:/test.gif");
      ImageIO.write(originImage, "gif", file);
      dis.close();
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      IOUtils.closeQuietly(dis);
    }
  }
}