import React, { Component } from 'react';
import './Visualiser.css';
import { bubbleSortAnimate, selectionSortAnimate } from './sortingAlgorithms.js'

const PRIMARY_COLOR = '#5b62c0';

class Visualiser extends Component {
      state = {
            numbers: [],
            size: '25',
            speed: '30',
            status: false,
      }


      componentDidMount() {
            this.generateNumbers();
      }


      generateNumbers() {
            const numbers = [];
            for (let i = 0; i < this.state.size; i++) {
                  numbers.push(getRandomNumber(20, 500)); // From 20 beacuse these numbers defines height of bars (bar with height less that 20px is barely visible)
            }
            this.setState({
                  numbers: numbers,
            });
      }

      handleChangeSize(event) {
            this.setState({
                  size: event.target.value,
            })
            this.generateNumbers();
      }

      handleChangeSpeed(event) {
            this.setState({
                  speed: event.target.value,
            })
      }

      stopSorting(generateNumbers) {
            let blockedElements = document.getElementsByClassName('blocked');
            let numberBars = document.getElementsByClassName('number-bar');
            let stopButton = document.getElementById('stop');
            let killId = setTimeout(function () {
                  for (var i = killId; i > 0; i--) clearInterval(i);
                  for (let i = 0; i < numberBars.length; i++) {
                        numberBars[i].style.backgroundColor = PRIMARY_COLOR;
                  }
            }, 10);
            this.generateNumbers();
            for (let i = 0; i < blockedElements.length; i++) {
                  blockedElements[i].disabled = !blockedElements[i].disabled;
            }
            stopButton.style.visibility = 'hidden';
      }

      visualizeBubbleSort() {
            const animations = bubbleSortAnimate(this.state.numbers);
            let blockedElements = document.getElementsByClassName('blocked');
            let stopButton = document.getElementById('stop');
            for (let i = 0; i < blockedElements.length; i++) {
                  blockedElements[i].disabled = !blockedElements[i].disabled;
            }
            stopButton.style.visibility = 'visible';
            for (let i = 0; i < animations.length; i++) {
                  let numberBars = document.getElementsByClassName('number-bar');
                  const [firstBarID, secBarID, action, height1, height2] = animations[i];
                  let firstBarStyle = numberBars[firstBarID].style;
                  let secBarStyle = numberBars[secBarID].style;
                  let color;

                  if (action === 1) {
                        color = '#FF6347';
                        setTimeout(() => {
                              firstBarStyle.backgroundColor = color;
                              secBarStyle.backgroundColor = color;
                        }, i * this.state.speed);
                  }
                  if (action === 2) {
                        setTimeout(() => {
                              firstBarStyle.height = `${height2}px`;
                              secBarStyle.height = `${height1}px`;
                        }, i * this.state.speed);
                  }
                  if (action === 3) {
                        color = '#00FF00';
                        setTimeout(() => {
                              firstBarStyle.backgroundColor = color;
                              secBarStyle.backgroundColor = color;
                        }, i * this.state.speed);
                  }
                  if (action === null) {
                        color = PRIMARY_COLOR;
                        setTimeout(() => {
                              firstBarStyle.backgroundColor = color;
                              secBarStyle.backgroundColor = color;
                        }, i * this.state.speed);
                  }
                  if (action === 4) {
                        setTimeout(() => {
                              for (let i = 0; i < blockedElements.length; i++) {
                                    blockedElements[i].disabled = !blockedElements[i].disabled;
                                    stopButton.style.visibility = 'hidden';
                              }
                        }, i * this.state.speed);
                  }
            }

      }

      visualizeSelectionSort() {
            const animations = selectionSortAnimate(this.state.numbers);
            let blockedElements = document.getElementsByClassName('blocked');
            let stopButton = document.getElementById('stop');
            for (let i = 0; i < blockedElements.length; i++) {
                  blockedElements[i].disabled = !blockedElements[i].disabled;
            }
            stopButton.style.visibility = 'visible';
            for (let i = 0; i < animations.length; i++) {
                  let numberBars = document.getElementsByClassName('number-bar');
                  const [firstBarID, secBarID, action, height1, height2] = animations[i];
                  let firstBarStyle = numberBars[firstBarID].style;
                  let secBarStyle = numberBars[secBarID].style;
                  let color;
                  if (action === 0) {
                        color = '#00FF00';
                        setTimeout(() => {
                              firstBarStyle.backgroundColor = color;
                              secBarStyle.backgroundColor = color;
                        }, i * this.state.speed);
                  }
                  if (action === 1) {
                        color = '#FF6347';
                        setTimeout(() => {
                              firstBarStyle.backgroundColor = PRIMARY_COLOR;
                              secBarStyle.backgroundColor = color;
                        }, i * this.state.speed);
                  }
                  if (action === 2) {
                        color = PRIMARY_COLOR;
                        setTimeout(() => {
                              secBarStyle.backgroundColor = color;
                        }, i * this.state.speed);
                  }
                  if (action === 3) {
                        color = PRIMARY_COLOR;
                        setTimeout(() => {
                              firstBarStyle.height = `${height2}px`;
                              secBarStyle.height = `${height1}px`;
                              firstBarStyle.backgroundColor = color;
                              secBarStyle.backgroundColor = color;
                        }, i * this.state.speed);
                  }
                  if (action === 4) {
                        setTimeout(() => {
                              for (let i = 0; i < blockedElements.length; i++) {
                                    blockedElements[i].disabled = !blockedElements[i].disabled;
                                    stopButton.style.visibility = 'hidden';
                              }
                        }, i * this.state.speed);
                  }
            }
      }

      render() {
            const { numbers } = this.state;

            return (
                  <div className="visualiser-container">
                        <button className='button blocked' onClick={() => this.generateNumbers()}>Generate Numbers</button>
                        <div className="bars-container">
                              {numbers.map((val, id) => (
                                    <div className='number-bar' key={id} style={{ height: val }}></div>
                              ))}
                        </div>

                        <button className='button blocked' onClick={() => this.visualizeBubbleSort()}>Bubble sort</button>
                        <button className='button blocked' onClick={() => this.visualizeSelectionSort()}>Selection sort</button>
                        <button className='button' id='stop' onClick={() => this.stopSorting()} >Stop</button>
                        <label>
                              Number of elements to sort:
                              <input className='input-range blocked' type="range" value={this.state.size} min='5' max='100' step='5' onChange={(e) => this.handleChangeSize(e)} disabled={this.state.status} />
                        </label>
                        <label>
                              Delay between iterations:
                              <input className='input-range blocked' type="range" value={this.state.speed} min='5' max='300' step='5' onChange={(e) => this.handleChangeSpeed(e)} disabled={this.state.status} />
                              {this.state.speed} ms
                        </label>
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