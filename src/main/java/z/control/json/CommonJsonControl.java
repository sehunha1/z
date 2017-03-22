package z.control.json;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.util.ArrayList;

import javax.imageio.ImageIO;
import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import z.util.MultipartUtil;

@RestController
@RequestMapping("/common/")
public class CommonJsonControl {
  @Autowired ServletContext sc;
  
  @RequestMapping("fileupload")
  public AjaxResult fileupload(MultipartFile[] files) throws Exception {
    ArrayList<String> filenames = new ArrayList<>();
    
    if (files != null && files.length > 0) {
      for (MultipartFile file : files) {
        if (file.getSize() > 0) {
          String newFilename = MultipartUtil.generateFilename();
          file.transferTo(new File(sc.getRealPath("html/upload/" + newFilename)));
          filenames.add(newFilename);
        }
      }
    }
    return new AjaxResult(AjaxResult.SUCCESS, filenames);
  }
  
  @RequestMapping("fbPhoto")
  public AjaxResult faceBookPhoto(String filename,
      HttpServletResponse response, HttpSession session, Model model) throws Exception {
    
    String[] array = filename.split("/");
    String defaultImg = "p50x50";
    
    //System.out.println("파일 이름 " + filename);
    //System.out.println("6번쨰 " + array[6].replaceAll("\\?.*", ""));
    
    try {
      URL url = new URL(filename);
      BufferedImage img = ImageIO.read(url);
      System.out.println(img);
      //File file=new File("D:/" + array[7].replaceAll("\\?.*", ""));
      if (defaultImg.equals(array[6].replaceAll("\\?.*", ""))) {
        File file = new File(sc.getRealPath("html/upload/") + array[7].replaceAll("\\?.*", ""));
        ImageIO.write(img, "gif", file);
      } else {
        File file = new File(sc.getRealPath("html/upload/") + array[6].replaceAll("\\?.*", ""));
        ImageIO.write(img, "gif", file);
      }
    } catch (IOException e) {
     e.printStackTrace();
    }
    
    return new AjaxResult(AjaxResult.SUCCESS, filename);
  }
}


/*
String urlStr = filename;
    
    StringBuffer sb = new StringBuffer();
    
    try { TrustManager[] trustAllCerts = new TrustManager[] { new X509TrustManager() { 
      public java.security.cert.X509Certificate[] getAcceptedIssuers() { 
        return null; }
      public void checkClientTrusted(X509Certificate[] certs, String authType) { 

      } public void checkServerTrusted(X509Certificate[] certs, String authType) {

      } 
    } };
    
    SSLContext sc = SSLContext.getInstance("SSL"); 
    sc.init(null, trustAllCerts, new java.security.SecureRandom()); 
    HttpsURLConnection 
    .setDefaultSSLSocketFactory(sc.getSocketFactory()); 
    URL url = new URL(urlStr); 
    HttpURLConnection conn = (HttpURLConnection) url.openConnection(); 
    InputStreamReader in = new InputStreamReader( (InputStream) conn.getContent()); 
    
    BufferedImage img = ImageIO.read(url.openStream());
    File file=new File("D:/test.gif");
    ImageIO.write(img, "gif", file);
    BufferedReader br = new BufferedReader(in);
    
    String line; 
    while ((line = br.readLine()) != null) { 
      sb.append(line).append("\n"); 
      } 
    
    System.out.println(sb.toString()); br.close(); in.close(); conn.disconnect();
    
    } catch(Exception e) {
      e.printStackTrace();
    }
 */




