import { stopFadeEdges } from "../animate";
class sequentialGlow {
  constructor() {
    this.animationTimeout = [];
    this.elements = null;
    this.handler = null;
  }

  changeBackgroundColorSequentially(delay, fromClass, toClass, initialDelay) {
    let index = 0;

    const changeColor = () => {
      this.animationTimeout = [];
      if (index < this.elements.length) {
        this.elements[index].classList.remove(fromClass);
        this.elements[index].classList.remove("fade");
        this.elements[index].classList.add(toClass);
        index++;
        this.animationTimeout.push(setTimeout(changeColor, delay));
      } else {
        // Animation ended, restore original colors
        setTimeout(() => {
          stopFadeEdges();
          for (let i = 0; i < this.elements.length; i++) {
            this.elements[i].classList.remove(toClass);
            this.elements[i].classList.add(fromClass);
          }
        }, 2 * delay);
      }
    };

    const startSequentialChange = () => {
      this.animationTimeout.forEach((timeout) => {
        clearTimeout(this.animationTimeout); // Clear any previous animation timeout
      });
      changeColor();
    };

    const stopSequentialChange = () => {
      this.animationTimeout.forEach((timeout) => {
        clearTimeout(this.animationTimeout);
      }); // Clear the animation timeout

      // Restore original colors
      for (let i = 0; i < this.elements.length; i++) {
        this.elements[i].classList.remove(toClass);
        this.elements[i].classList.add(fromClass);
      }
    };

    setTimeout(() => startSequentialChange(), initialDelay);

    this.handler = {
      start: startSequentialChange,
      stop: stopSequentialChange,
    };
  }

  startAnimation(
    sequenceArray,
    delay = 2000,
    fromClass,
    toClass,
    initialDelay = 0
  ) {
    this.elements = sequenceArray;
    return this.changeBackgroundColorSequentially(
      delay,
      fromClass,
      toClass,
      initialDelay
    );
  }

  stopAnimation() {
    stopFadeEdges();
    this.handler.stop();
  }
}

export default sequentialGlow;
