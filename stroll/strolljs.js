function sound(){
    var audio = document.createElement("audio");
      audio.src = "alerttone.wav";
      audio.addEventListener("ended", function () {
          document.removeChild(this);
      }, false);
      audio.play();  
  }
  document.querySelector('#btn').onclick = function ()
  {
      if (document.querySelector('#addtask input').value.length == 0)
      {
          alert("Please Enter a Task")
      }
      else
      {
          document.querySelector('#tasks').innerHTML += `
              <div class="task">
                  <span id="taskname">
                      ${document.querySelector('#addtask input').value}
                  </span>
                  <button class="delete">
                      <i class="far fa-trash-alt"></i>
                  </button>
              </div>
          `;
  
          var current_tasks = document.querySelectorAll(".delete");
          for (var i = 0; i < current_tasks.length; i++)
          {
              current_tasks[i].onclick = function ()
              {
                  this.parentNode.remove();
              }
          }
  
          var tasks = document.querySelectorAll(".task");
          for (var i = 0; i < tasks.length; i++)
          {
              tasks[i].onclick = function ()
              {
                  this.classList.toggle('completed');
              }
          }
  
          document.querySelector("#addtask input").value = "";
      }
  }
  var pomodoro = {
      started : false,
      minutes : 0,
      seconds : 0,
      fillerHeight : 0,
      fillerIncrement : 0,
      interval : null,
      minutesDom : null,
      secondsDom : null,
      fillerDom : null,
      init : function(){
        var self = this;
        this.minutesDom = document.querySelector('#minutes');
        this.secondsDom = document.querySelector('#seconds');
        this.fillerDom = document.querySelector('#filler');
        this.interval = setInterval(function(){
          self.intervalCallback.apply(self);
        }, 1000);
        document.querySelector('#work').onclick = function(){
          self.startWork.apply(self);
        };
        document.querySelector('#shortBreak').onclick = function(){
          self.startShortBreak.apply(self);
        };
        document.querySelector('#longBreak').onclick = function(){
          self.startLongBreak.apply(self);
        };
        document.querySelector('#stop').onclick = function(){
          self.stopTimer.apply(self);
        };
      },
      resetVariables : function(mins, secs, started){
        this.minutes = mins;
        this.seconds = secs;
        this.started = started;
        this.fillerIncrement = 200/(this.minutes*60);
        this.fillerHeight = 0;  
      },
      startWork: function() {
        this.resetVariables(25, 0, true);
      },
      startShortBreak : function(){
        this.resetVariables(5, 0, true);
      },
      startLongBreak : function(){
        this.resetVariables(15, 0, true);
      },
      stopTimer : function(){
        this.resetVariables(25, 0, false);
        this.updateDom();
      },
      toDoubleDigit : function(num){
        if(num < 10) {
          return "0" + parseInt(num, 10);
        }
        return num;
      },
      updateDom : function(){
        this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
        this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
        this.fillerHeight = this.fillerHeight + this.fillerIncrement;
        this.fillerDom.style.height = this.fillerHeight + 'px';
      },
      intervalCallback : function(){
        if(!this.started) return false;
        if(this.seconds == 0) {
          if(this.minutes == 0) {
            this.timerComplete();
            sound();
            return;
          }
          this.seconds = 59;
          this.minutes--;
        } else {
          this.seconds--;
        }
        this.updateDom();
      },
      timerComplete : function(){
        this.started = false;
        this.fillerHeight = 0;
      }
  };
  window.onload = function(){
    pomodoro.init();
  };
  
  
  /*var prevScrollpos = window.pageYOffset;
  window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
      document.getElementById("navbar").style.left = "0";
    } else {
      document.getElementById("navbar").style.left = "-50px";
    }
    prevScrollpos = currentScrollPos;
  }*/

  /*var elem = document.documentElement;
  
  function fullscreen(){
    if(elem.requestFullscreen){
      elem.requestFullscreen();
    }

  }*/