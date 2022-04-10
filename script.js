// const keyboard = document.querySelector(".keyboard");

const Keyboard = {
  //ELEMENTS OBJECT

  elements: {
    main: null,
    keysContainer: null,
    keys: [],
  },

  //EVENTS OBJECT

  eventHandlers: {
    onInput: null,
    onClose: null,
  },

  //KEYBOARD_PROPERTIES OBJECT

  properties: {
    value: "",
    capsLock: false,
  },

  initials() {
    //Create Main elemnt
    this.elements.main = document.createElement("div");
    this.elements.keysContainer = document.createElement("div");
    //Setup Main elemnt
    this.elements.main.classList.add("keyboard", "keyboard--hidden");
    this.elements.keysContainer.classList.add("keys");
    this.elements.keysContainer.appendChild(this._createKeys());

    this.elements.keys = this.elements.keysContainer.querySelectorAll(".key");

    // Add elemnts to Document
    this.elements.main.appendChild(this.elements.keysContainer);
    document.body.appendChild(this.elements.main);

    document.querySelectorAll(".keyboard__input").forEach((e) => {
      e.addEventListener("focus", () => {
        this.open(e.value, (currentValue) => {
          e.value = currentValue;
        });
      });
    });
  },

  _createKeys() {
    const fragment = document.createDocumentFragment();
    const keyLayout = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "0",
      "backspace",
      "q",
      "w",
      "e",
      "r",
      "t",
      "y",
      "u",
      "i",
      "o",
      "p",
      "caps",
      "a",
      "s",
      "d",
      "f",
      "g",
      "h",
      "j",
      "k",
      "l",
      "enter",
      "done",
      "z",
      "x",
      "c",
      "v",
      "b",
      "n",
      "m",
      ",",
      ".",
      "?",
      "space",
    ];

    //Create HTML FOR ICONS
    const createIconHTML = (icon_name) => {
      return `<i class="material-icons">${icon_name}</i>`;
    };

    keyLayout.forEach((keyy) => {
      const keyElement = document.createElement("button");
      const insertLineBreak =
        ["backspace", "p", "enter", "?"].indexOf(keyy) != -1;

      //Add attriibute /Classes

      keyElement.setAttribute("type", "button");
      keyElement.classList.add("key");

      switch (keyy) {
        case "backspace":
          keyElement.classList.add("key__wide");
          keyElement.innerHTML = createIconHTML("backspace");
          keyElement.addEventListener("click", () => {
            this.properties.value = this.properties.value.substring(
              0,
              this.properties.value.length - 1
            );
            this._triggerEvent("oninput");
          });
          break;
        case "caps":
          keyElement.classList.add("key__wide", "key__activatable");
          keyElement.innerHTML = createIconHTML("keyboard_capslock");
          keyElement.addEventListener("click", () => {
            this._toggleCapsLock();
            keyElement.classList.toggle(
              "key__active",
              this.properties.capsLock
            );
          });

          break;
        case "enter":
          keyElement.classList.add("key__wide");
          keyElement.innerHTML = createIconHTML("keyboard_return");
          keyElement.addEventListener("click", () => {
            this.properties.value += "\n";
            this._triggerEvent("oninput");
          });

          break;
        case "space":
          keyElement.classList.add("key__extrawide");
          keyElement.innerHTML = createIconHTML("space_bar");
          keyElement.addEventListener("click", () => {
            this.properties.value += " ";
            this._triggerEvent("oninput");
          });

          break;
        case "done":
          keyElement.classList.add("key__wide", "key__dark");
          keyElement.innerHTML = createIconHTML("check_circle");
          keyElement.addEventListener("click", () => {
            this.close();
            this._triggerEvent("onclose");
          });

          break;
        default:
          keyElement.textContent = keyy.toLowerCase();
          keyElement.addEventListener("click", () => {
            this.properties.value += this.properties.capsLock
              ? keyy.toUpperCase()
              : keyy.toLowerCase();
            this._triggerEvent("oninput");
          });
          break;
      }
      fragment.appendChild(keyElement);
      if (insertLineBreak) {
        fragment.appendChild(document.createElement("br"));
      }
    });
    return fragment;
  },

  _triggerEvent(handlerName) {
    if (typeof this.eventHandlers[handlerName] == "function") {
      this.eventHandlers[handlerName](this.properties.value);
    }
  },
  _toggleCapsLock() {
    this.properties.capsLock = !this.properties.capsLock;

    for (const key of this.elements.keys) {
      if (key.childElementCount === 0) {
        key.textContent = this.properties.capsLock
          ? key.textContent.toUpperCase()
          : key.textContent.toLowerCase();
      }
    }
  },
  open(initialValue, oninput, onclose) {
    this.properties.value = initialValue || "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.remove("keyboard--hidden");
  },
  close() {
    this.properties.value = "";
    this.eventHandlers.oninput = oninput;
    this.eventHandlers.onclose = onclose;
    this.elements.main.classList.add("keyboard--hidden");
  },
};

window.addEventListener("DOMContentLoaded", function () {
  Keyboard.initials();
});
