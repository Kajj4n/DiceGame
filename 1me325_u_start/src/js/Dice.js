"use strict";

/**
 * @class
 * @param {HTMLUListElement} diceUl - reference to the window that will contain this dice.
 * @classdesc This class represents a dice that has a number between 1 and 6.
 * @constructor Generates a random number between 1 and 6 and creates a dice element with a class attatched.
 */
var Dice = function(diceUl) {

    /** 
     * @type {HTMLLIElement}
     * @public
     */
    this.diceLi = document.createElement("li");
    this.diceLi.classList.add("dice");

    /** 
     * @type {HTMLUListElement}
     * @public
     */
    this.diceUl = diceUl;

    /** 
     * @type {number} 
     * @public
     */
    this.number = Math.floor(Math.random() * 6) + 1;
};

/**
 * Adds the dice Li element to the Ul element.
 * @public
 * @returns {void}
 */
Dice.prototype.add = function(){
    this.diceUl.appendChild(this.diceLi);
};

/**
 * Rolls the dice and updates its value and class.
 * @public
 * @returns {void}
 */
Dice.prototype.roll = function() {
    this.number = Math.floor(Math.random() * 6) + 1;
    this.updateClass();
};

/**
 * Removes the dice.
 * @public
 * @returns {void}
 */
Dice.prototype.remove = function() {
    this.diceUl.lastElementChild.remove();
};

/**
 * Updates the class of the dice element based on its current value.
 * @public
 * @returns {void}
 */
Dice.prototype.updateClass = function() {
    this.diceLi.className = "dice dice-side-" + ["one", "two", "three", "four", "five", "six"][this.number - 1];
};