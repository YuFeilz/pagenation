  jQuery.fn.pagination=function(pno,psize,head){
    var num =0; 
    var totalPage = 0;//总页数
    var pageSize = psize;//每页显示行数
    //所有行数(所有记录数)
    if($(this)[0].rows){
      num=$(this)[0].rows.length;
    }else{
      num=$(this).find('li').length;
    }

    // alert(num)
    //总共分几页 
        totalPage=(num/pageSize)>parseInt(num/pageSize)?parseInt(num/pageSize)+1:parseInt(num/pageSize);
    var currentPage = pno;//当前页数
    var startRow = (currentPage - 1) * pageSize;//开始显示的行 
       var endRow = head&&currentPage>=2?currentPage * pageSize-2:currentPage * pageSize-1;//结束显示的行   
       endRow = endRow > num? num : endRow;    
       //遍历显示数据实现分页
    for(var i=0;i<num;i++){  
      var irow=null;
      if($(this)[0].rows){
        irow=$(this)[0].rows[i];
      }else{
        irow=$(this).find('li')[i];
      }
      if(i>=startRow && i<=endRow){
          irow.style.display='table-row'||'block';
      }else{
          irow.style.display='none';
      }
      if(head){
        $(this)[0].rows[0].style.display='table-row'||'block';
        $(this)[0].rows[0].style.fontWeight='700';
      }
    }
    var tempStr="";
    if(currentPage>1){
        tempStr += "<a class='goPage' href=\"javascript:void(0)\"><span>首页</span></a>";
        tempStr += "<a class='goPage' href=\"javascript:void(0)\"><span>上一页</span></a>";
    }else{
        tempStr += "<span>首页</span>";
        tempStr += "<span>上一页</span>";    
    }

    if(currentPage<totalPage){
        tempStr += "<a class='goPage' href=\"javascript:void(0)\"><span>下一页</span></a>";
        tempStr += "<a class='goPage' href=\"javascript:void(0)\"><span>尾页</span></a>";
    }else{
        tempStr += "<span>下一页</span>";
        tempStr += "<span>尾页</span>";    
    }
    tempStr += "<span>"+currentPage+"/"+totalPage+"</span>";
    $(this).next().css('padding','5px');
    $(this).next().html(tempStr);
    var goPage=document.getElementsByClassName('goPage');
     $(goPage).each(function(){
       $(this).click(function(){
        var txt=$(this).text();
        if(txt=='首页'){
          $(this).parent().prev().pagination(1,psize,head);
        }else if(txt=='上一页'){
          $(this).parent().prev().pagination((currentPage-1),psize,head); 
        }else if(txt=='下一页'){
          $(this).parent().prev().pagination((currentPage+1),psize,head);
        }else if(txt=='尾页'){
          $(this).parent().prev().pagination(totalPage,psize,head);
        }
      })
    })
  }