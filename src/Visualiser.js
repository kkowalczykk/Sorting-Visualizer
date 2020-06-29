import React, { Component } from 'react';
import './Visualiser.css';
import { bubbleSortAnimate } from './sortingAlgorithms.js'


const ANIMATION_SPEED = 30;
const NUMBER_OF_BARS = 20;

class Visualiser extends Component {
      state = {
            numbers: [],
      }


      componentDidMount() {
            this.generateNumbers();
      }

      generateNumbers() {
            const numbers = [];
            for (let i = 0; i < NUMBER_OF_BARS; i++) {
                  numbers.push(getRandomNumber(1, 500));
            }
            this.setState({
                  numbers: numbers,
            });
      }

      visualizeBubbleSort() {
            const animations = bubbleSortAnimate(this.state.numbers);
            for (let i = 0; i < animations.length; i++) {
                  let numberBars = document.getElementsByClassName('number-bar');
                  const [firstBarID, secBarID, action, height1, height2] = animations[i];
                  let firstBarStyle = numberBars[firstBarID].style;
                  let secBarStyle = numberBars[secBarID].style;
                  let color;
                  // if (action === 0) {
                  //       color = 'purple';
                  //       setTimeout(() => {
                  //             firstBarStyle.backgroundColor = color;
                  //             secBarStyle.backgroundColor = color;
                  //       }, i * ANIMATION_SPEED);
                  // }
                  if (action === 1) {
                        color = 'red';
                        setTimeout(() => {
                              firstBarStyle.backgroundColor = color;
                              secBarStyle.backgroundColor = color;
                        }, i * ANIMATION_SPEED);
                  }
                  if (action === 2) {
                        color = 'red';
                        setTimeout(() => {
                              firstBarStyle.height = `${height2}px`;
                              secBarStyle.height = `${height1}px`;
                        }, i * ANIMATION_SPEED);
                  }
                  if (action === 3) {
                        color = 'green';
                        setTimeout(() => {
                              firstBarStyle.backgroundColor = color;
                              secBarStyle.backgroundColor = color;
                        }, i * ANIMATION_SPEED);
                  }
                  if (action === null) {
                        color = 'teal';
                        setTimeout(() => {
                              firstBarStyle.backgroundColor = color;
                              secBarStyle.backgroundColor = color;
                        }, i * ANIMATION_SPEED);
                  }
            }
      }


      render() {
            const { numbers } = this.state;

            return (
                  <div className="visualiser-container">
                        <div className="bars-container">
                              {numbers.map((val, id) => (
                                    <div className='number-bar' key={id} style={{ height: val }}></div>
                              ))}
                        </div>
                        <button onClick={() => this.generateNumbers()}>Generate Numbers</button>
                        <button onClick={() => this.visualizeBubbleSort()}>Bubble sort</button>
                  </div>
            );
      }
}

function getRandomNumber(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min) + min);
}

export default Visualiser;