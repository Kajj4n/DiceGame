"use strict";

/**
 * @class
 * @classdesc This class represents the document and contains the event listener for the dice app button.
 * @constructor Creates the HTML structure and adds event listeners for the dice app button.
 */
var Doc = function() {

    /**
     *  @type {HTMLBodyElement}
     *  @private
    */
    var body = document.body;

    /** 
     * @type {HTMLDivElement} 
     * @private
     */
    var wrapperPage = document.createElement("div");

    /** 
     * @type {HTMLDivElement}
     * @private
     */
    var wrapperPageMenu = document.createElement("div");

    /**
     * @type {HTMLUListElement}
     * @private
     */
    var ul = document.createElement("ul");

    /**
     * @type {HTMLLIElement}
     * @private
     */
    var liDice = document.createElement("li");

    /**
     * @type {HTMLDivElement}
     * @private
     */
    var wrapperPageContent = document.createElement("div");

    /** 
     * @type {HTMLLIElement}
     * @private
     */
    var diceAppBtn = null;

    /**
     * @type {DiceApp} 
     * @private
     */
    var app = null;

    /**
     * Appends the elements to the desined location, adds identifiers to elements, adds event listeners.
     * @public
     * @returns {void}
     */
    this.construct = function() {
        //Adds identifiers to the elements
        wrapperPage.id = "page-wrapper";
        wrapperPageMenu.id = "page-menu-wrapper";
        liDice.id = "icon-dice";
        wrapperPageContent.id = "page-content-wrapper";

        //Appends elementest to the intended loactions
        ul.appendChild(liDice);
        wrapperPageMenu.appendChild(ul);
        wrapperPage.appendChild(wrapperPageMenu);
        wrapperPage.appendChild(wrapperPageContent);
        body.appendChild(wrapperPage);

        //Adds enevent listeners to the elements
        diceAppBtn = document.getElementById("icon-dice");
        diceAppBtn.addEventListener("click", function() {
            app = new DiceApp(wrapperPageContent);
            app.construct();
            app.generateApp();
        });
    }
};

/**
 * A singleton method that get the instance of the Doc class.
 * @public
 * @static
 * @throws Will throw an error if the class has already been instantiated.
 * @returns {Doc} - The single instance of the Doc class.
 */
Doc.getInstance = function(){
    if (Doc._instance == null){
        Doc._instance = new Doc();
    }

    else if (Doc._instance != null){
        throw new Error("Class \"Doc\" has already been instantiated.");
    }

    return Doc._instance;
}

// Adds onload event listener to the DOM, instantiating the Doc class.
document.addEventListener("DOMContentLoaded", function() {
    var doc = Doc.getInstance();
    doc.construct();
});
