// eslint-disable-next-line @typescript-eslint/no-unused-vars
class TabWallpaper extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const wrapper = document.createElement("div");
    wrapper.classList.add("wallpaper");

    // wrapper.style.setProperty(
    //   "background",
    //   "linear-gradient(0deg, rgb(255, 154, 158) 0%, rgb(254, 207, 239) 99%, rgb(254, 207, 239) 100%)"
    // );

    // wrapper.style.setProperty(
    //   "background-image",
    //   "url('https://dogefs.s3.ladydaily.com/~/source/unsplash/photo-1675620705848-bcab2d4d98a4?ixid=MnwxMjA3fDB8MXx0b3BpY3x8NnNNVmpUTFNrZVF8fHx8fDJ8fDE2NzcxMzUzMzI&ixlib=rb-4.0.3&w=2560&h=1440&fmt=webp')"
    // );

    wrapper.style.setProperty("background-image","url('/bg.png')" );

    const style = document.createElement("style");

    style.textContent = `
    .wallpaper{
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      transition:background .3s,transform .3s;
      background-size: cover;
      background-position: 50%;
      z-index:0;
    }
    .wallpaper.change {
      transform:scale(1.1)
    }
    .wallpaper:after{
      content:'';
      position:absolute;
      left:0;
      top:0;
      width:100%;
      height:100%;
      backdrop-filter:blur(var(--wall-blur));
      background-color:rgba(0,0,0,var(--wall-mask));
    }
    .wallpaper .wallpaper-video{
      position: relative;
      height: 100%;
      width: 100%;
      object-fit: cover;
      transition: .3s;
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;
    }`;

    shadow.append(wrapper);
    shadow.append(style);
  }
}

customElements.define("tab-wallpaper", TabWallpaper);
