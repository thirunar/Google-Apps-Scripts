function saveGmailAsPDF() { 
  
  var gmailLabels  = "PDF";  
  var driveFolder  = "Cab bills temp";
  
  var threads = GmailApp.search("from:receipts.bangalore@uber.com after: 2015/11/02 ", 0, 100);  
  
  if (threads.length > 0) {
    
    /* Google Drive folder where the Files would be saved */
    var folders = DriveApp.getFoldersByName(driveFolder);
    var folder = folders.hasNext() ? 
        folders.next() : DriveApp.createFolder(driveFolder);
    
    /* Gmail Label that contains the queue */
    var label = GmailApp.getUserLabelByName(gmailLabels) ?     
        GmailApp.getUserLabelByName(gmailLabels) : GmailApp.createLabel(driveFolder);
    
    for (var thread=0; thread<threads.length; thread++) {
      
      threads[thread].removeLabel(label);
      var msgs = threads[thread].getMessages();
      
      var html = "";
      var attachments = [];
      
      var subject = threads[thread].getFirstMessageSubject();
     
      var date = threads[thread].getLastMessageDate();
      /* Append all the threads in a message in an HTML document */
      for (var index=0; index<msgs.length; index++) {
        
        var msg = msgs[index];
        
        html += "From: " + msg.getFrom() + "<br />";  
        html += "To: " + msg.getTo() + "<br />";
        html += "Date: " + msg.getDate() + "<br />";
        html += "Subject: " + msg.getSubject() + "<br />"; 
        html += "<hr />";
        html += msg.getBody().replace(/<img[^>]*>/g,"");
        html += "<hr />";
                
      }
            
      /* Conver the Email Thread into a PDF File */
      var tempFile = DriveApp.createFile("temp.html", html, "text/html");
      folder.createFile(tempFile.getAs("application/pdf")).setName(date + " " + subject + ".pdf");
      tempFile.setTrashed(true);
      
    }
  }
}  
 
