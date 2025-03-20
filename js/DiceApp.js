"use strict";

/**
 * @class
 * @classdesc This class represents a dice window application.
 * @constructor
 * @param {HTMLDivElement} wrapper - The element that the dice app will be appended to.
 */
var DiceApp = function(wrapper) {

    /** 
     * @type {HTMLDivElement}
     * @public
     */
    this.wrapper = wrapper;
    
    /** 
     * @type {HTMLUListElement}
     * @public 
     */
    this.diceUl = document.createElement("ul");

    /** 
     * @type {HTMLDivElement}
     * @public 
     */
    this.wrapperContent = document.createElement("div");

    /**
     * @type {HTMLUListElement} 
     * @public
     */
    this.countUl = document.createElement("ul");

    /**
     * @type {HTMLLIElement} 
     * @public
     */
    this.countLi = document.createElement("li");

    /** 
     * @type {HTMLLIElement}
     * @public
     */
    this.rollLi = document.createElement("li");

    /**
     * @type {HTMLLIElement} 
     * @public
     */
    this.removeLi = document.createElement("li");

    /** 
     * @type {HTMLLIElement}
     * @public
     */
    this.addLi = document.createElement("li");

    /** 
     * @type {HTMLUListElement}
     * @public
     */
    this.btnUl = document.createElement("ul");

    /** 
     * @type {HTMLDivElement} 
     * @public
     */
    this.wrapperToolbar = document.createElement("div");

    /** 
     * @type {HTMLDivElement}
     * @public
     */
    this.closeApp = document.createElement("div");

    /** 
     * @type {HTMLDivElement}
     * @public
     */
    this.wrapperMenu = document.createElement("div");

    /** 
     * @type {HTMLDivElement}
     * @public
     */
    this.wrapperElem = document.createElement("div");

    /** 
     * @type {HTMLDivElement}
     * @public
     */
    this.wrapperWidow = this.wrapperElem;

    /** 
     * @type {HTMLAudioElement}
     * @public
     */
    this.audio = new Audio("./wav/add.wav");

    /** 
     * @type {number}
     * @public
     */
    this.pos1 = 0;
    /** 
     * @type {number}
     * @public
     */
    this.pos2 = 0;
    /** 
     * @type {number}
     * @public
     */
    this.pos3 = 0;
    /** 
     * @type {number}
     * @public
     */
    this.pos4 = 0;

    /** 
     * @type {number}
     * @public
     */
    this.boxHeight = 0;
    /** 
     * @type {number}
     * @public
     */
    this.boxWidth = 0;

    /**
     *  @type {number}
     * @public
     */
    this.totDiceHeight = 0;

    /** 
     * @type {number}
     * @public
     */
    this.rowAmount = 0;

    /** 
     * @type {number}
     * @public
     */
    this.counter = 0;

    /** 
     * @type {number}
     * @public
     */
    this.interval = null;

    /** 
     * @type {number}
     * @public
     */
    this.myTimeout = null;

    /**
     *  @type {HTMLLIElement} 
     *  @public
     */
    this.zeroLi = null;

    /** 
     * @type {Array}
     * @public
     */
    this.diceList = [];
};

/**
 * Appends the elements to the desined location, adds identifiers to elements, adds event listeners.
 * @public
 * @returns {void}
 */
DiceApp.prototype.construct = function() {
    //Adds classes to the elements
    this.wrapperContent.classList.add("dice-content-wrapper");
    this.countUl.classList.add("dice-toolbar-counter-wrapper");
    this.rollLi.classList.add("roll");
    this.removeLi.classList.add("remove");
    this.addLi.classList.add("add");
    this.wrapperToolbar.classList.add("dice-toolbar-wrapper");
    this.closeApp.classList.add("close");
    this.wrapperMenu.classList.add("dice-menubar-wrapper");
    this.wrapperElem.classList.add("dice-window-wrapper");

    //Adds styling to the dice app
    this.wrapperElem.style.position = "absolute";
    this.wrapperElem.style.top = "20px";
    this.wrapperElem.style.left = "0px";
    this.wrapperElem.style.zIndex = 0;

    //Appends elements to the intended loactions
    this.wrapperContent.appendChild(this.diceUl);
    this.countLi.appendChild(this.countUl);
    this.btnUl.appendChild(this.addLi);
    this.btnUl.appendChild(this.removeLi);
    this.btnUl.appendChild(this.rollLi);
    this.btnUl.appendChild(this.countLi);
    this.wrapperToolbar.appendChild(this.btnUl);
    this.wrapperMenu.appendChild(this.closeApp);
    this.wrapperElem.appendChild(this.wrapperMenu);
    this.wrapperElem.appendChild(this.wrapperToolbar);
    this.wrapperElem.appendChild(this.wrapperContent);
    
    //Adds enevent listeners to the elements
    this.rollLi.addEventListener("click", this.stopAction.bind(this));
    this.rollLi.addEventListener("mousedown", this.startAction.bind(this));
    this.removeLi.addEventListener("click", this.stopAction.bind(this));
    this.removeLi.addEventListener("mousedown", this.startAction.bind(this));
    this.addLi.addEventListener("click", this.stopAction.bind(this));
    this.addLi.addEventListener("mousedown", this.startAction.bind(this));
    this.closeApp.addEventListener("click", this.terminateApp.bind(this));
    this.wrapperElem.addEventListener("mousedown", this.mouseDown.bind(this));
    this.wrapperElem.addEventListener("click", this.setIndex.bind(this));  

    // Creates the individual number elements for the counter, assigns class, appends to intended location
    for (var i = 0; i < 5; i++){
        this.zeroLi = document.createElement("li");
        this.zeroLi.classList.add("zero");
        this.countUl.appendChild(this.zeroLi);
    }

    // Stores wrapperContents height and width after the DOM has loaded
    this.myTimeout = setTimeout(function() {
        this.boxWidth = this.wrapperContent.clientWidth;
        this.boxHeight = this.wrapperContent.clientHeight;
    }.bind(this), 0);
};

/**
 * Inserts the dice app into the wrapper element.
 * @public
 * @returns {void}
 */
DiceApp.prototype.generateApp = function() {
    this.wrapper.appendChild(this.wrapperWidow);
};

/**
 * Removes the dice app from the interface.
 * @public
 * @returns {void}
 */
DiceApp.prototype.terminateApp = function() {
    this.wrapperWidow.parentElement.removeChild(this.wrapperWidow);
    clearTimeout(this.myTimeout);
};

/**
 * Adds a generated dice to the dice app.
 * @public
 * @returns {void}
 */
DiceApp.prototype.addDice = function() {
    // If no more dices can fit in the window, the code is not executed.
    if (this.rowAmount * this.totDiceHeight >= this.boxHeight - this.totDiceHeight) return;

    // Instantiates and adds the created dice to the application.
    var dice = new Dice(this.diceUl);
    dice.add();
    dice.updateClass();
    
    // Updates the counter.
    this.counter += dice.number;
    var splitNumbers = this.counter.toString().split("").map(Number);
    this.countDice(splitNumbers);

    // The dice is pushed to the diceList array.
    this.diceList.push(dice);
    
    // Stores the total dice dimensions including the margin. 
    this.computedStyle = window.getComputedStyle(dice.diceLi);
    this.totDiceHeight = parseInt(this.computedStyle.height, 10) +
                         parseInt(this.computedStyle.marginBottom, 10) + 
                         parseInt(this.computedStyle.marginTop, 10);


    // Reduces the remaining width for the row.
    this.boxWidth -= this.totDiceHeight;

    // Registers new row when the total collection of each dice width is equivalent to the width of the window.
    if (this.boxWidth <= 0){
        this.rowAmount++;
        this.boxWidth = this.wrapperContent.clientWidth;
    }

    // Plays audio effect.
    this.audio.play();
};

/**
 * Removes a generated dice from the dice app.
 * @public
 * @returns {void}
 */
DiceApp.prototype.delDice = function() {
    // Last dice in the diceList array.
    var lastDice = this.diceList[this.diceList.length - 1];

    // If there is a last dice, the counter is updated and the dice is removed.
    if(lastDice != null){
        var splitNumbers = (this.counter -= lastDice.number).toString().split("").map(Number);
        this.countDice(splitNumbers);

       lastDice.remove();
       this.diceList.pop();
    } else return;

    // Increases the remaining width for the row.
    this.boxWidth += this.totDiceHeight;
    
    // Removes row when the box width goes below the maximum reached width.
    if (this.boxWidth > this.wrapperContent.clientWidth){
        this.rowAmount--;
        this.boxWidth = 28;
    }

    // Plays audio effect.
    this.audio.play();
};

/**
 * Rerolls all the dices in the dice app.
 * @public
 * @returns {void}
 */
DiceApp.prototype.reRoll = function() {
    // Last dice in the diceList array.
    var lastDice = this.diceList[this.diceList.length - 1];


    if (lastDice != null) {
        // Reset the layout state
        this.boxWidth = this.wrapperContent.clientWidth;
        this.rowAmount = 0;
        this.counter = 0;

        this.diceList.forEach(function(dice) {
            // Rolls each dice, adds the dice number to the counter.
            dice.roll();
            this.counter += dice.number;

            // Manually calculate rows after resetting the layout state.
            this.boxWidth -= this.totDiceHeight;

            // Registers new row when the total collection of each dice width is equivalent to the width of the window.
            if (this.boxWidth <= 0) {
                this.rowAmount++;
                this.boxWidth = this.wrapperContent.clientWidth;
            }
        }, this);

        // Updates the counter.
        var splitNumbers = this.counter.toString().split("").map(Number);
        this.countDice(splitNumbers);

        // Plays audio effect.
        this.audio.play();
    }
};

/**
 * Controls the z-index of the dice app.
 * @public
 * @returns {void}
 */
DiceApp.prototype.setIndex = function() {
    // Stores all of the app windows.
    var all = document.getElementsByClassName("dice-window-wrapper");
    // Stores the max possible z-index.
    var maxZIndex = 0;

    // Finds the highest possible index.
    for (var i = 0; i < all.length; i++){
        var zIndex = parseInt(window.getComputedStyle(all[i]).zIndex, 10);
        if (zIndex > maxZIndex) {
            maxZIndex = zIndex;
        }
    }

    // Sets the clicked on window to the highest index.
    this.wrapperElem.style.zIndex = maxZIndex + 1;
};

/**
 * Calls one of the dice methods (addDice, delDice, reRoll) on "mousedown".
 * @param {MouseEvent} e - The event that is being passed.
 * @public
 * @returns {void}
 */
DiceApp.prototype.startAction = function(e) {
    // Removes the eventlistener
    this.wrapperElem.removeEventListener("mousedown", this.mouseDown);

    // Continuesly trigger the action of deleting a dice.
    if(e.target == this.removeLi){
        this.delDice();
        if(!this.interval) this.interval = setInterval(this.delDice.bind(this), 500);
        return;
    }

    // Continuesly trigger the action of re-rolling a dices.
    else if (e.target == this.rollLi){
        this.reRoll();
        if(!this.interval) this.interval = setInterval(this.reRoll.bind(this), 500);
        return;
    }

    // Continuesly trigger the action of adding a dice.
    this.addDice();
    if(!this.interval) this.interval = setInterval(this.addDice.bind(this), 500);
};

/**
 * Clears the interval that was started in startAction.
 * @public
 * @returns {void}
 */
DiceApp.prototype.stopAction = function() {
    clearInterval(this.interval);
    this.interval = null;
};

/**
 * Updates the classes of the counter elements to reflect the current dice count.
 * @param {Array} splitNumbers - The array that contains the split numbers of counter.
 * @public
 * @returns {void}
 */
DiceApp.prototype.countDice = function(splitNumbers) {
    for (var i = 1; i < this.countUl.children.length + 1; i++){
        this.countUl.children[5 - i].className = [
            "zero", "one", "two", "three", "four",
            "five", "six", "seven", "eight", "nine"
        ][splitNumbers[splitNumbers.length - i]];
    }
};

/**
 * Makes the dice app draggable on "mousedown".
 * @param {MouseEvent} e - The event that is being passed.
 * @public
 * @returns {void}
 */
DiceApp.prototype.mouseDown = function(e) {
    // Ensures the event is cross-browser compatible.
    var e = e || window.event;
    // Prevents default behavior of the event.
    e.preventDefault();

    // Stores the initial mouse position.
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;

    // Binds the mouseup and mousemove events to their respective handlers.
    document.onmouseup = this.closeDragElement.bind(this);
    document.onmousemove = this.elementDrag.bind(this);
};

/**
 * Modifies the position of the dice app when dragging.
 * @param {MouseEvent} e - The event that is being passed.
 * @public
 * @returns {void}
 */
DiceApp.prototype.elementDrag = function(e) {
    // Ensures the event is cross-browser compatible.
    var e = e || window.event;
    // Prevents default behavior of the event.
    e.preventDefault();

    // Calculates the new cursor position.
    this.pos1 = this.pos3 - e.clientX;
    this.pos2 = this.pos4 - e.clientY;
    this.pos3 = e.clientX;
    this.pos4 = e.clientY;

    // Sets the element's new position.
    this.wrapperElem.style.top = (this.wrapperElem.offsetTop - this.pos2) + "px";
    this.wrapperElem.style.left = (this.wrapperElem.offsetLeft - this.pos1) + "px";
    this.wrapperElem.style.opacity = "0.5";
};

/**
 * Stops dragging the dice app.
 * @public
 * @returns {void}
 */
DiceApp.prototype.closeDragElement = function() {
    // Remove the mouseup and mousemove event handlers.
    document.onmouseup = null;
    document.onmousemove = null;
    
    // Reset the opacity of the wrapper element.
    this.wrapperElem.style.opacity = "1";
};