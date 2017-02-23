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
          URL url = new URL("https://scontent.xx.fbcdn.net/v/t1.0-1/c15.0.50.50/p50x50/10354686_10150004552801856_220367501106153455_n.jpg?oh=0bb129c4bacce2fd26d99c098ed48ce3&oe=5938E12F");
          BufferedImage img = ImageIO.read(url);
          File file=new File("D:/test.gif");
          ImageIO.write(img, "gif", file);
      } catch (IOException e) {
       e.printStackTrace();
      }
      
  }
}

