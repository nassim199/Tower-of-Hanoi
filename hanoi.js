
const input=document.querySelector('input');
const button=document.getElementById('initialise');
const pics=document.querySelectorAll('.pic');
const message=document.getElementById('message');
const minMovements=document.getElementById('minMovements');
const numberMovements=document.getElementById('numberMovements');
var play=false, p=false,n,l;
//user interface
class UI {
  static showMessage(alertMessage, alert) {
    message.classList.remove(`alert-info`);
    message.classList.remove(`alert-warning`);
    message.innerHTML='';
    message.classList.add(`alert-${alert}`);
    message.innerHTML=alertMessage;
    if (alert!=='success')
      setTimeout(() => {
        message.classList.remove(`alert-${alert}`);
        if(alertMessage===message.innerHTML)
          message.innerHTML='';
      },3000);
  }
  static createDisque(taille,rang) {
    let disqueUI;
    disqueUI = document.createElement('div');
    disqueUI.className =`disque-${taille} rang-${rang}`;
    return disqueUI;
  }
  static initialise(n) {
    let disque;
    p=false;
    message.innerHTML='';
    message.classList.remove('alert-success');
    minMovements.innerHTML=Math.pow(2,n)-1;
    l=0;
    numberMovements.innerHTML=l;
    pics.forEach(pic => {
      let inter;
      inter=pic.lastElementChild;
      while(!inter.classList.contains('vertical')) {
        inter.remove();
        inter=pic.lastElementChild;
      }
    })
    for (var i = n; i > 0; i--) {
      disque= UI.createDisque(i,n-i+1);
      pics[0].appendChild(disque);
    }
  }
  static pushDisque(index,taille) {
    let rang,x,arrayClassName,disque;

    if(pics[index].lastElementChild.classList.contains('vertical')) {
      rang=1;
      disque=UI.createDisque(taille,rang);
      disque.classList.add('rang');
      return {
          boole:true,
          disqueUI:disque
        };
    } else {
      arrayClassName=pics[index].lastElementChild.className.split(' ');
      x=arrayClassName[0];
      if (parseInt(x[x.length-1])>=taille) {
        x=arrayClassName[1];
        rang=parseInt(x[x.length-1])+1;
        disque=UI.createDisque(taille,rang);
        disque.classList.add('rang');
        return {
            boole:true,
            disqueUI:disque
          };
      } else {
        UI.showMessage('You can\'t move it to this picket','warning');
        return false;
      }
    }
  }
  static popDisque(index) {
    let disqueUI,arrayClassName,x;
    disqueUI=pics[index].lastElementChild;
    if (!disqueUI.classList.contains('vertical')) {
      UI.move(disqueUI);
      arrayClassName=disqueUI.className.split(' ');
      x=arrayClassName[0];
      return parseInt(x[x.length-1]);
    } else {
      return 0;
    }
  }
  static move(disqueUI) {
    disqueUI.classList.add('rang');
  }
  static win(n) {
    let arrayClassName=pics[2].lastElementChild.className.split(' '),x;
    if (arrayClassName[1])
      x=arrayClassName[1];
    else
      x=0;
    let rang=parseInt(x[x.length-1]);
    if (rang==n) {
      return true;
    } else {
      return false;
    }
  }
}

//Events
let i,last,result;
pics.forEach((pic,index) => {
  pic.addEventListener('click',(e) => {
    if(play) {
      if(!p) {
        //pop
        i = UI.popDisque(index);
        if (i) {
          p=true;
          last=index;
        } else {
          UI.showMessage('This peg is empty', 'info');
        }
      } else {
        //push
          result=UI.pushDisque(index,i);
          if(result.boole) {
            if (last !== index) {
              pics[last].lastElementChild.remove();
              pics[index].appendChild(result.disqueUI);
            }
            setTimeout(() => pics[index].lastElementChild.classList.remove('rang'), 100);
            p=false;
            l++;
            numberMovements.innerHTML=l;
            if (UI.win(n)) {
              UI.showMessage('CONGRATULATIONS !! You win ','success');
              play=false;
            }
          }
      }
    } else {
      UI.showMessage('Yous must start the game first','info');
    }
  });
});
button.addEventListener('click',function() {
  n=input.value;
  if (n<=6 && n>=2) {
    UI.initialise(n);
    play=true;
  } else {
    UI.showMessage('The number of disks must be between 2 and 6','warning');
  }
});
