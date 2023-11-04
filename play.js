let audioResume=new Audio("./resume.ogg")
let audioNew=new Audio("./audio.ogg")
let Categorie="";
let nv=1;
let listImg=[];
let xtime=5;
let time=5;
let strc;
let x=0;
let score=0;

let ste=false;
const modif=(x)=>
{
        document.body.style.backgroundImage="url("+x+".jpg)";   
}

const  timeForamt=(conteur ,time)=>{
    let s=time%60;
    let m=time/60;
    m=m.toFixed()
    if (s<10){
        conteur.textContent="0"+m+":0"+s;        
    }
    else{
        conteur.textContent="0"+m+":"+s;
    }
}
const imgNv=()=>{
    let x;
    let l=[];
    for (let i=0;i<=nv;i++)
    {
        do{
            x=Math.random()*10
            x=x.toFixed()
            
        }while(  l.indexOf(x)>-1 || x<=0 || x>nv+1 )
        l.push(x)
    }
    for (let i=nv;i>=0;i--)
    {
        l.push(l[i]);
    }
    return l;
}

var ImgVue=()=>{
    let hereGame=strc.querySelector(".hereGame")
    let line1=document.createElement("div")
    let line2=document.createElement("div")
    let line3=document.createElement("div");
    let ll=[1,2,3,4,5,6,7,8,9]
    const path="./"+Categorie+"/";
    let l=imgNv();
    let i=0;
    line1.className="line0"
    line2.className="line1"
    line3.className="line2"    
    l.forEach(e => {
        let section=document.createElement("section");
        let img=document.createElement("img");
        img.src=path+e+".jpg";
        section.style.borderRadius="20px"
        section.style.margin="2px"
        section.style.backgroundImage="linear-gradient(45deg ,rgba(69, 252, 191, 0.7) ,rgba(148, 30, 245, 0.7))"
        section.style.padding="5px"
        img.style.visibility="hidden"
        img.className=e+ll[ll.length-1]
        ll.pop()
        section.appendChild(img)
        i++;
        if (i<=4)
        {
            section.children[0].className+="0"
            line1.appendChild(section)
        }
        else if(i<=8)
        {
            section.children[0].className+="1"
            line2.appendChild(section)
        }
        else
        {
            section.children[0].className+="2"
            line3.appendChild(section)
        }
        
    });
    hereGame.appendChild(line1);
    hereGame.appendChild(line2);
    hereGame.appendChild(line3);
}


const template=()=>{
    let divPlay=document.createElement("div");
    let divImg=document.createElement("div");
    let divHead=document.createElement("div");
    let conteur=document.createElement("h1");
    let resume=document.createElement("button");
    let pause=document.createElement("button"); 
    let fermer=document.createElement("button");
    let niveau=document.createElement("h2");
    let footer=document.createElement("footer");
    let resultat=document.createElement("h4");
    let btnLevel=document.createElement("button")
    divImg.className="hereGame"
    divPlay.className="play";
    divHead.className="head";
    conteur.id="conteur";
    resume.className="resume";
    pause.className="pause";
    fermer.className="fermer";
    resume.textContent="Resume";
    pause.textContent="Pause";
    btnLevel.className="btnLevel"
    btnLevel.textContent="New Level"
    btnLevel.disabled=true;
    fermer.textContent="X";
    niveau.textContent="Niveau:"+nv;
    divHead.appendChild(resume);
    divHead.appendChild(pause);
    divHead.appendChild(fermer);
    divHead.appendChild(conteur);
    divHead.appendChild(niveau);
    footer.appendChild(resultat);
    footer.appendChild(btnLevel);
    divPlay.appendChild(divHead);
    divPlay.appendChild(divImg);
    divPlay.appendChild(footer)
    document.body.appendChild(divPlay);
    return divPlay
}

let play=(x)=>{    
    strc=template();
    Categorie=x;
    ImgVue();
}
let finLevel=()=>{
    if (time==0){
        if (score ==nv*10+10){
            console.log()
        }
    }
}


let u;
let v;
let t=false

let Main=setInterval(()=>{    
        strc.querySelector("button.fermer").addEventListener(('click'),()=>{
        strc.innerHTML=""
        strc.style.width="0px"
        strc.style.heigth="0px"
        strc.className="eee"
        time=5;
        x=0;
        nv=1
        listImg=[]
        })
        
        if(time!=0){
            strc.querySelectorAll("section").forEach(e=>
                {
                    e.onclick=()=>{
                    if(x==1){   
                    listImg.push(e)
                    if(listImg.length==2){
                        u=listImg[listImg.length-1].children[0];
                        v=listImg[listImg.length-2].children[0];
                        if(u.className[0]==v.className[0] && u.className[1]!=v.className[1])
                        {
                            document.querySelector(".line"+u.className[2]).removeChild(listImg[listImg.length-1])
                            document.querySelector(".line"+v.className[2]).removeChild(listImg[listImg.length-2]) 
                            score+=10;
                            listImg.pop()
                            listImg.pop(
                                
                            )
                        }
                        else if(u.className==v.className){
                            u.style.visibility="visible"
                            listImg.pop()
                        }
                        else if(u.className[0]!=v.className[0])
                        {
                            u.style.visibility="hidden"
                            v.style.visibility="hidden"
                            listImg.pop()
                            listImg.pop()
                            listImg.pop()    
                        }
                        
                    }
                    else if(listImg.length<=1)
                    {                    
                          
                        
                            e.children[0].style.visibility="visible"
                                          
                    }
                }}})
                
                    strc.querySelector("button.resume").onclick=()=>{
                        audioResume.play()
                        x=1
                    }    
                    strc.querySelector("button.pause").onclick=()=>{
                        audioResume.play()
                        x=0
                    }
            time-=x;
            timeForamt(strc.querySelector("#conteur"),time)
            
        }
        else
        {
            x=0;
            document.querySelector("button.resume").disabled=true
            document.querySelector("button.pause").disabled=true
            console.log("timeOver")
            if(score==nv*10+10)
            {
            document.querySelector("h4").textContent="vous avez gagné"
            document.querySelector(".btnLevel").disabled=false;
            document.querySelector(".btnLevel").onclick=()=>{
                nv++;
                audioNew.play()
                if(nv<4)
                {
                    strc.innerHTML=""
                    strc.style.width="0px"
                    strc.style.heigth="0px"
                    strc.className="eee"
                    xtime+=5;
                    time=xtime;
                    x=0;
                    listImg=[]
                    play(Categorie)
                }
                else{
                    strc.innerHTML=""
                    strc.style.width="0px"
                    strc.style.heigth="0px"
                    strc.className="eee"
                    time=5;
                    xtime=5;
                    nv=1;
                    listImg=[]

                }
            }}
            if(document.querySelector("h4").textContent==""){
                document.querySelector("h4").textContent="vous avez perdu"
                xtime=5;
            }
            score=0
        }        
    },1000)
    