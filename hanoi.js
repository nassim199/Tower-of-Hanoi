const input=document.querySelector('input');
const button=document.getElementById('initialise');
const pics=document.querySelectorAll('.pic');
let piquetsGlobal;

//disque
class Disque {
  constructor(taille,rang) {
    this.taille=taille;
    this.rang=rang;
  }
  setRang(rang) {
    this.rang=rang;
  }
}

//piquet
class Piquet {
  constructor(disques) {
    this.disques=disques;
  }
  pushD(disque) {
    console.log('one push');
    let l= this.disques.length;
    if (l==0 || this.disques[l-1].taille > disque.taille) {
      this.disques.push(disque);
      return true;
    } else {
      return false;
    }
  }
  popD() {
    if (this.disques.length != 0) {
      return this.disques.pop();
    } else {
      return false;
    }
  }
}

//logique du jeut
class game {
    static initialise(n) {
      let piquets=[];
      let disques=[];
      let disque,piquet;
      for (var i = n; i > 0; i--) {
        disque = new Disque(i,n-i+1);
        disques.push(disque);
      }
      piquet= new Piquet(disques);
      piquets.push(piquet);
      piquet= new Piquet([]);
      piquets.push(piquet);
      piquets.push(piquet);
      return piquets;
    }
    static move(piquets,i,j) {
      console.log(i +' ' + j);
      let disque=piquets[i].popD();
      if (disque) {
        if (piquets[j].pushD(disque)) {
          if (j===2 && piquets[2].disques.length === (piquets[2].disques.length+
                                                      piquets[2].disques.length+
                                                      piquets[2].disques.length)) {
            return {
              alertMessage: 'victoire',
              boole: true
            }

          } else {
            return {
              alertMessage: '',
              boole: true
            }
          }
        } else {
          return {
            alertMessage: 'impossible',
            boole: false
          }
        }
      } else {
        return {
          alertMessage: 'impossible',
          boole: false
        }
      }
    }
}

//user interface
class UI {
  static showMessage(message) {
    console.log(message);
  }
  static createDisque(disque) {
    let disqueUI;
    disqueUI = document.createElement('div');
    disqueUI.className =`disque-${disque.taille} rang-${disque.rang}`;
    return disqueUI;
  }
  static initialise(piquets) {
    pics.forEach((pic,index) => {
      piquets[index].disques.forEach(disque => {
        pic.appendChild(UI.createDisque(disque));
      });
      if (index===0) {
        pic.lastElementChild.classList.add('push');
      }
    })
  }
  static pushDisque(index,disque) {
    let rang,x;
    pics[index].lastElementChild.classList.remove('push');
    if(pics[index].lastElementChild.classList.contains('vertical')) {
      rang=1;
    } else {
      x=pics[index].lastElementChild.className;
      rang=parseInt(x[x.length-1])+1;
    }
    disque.classList.add(`rang-${rang}`);
    pics[index].appendChild(disque);
  }
  static popDisque(index) {
    let disqueUI,arrayClassName;
    disqueUI= pics[index].lastElementChild;
    pics[index].lastElementChild.remove();
    if (!pics[index].lastElementChild.classList.contains('vertical')) {
        pics[index].lastElementChild.classList.add('push');
    }
    arrayClassName=disqueUI.className.split(' ');
    disqueUI.classList.remove(arrayClassName[1]);
    return disqueUI;
  }
  static move(disqueUI) {

  }
}
//Events
let i;
pics.forEach((pic,index) => {
  pic.addEventListener('click',(e) => {
    if(e.target.classList.contains('pop')) {
      //pop
      pics.forEach(pic => pic.classList.remove('pop'));
      i = index;
  //    console.log('pop disque piquet '+i);
    } else {
    //  console.log('push marche');
      //push
      if (game.move(piquetsGlobal,i,index).boole) {
    //    console.log('push disque de piquet '+ i + ' a piquet ' + index);
        UI.pushDisque(index,UI.popDisque(i))
        pics.forEach(pic => pic.classList.add('pop'));
      }
    }
  });
})
button.addEventListener('click',function() {
  if (input.value<=6 && input.value>=2) {
    piquetsGlobal=game.initialise(input.value);
    UI.initialise(piquetsGlobal);
  } else {
    UI.showMessage('le nombre de disques doit etre entre 3 et 7');
  }
});
