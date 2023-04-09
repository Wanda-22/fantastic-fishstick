song="";
song2="";
lw=0;
lwy=0;
lwx=0;
rw=0;
rwy=0;
rwx=0;
s1s="";
s2s="";

function preload() {
    song= loadSound("s1.mp3");
    song2= loadSound("s2.mp3");
}


function setup() {
    canvas=createCanvas(700,500);
    canvas.center();
    video= createCapture(VIDEO);
    video.hide();
    p=ml5.poseNet(video,u);
    p.on('pose',ans10); 
}

function draw() {
    image(video,0,0,700,500);
    console.log("hi");
    s1s=song.isPlaying();
    s2s=song2.isPlaying();

    fill("#DC143C");
    stroke("#F0E68C");
    if (rw>0.2) {
        rect(rwx,rwy,150,200);
        song2.stop();
        if (s1s==false) {
            song.play();
            document.getElementById('s').innerHTML="Playing Tula japnar ahe";
        }
    }    
    if (lw>0.2) {
            rect(lwx,lwy,150,200);
            song.stop();
            if (s2s==false) {
                song2.play();
                document.getElementById('s').innerHTML="Playing Break this down";
            }
    
}
}


function u() {
    console.log('posenet is on');
}

function ans10(result) {
    if (result.length>0) {
        console.log(result);
        lwx=result[0].pose.leftWrist.x;
        lwy=result[0].pose.leftWrist.y;
        rwx=result[0].pose.rightWrist.x;
        rwy=result[0].pose.rightWrist.y;    
        lw=result[0].pose.keypoints[9].score;
        rw=result[0].pose.keypoints[10].score;
        console.log("Left x is- " + lwx  ,"Left y is- " + lwy , "Score is - " +lw);
        console.log("Right x is- " + rwx ,"Right y is- " + rwy , "Score is - " +rw);
    }
}