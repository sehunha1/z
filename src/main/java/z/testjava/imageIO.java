package z.testjava;

import java.awt.Image;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.URL;

import javax.imageio.ImageIO;
 
public class imageIO
{ 
  public static void main( String[] args )
  {
   Image image = null;
      try {
          URL url = new URL("https://scontent.xx.fbcdn.net/v/t1.0-1/p50x50/16864490_122643644924849_4499205672535636192_n.jpg?oh=b991e8a098739cf8da2948da252b56d8&oe=593C611C");
          BufferedImage img = ImageIO.read(url);
          File file=new File("D:/test.gif");
          ImageIO.write(img, "gif", file);
      } catch (IOException e) {
       e.printStackTrace();
      }
      
  }
}

