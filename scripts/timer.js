let x = 0;
let bellSound = new Audio('Sounds/bellSound.mp3');

class Timer {
     
    constructor(root) {
      root.innerHTML = Timer.getHTML();
  
      this.el = {
        hours: root.querySelector(".timer__part--hours"),
        minutes: root.querySelector(".timer__part--minutes"),
        seconds: root.querySelector(".timer__part--seconds"),
        control: root.querySelector(".timer__btn--control"),
        reset: root.querySelector(".timer__btn--reset"),
        close: root.querySelector(".timer__btn--close"),
        readMinutes: root.querySelector(".inputValueForMinutes")
      };
  
      this.interval = null;
      this.remainingSeconds = 0;
      
            
      
      this.el.close.addEventListener("click", () => {
        
            this.stop();
            x = 0;
            this.remainingSeconds = 0;
            this.updateInterfaceTime();
        
      });

  
      this.el.control.addEventListener("click", () => {
        if (this.interval === null) {
          this.start();
        } else {
          this.stop();
        }
      });
      
      this.el.readMinutes.addEventListener("change", () => {
        
        x = 0;
        x = document.getElementById("minutesValInTextbox").value;
    const inputMinutes = x ;
   
    if (inputMinutes < 60) {
      this.stop();
      this.remainingSeconds = inputMinutes * 60;
      this.updateInterfaceTime();
      this.start();
    }else {
        this.stop();
        this.remainingSeconds = inputMinutes * 60;
        this.updateInterfaceTime();
        this.start();
    }
    x = 0;
        
    });

      this.el.reset.addEventListener("click", () => {
        
                x += 10;
            const inputMinutes = x ;
        
            if (inputMinutes < 60) {
            this.stop();
            this.remainingSeconds = inputMinutes * 60;
            this.updateInterfaceTime();
            }else {
                this.stop();
                this.remainingSeconds = inputMinutes * 60;
                this.updateInterfaceTime();

            }
        
        
      });
    }
  
    updateInterfaceTime() {
      let hours = 0, minutes = 0, seconds = 0 ;
      
      minutes = Math.floor(this.remainingSeconds / 60);
      seconds = this.remainingSeconds % 60;
      hours = Math.floor(minutes / 60 );
      
      if(hours > 0){
        minutes = minutes - (Math.floor(hours * 60));
      }

      this.el.hours.textContent   = hours.toString().padStart(2, "0");
      this.el.minutes.textContent = minutes.toString().padStart(2, "0");
      this.el.seconds.textContent = seconds.toString().padStart(2, "0");
    }
  
    updateInterfaceControls() {
      if (this.interval === null) {
        this.el.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
        this.el.control.classList.add("timer__btn--start");
        this.el.control.classList.remove("timer__btn--stop");
      } else {
        this.el.control.innerHTML = `<span class="material-icons">pause</span>`;
        this.el.control.classList.add("timer__btn--stop");
        this.el.control.classList.remove("timer__btn--start");
      }
    }
  
    start() {
      if (this.remainingSeconds === 0) return;
  
      this.interval = setInterval(() => {
        this.remainingSeconds--;
        this.updateInterfaceTime();
  
        if (this.remainingSeconds === 0) {
          x = 0;  
          bellSound.play();
          this.stop();
        }
      }, 1000);
  
      this.updateInterfaceControls();
    }
  
    stop() {
      clearInterval(this.interval);
  
      this.interval = null;
  
      this.updateInterfaceControls();
    }

  
    static getHTML() {
      return `

              <span class="timer__part timer__part--hours">00</span>
              <span class="timer__part">:</span>
              <span class="timer__part timer__part--minutes">00</span>
              <span class="timer__part">:</span>
              <span class="timer__part timer__part--seconds">00</span>
              <button type="button" class="timer__btn timer__btn--control timer__btn--start">
                  <span class="material-icons">play_arrow</span>
              </button>
              <button type="button" class="timer__btn timer__btn--reset">
                  <span class="material-icons">timer</span>
              </button>
              <button type="button" class="timer__btn timer__btn--close">
                  <span class="material-icons">close</span>
              </button>
              <div class="inputForMinutes">
      
              <input type="number" id="minutesValInTextbox" class="inputValueForMinutes" placeholder="or Type here (in minutes)" required>
              </div>
          `;
    }
  }
  


  new Timer(
      document.querySelector(".timer")
  );

  
