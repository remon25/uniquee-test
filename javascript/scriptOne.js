window.isMobile = false;
if (/Mobi|Android/i.test(navigator.userAgent)) {
  window.isMobile = true;
}
window.isSafari = false;
var ua = navigator.userAgent.toLowerCase();
if (ua.indexOf("safari") != -1) {
  if (ua.indexOf("chrome") > -1) {
  } else {
    window.isSafari = true;
  }
}

class SoundToggler {
  constructor() {
    this.bind();

    this.container = document.querySelector(".soundtoggler");
    this.sTCanvas = document.createElement("canvas");
    this.container.appendChild(this.sTCanvas);
    this.ctx = this.sTCanvas.getContext("2d");
    this.sTWidth = this.ctx.canvas.width = this.container.offsetWidth * dpi;
    this.sTHeight = this.ctx.canvas.height = this.container.offsetHeight * dpi;

    this.ctx.lineWidth = dpi;

    this.soundFlag = false;
    this.amp = {
      value: 3,
    };
    this.wL = 0.1;
    this.speed = 0.003;

    this.container.addEventListener("click", this.click);
    window.addEventListener("resize", this.onResize);
    RAF.subscribe("sineUpdate", this.update);

    this.autoPlay = true;
    if (window.isSafari) this.autoPlay = false;

    console.log(
      this.autoPlay,
      JSON.parse(window.localStorage.getItem("audioWasPlaying"))
    );
    if (
      this.autoPlay &&
      JSON.parse(window.localStorage.getItem("audioWasPlaying"))
    ) {
      this.moveFlag = false;
      window.addEventListener("mousemove", this.mouseMove);
    }
  }

  // mouseMove() {
  //   if (!this.autoPlay) return;
  //   if (this.moveFlag) return;
  //   this.moveFlag = true;
  //   console.log(window.localStorage.getItem("audioWasPlaying"));
  //   this.click();
  // }

  update() {
    // this.ctx.clearRect(0, 0, this.sTWidth, this.sTHeight);
    // this.ctx.beginPath();
    // let inc = 0;
    // while (inc < this.sTWidth) {
    //   if (inc == 0)
    //     this.ctx.moveTo(
    //       inc,
    //       this.sTHeight / 2 +
    //         this.amp.value *
    //           dpi *
    //           Math.sin(
    //             (inc *
    //               (1 / (this.container.offsetWidth * 0.01)) *
    //               this.wL) /
    //               dpi +
    //               Date.now() * this.speed
    //           )
    //     );
    //   else
    //     this.ctx.lineTo(
    //       inc,
    //       this.sTHeight / 2 +
    //         this.amp.value *
    //           dpi *
    //           Math.sin(
    //             (inc *
    //               (1 / (this.container.offsetWidth * 0.01)) *
    //               this.wL) /
    //               dpi +
    //               Date.now() * this.speed
    //           )
    //     );
    //   inc += 2;
    // }
    // this.ctx.stroke();
    // this.ctx.closePath();
  }

  // started() {
  //   this.soundFlag = this.soundFlag == true ? false : true;
  //   let target = this.soundFlag == true ? 30 : 3;

  //   TweenLite.to(this.amp, 0.5, {
  //     value: target,
  //   });
  // }

  // click() {
  //   let volTarget = this.soundFlag == true ? 0 : 1;
  //   let target = this.soundFlag == true ? 3 : 30;
  //   if (this.soundFlag == false)
  //     soundReactor.audio.currentTime =
  //       window.localStorage.getItem("audioTime") || 0;

  //   if (soundReactor.audio.duration > 0 && !soundReactor.audio.paused) {
  //     window.localStorage.setItem("audioWasPlaying", false);
  //   } else {
  //     soundReactor.audio.volume = 0;
  //     soundReactor.audio.play();
  //     window.localStorage.setItem("audioWasPlaying", true);
  //   }

  //   TweenLite.to(this.amp, 0.5, {
  //     value: target,
  //   });
  //   TweenLite.to(soundReactor.audio, 0.5, {
  //     volume: volTarget,
  //     onComplete: function () {
  //       if (volTarget == 0) {
  //         window.localStorage.setItem(
  //           "audioTime",
  //           soundReactor.audio.currentTime
  //         );
  //         soundReactor.audio.pause();
  //       }
  //     },
  //   });
  //   this.soundFlag = this.soundFlag == true ? false : true;
  // }

  // onResize() {
  //   this.sTWidth = this.ctx.canvas.width =
  //     this.container.offsetWidth * dpi;
  //   this.sTHeight = this.ctx.canvas.height =
  //     this.container.offsetHeight * dpi;
  //   this.ctx.lineWidth = dpi;
  // }
  bind() {
    // this.started = this.started.bind(this);
    // this.update = this.update.bind(this);
    // this.click = this.click.bind(this);
    // this.onResize = this.onResize.bind(this);
    // this.mouseMove = this.mouseMove.bind(this);
  }
}

class SoundReactor {
  constructor(audioUrl, pageType) {
    this.pageType = pageType;
    this.ctx;
    this.audio;
    this.audioSource;
    this.analyser;
    this.fdata = [];
    this.url = audioUrl;
    this.bind();
  }

  init() {
    // var AudioContext =
    //   window.AudioContext || // Default
    //   window.webkitAudioContext || // Safari and old versions of Chrome
    //   false;
    // this.ctx = new AudioContext();
    // this.audio = new Audio(this.url);
    // this.audio.loop = true;
    // if (this.pageType != "home") return;
    // this.audioSource = this.ctx.createMediaElementSource(this.audio);
    // this.analyser = this.ctx.createAnalyser();
    // this.analyser.smoothingTimeConstant = 0.4;
    // this.audioSource.connect(this.analyser);
    // this.audioSource.connect(this.ctx.destination);
    // this.fdata = new Uint8Array(this.analyser.frequencyBinCount);
  }

  update() {
    // this.analyser.getByteFrequencyData(this.fdata);
  }

  bind() {
    // this.update = this.update.bind(this);
    // this.init = this.init.bind(this);
  }
}

class RAFClass {
  constructor() {
    this.bind();
    this.callbacks = [];
    this.dt = 0.15;
    this.lastF = Date.now();
    this.render();
  }

  subscribe(name, callback) {
    this.callbacks.push({
      name: name,
      callback: callback,
    });
  }

  unsubscribe(name) {
    this.callbacks.forEach((item, i) => {
      if (item.name == name) this.callbacks.splice(i, i + 1);
    });
  }

  render() {
    requestAnimationFrame(this.render);
    this.callbacks.forEach((item) => {
      item.callback();
    });

    this.dt = Date.now() - this.lastF;
    this.lastF = Date.now();
  }

  bind() {
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.render = this.render.bind(this);
  }
}

const RAF = new RAFClass();

