    var WhereMe = 0;
    
    function mountHtml(){
        //Create a taskbar
        let taskBar = [];
        taskBar.push({name: "File"});
        taskBar.push({name: "Edit"});
        taskBar.push({name: "View"});

        $("#app").html("<div class='taskbar'><div class='before'></div></div> <div class='before'></div>");
        $("#app .taskbar .before").before("<div class='header'><div class='before'></div></div> <div class='menu-left'><div class='before'></div></div> <div class='content'><div class='before'></div></div> <div class='files_open'><div class='header_arq'><div class='before'></div></div> <div class='editor'></div> </div>");

        //Create links menu
        for(var i = 0; i < taskBar.length; i++){
        $("#app .taskbar .header .before").before("<a data-id='"+i+"'>"+taskBar[i].name+"</div>");
        }


        //Create menu left
        let menuLeftApp = [];
        menuLeftApp.push({name: "Explorer", icon : "far fa-file", notification: 0});
        menuLeftApp.push({name: "Search (Ctrl + Shift + F)", icon : "fas fa-search", notification: 0});
        menuLeftApp.push({name: "Source Control", icon : "fas fa-hat-wizard", notification: 0});
        menuLeftApp.push({name: "Debug", icon : "fas fa-bug", notification: 0});
        menuLeftApp.push({name: "Extensions", icon : "fas fa-cart-plus", notification: 0});
        for(var i = 0; i < menuLeftApp.length; i++){
        $("#app .menu-left .before").before("<a class='menuLinks' id='menuLink"+i+"' data-id='"+i+"' title='"+menuLeftApp[i].name+"'><i class='"+menuLeftApp[i].icon+"'></i></a>");
        }

        $(".menuLinks").removeClass("active");
        $("#menuLink" + WhereMe).addClass("active");
        verifyWhereMe();
        headerArq();

        
        console.log("Mounted html sucessfuly");

    }
    var tiposArquivo = [
        {name : "Welcome", type: 0},
        {name : "JavaScript", tpye: 1},
        {name : "PHP", tpye: 2},
    ];
    var filesOpen = [];
    filesOpen.push({file : "Welcome" , icon : 0, type: 0});
    var OpenEditor = 0;
    var icons = [];
    icons.push({name : "Welcome", icon : "fas fa-mug-hot"});
    icons.push({name : "JavaScript", icon : "fab fa-js-square"});
    icons.push({name : "PHP", icon : "fab fa-php"});
    var files = [];
    files.push({file : "Welcome" , icon : 0, type: 0});

    function acessExplorer(){
        $("#app .content").html("<p class='title'>EXPLORER</p><div class='before'></div>");
        $("#app .content .before").before("<div class='open_editor'><div class='header'><p><i class='fas fa-chevron-up' style='position: relative; left: -20px; top: 0px;'></i>OPEN EDITORS</p></div></div> <div class='files'><div class='before'></div></div>");
        filesOpenA();
        acessOpenEditor();
    }

    function headerArq(){
        $(".header_arq").html("<div class='before'></div>");
        for(var i = 0; i < filesOpen.length; i++){
            if(filesOpen[i].type == 0){
                $(".header_arq .before").before("<a class='active'><i class='"+icons[filesOpen[i].icon].icon+"'></i> "+filesOpen[i].file+"</a>");
                welcomeFile();
            } else{
                $(".header_arq .before").before("<a><i class='"+icons[filesOpen[i].icon].icon+"'></i> "+filesOpen[i].file+"</a>");
            }
        }
    }

    function openFile(){
        headerArq();
        filesOpenA();
    }

    function welcomeFile(){
        $(".files_open .editor").html("<div class='before'></div>");
        $(".files_open .editor .before").before("<div class='welcome'><h1>CodeLive Editor</h1>  <h2>Start</h2> <a id='newfile'>New File</a></div>");
        newFile();
    }

    function acessOpenEditor(){
        $("#app .content .open_editor").click(function(){
            if(OpenEditor == 0){
                $("#app .content .files").hide();
                $("#app .content .open_editor .header p").html("<i class='fas fa-chevron-down' style='position: relative; left: -20px; top: 0px;'></i>OPEN EDITORS");
                OpenEditor = 1;
            } else{
                OpenEditor = 0;
                $("#app .content .files").show();
                $("#app .content .open_editor .header p").html("<i class='fas fa-chevron-up' style='position: relative; left: -20px; top: 0px;'></i>OPEN EDITORS");
            }
        });
    }

    function newFile(){
        $("#newfile").click(function(){
            popUp("New file", "Create a new file", 0);
        });
    }

    function popUp(title, desc, type){
        $(".popup").css("z-index", "1000");
        $(".popup").html("<div class='before'></div>");
        $(".popup .before").before("<div class='message'><h1>"+title+"</h1> <p>"+desc+"</p> <div class='before'></div></div>");
        if(type == 0){
            $(".popup .message .before").before("<form> <br><input id='namefileinput' type='text' placeholder='Name file'/><br> <button class='blue'>Create</button></form> <button class='red'>Cancel</button>");
        }

        $("button").click(function(){
            var veri = $(this).html();
            if(veri == "Cancel"){
                $(".popup").css("z-index", "-1");
            } else if(veri == "Create"){
                var value = $("#namefileinput").val();
                if(value == ""){
                    $("#namefileinput").css("border", "2px solid #f32148");
                } else{
                    $("#namefileinput").css("border", "2px solid transparent");
                    files.push({file: value, icon : 0, type: type});
                    filesOpen.push({file : value , icon : 0, type: 1});
                    filesOpen.shift(1);
                    $(".files_open .editor").html("<div class='before'></div>");
                    $(".files_open .editor").html("<div class='before'></div> <textarea></textarea><div class='code'></div>");
                    dectedLanguage();
                    openFile();
                    $(".popup").css("z-index", "-1");
                }
            }
            return false;
        });

    }

    function filesOpenA(){
        console.log("Files open");
        var returnFile = [];
        returnFile = filesOpen;
        if(filesOpen.length == 0){
            returnFile.push({name : "Nenhum arquivo aberto", error: 1});
        }

        $("#app .content .files").html("<div class='before'></div>");
        for(var i = 0; i < returnFile.length; i++){
            if(returnFile[i].error == 1){
                $("#app .content .files .before").before("<p class='error'>"+returnFile[i].name+"</p>");
            } else{
                $("#app .content .files .before").before("<p><i class='"+icons[filesOpen[i].icon].icon+"'></i> "+returnFile[i].file+"</p>");
            }
        }
    }

    function codeEditor(){
        for(var i = 0; i < filesOpen.length; i++){
            $("#app .files_open .header_arq .before").before("<a><i class='"+icons[filesOpen[i].icon].icon+"'></i> "+filesOpen[i].file+" </a>")
        }
    }

    function acessMenuLink(){
        $(".menuLinks").click(function(){
            var dataId = $(this).data("id");
            $(".menuLinks").removeClass("active");
            $(this).addClass("active");
            verifyWhereMe();
            WhereMe = dataId;
        });
    }

    function verifyWhereMe(){
            if(WhereMe == 0){
                acessExplorer();
            }
    }

    $(document).ready(function(){
        mountHtml();
        acessMenuLink();
    });