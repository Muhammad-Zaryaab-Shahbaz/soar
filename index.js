const mainContainer = document.querySelector("#main-content");
const body = document.querySelector(".body");
let screen = 1;

// screen utitlties
const screenShow = num => {
  screen = num;
  modulesHandler();
};

const answers = {
  screen1: [
    { id: 21, message: "Create Case Ticket", answer: true },
    { id: 22, message: "Assign Case Ticket", answer: true },
    { id: 23, message: "Communicate Case Ticket", answer: true },
    { id: 24, message: "Update Case Ticket", answer: true },
    { id: 25, message: "Delete Case Ticket", answer: false },
  ],
  screen2: [
    { id: 31, message: "Fetch New Incident Alerts", answer: true },
    { id: 32, message: "Set Fetch Intervals", answer: true },
    { id: 33, message: "Failed Fetch Notifications", answer: true },
    { id: 34, message: "Discard Old Alerts", answer: false },
  ],
  screen3: [
    {
      id: 1,
      message: "Extract Domains",
      answer: true,
      subHeading: "Conduct Whois Lookup",
    },
    {
      id: 3,
      message: "Extract URLs",
      answer: true,
      subHeading: "Submit to VirusTotal",
    },
    {
      id: 5,
      message: "Extract IPs",
      answer: true,
      subHeading: "Submit to VirusTotal",
    },
    { id: 7, message: "Analyst Extraction", answer: false },
  ],
  screen4: [
    { id: 11, message: "Reputation Results Output", answer: true },
    { id: 12, message: "Sandbox Testing", answer: true },
    { id: 13, message: "Analyst Validation", answer: true },
  ],
  screen5: [
    { id: 41, message: "Block Domains", answer: true },
    { id: 42, message: "Block IPs", answer: true },
    { id: 46, message: "Block URLs", answer: true },
    { id: 43, message: "Update Case Tickets", answer: true },
    { id: 44, message: "Analyst Approve COA", answer: true },
  ],
};
let instruction =
  "The objective is to simulate the actions of automating a SOC environment through toggling various settings. ";
instruction +=
  "You will have to enable/disable in order to get the right combination of events to activate the flowchart.";
const infomationIcons = () => {
  document.querySelector(".info-container").addEventListener("click", () => {
    popupOffical("Instructions", instruction, "");
  });
  document.querySelector(".check-container").addEventListener("click", () => {
    checkListPopup();
  });
};
const checkListPopup = () => {
  const html = `
  <div class="fixed top-0 left-0  w-full  min-h-screen  flex justify-center items-center  popup-checklist overflow-hidden">
  <div class="w-[580px]   m-r-auto -mt-10  border rounded-lg popUp opacity-100 slide-bottom popup-checklist-container">
      <div class="flex items-center justify-between border-b py-3 px-5">
          <h1 class="font-heading">Check List</h1>
         <i class="fa-solid fa-xmark  cursor-pointer text-2xl opacity-60 hover:opacity-100 popup-close "></i>
      </div>
      <div class="flex items-center justify-between  py-2 relative">
          <div class="check-lists check-1"><i class="fa-solid fa-check"></i></div>
          <div class="check-lists check-2"><i class="fa-solid fa-check"></i></div>
          <div class="check-lists check-3"><i class="fa-solid fa-check"></i></div>
          <div class="check-lists check-4"><i class="fa-solid fa-check"></i></div>

          <img src="./assests/images/checklist.png" class="w-full h-full"/>
      </div>
  </div>
</div>
  `;

  body.insertAdjacentHTML("afterbegin", html);
  mainContainer.style.filter = "blur(5px)";

  const popup = document.querySelector(".popup-checklist");
  authenticateCheckList();
  popup.addEventListener("click", e => {
    const classes = Array.from(e.target.classList);
    if (
      classes.includes("popup-close") ||
      classes.includes("popup-checklist")
    ) {
      mainContainer.style.filter = "none";
      popup.remove();
    }
  });
};
const authenticateCheckList = () => {
  const checks = [screenMatch1, screenMatch2, screenMatch3, screenMatch5];
  checks.forEach((bool, i) => {
    if (bool) {
      document.querySelector(`.check-${i + 1}`).style.display = "block";
    }
  });
};
infomationIcons();
let dataSet = {
  screen1: {
    heading: "Case Management Settings",
    heading2: "Integrate Case Management",
    options: [
      { id: 21, message: "Create Case Ticket", answer: false },
      { id: 22, message: "Assign Case Ticket", answer: false },
      { id: 23, message: "Communicate Case Ticket", answer: false },
      { id: 24, message: "Update Case Ticket", answer: false },
      { id: 25, message: "Delete Case Ticket", answer: false },
    ],
  },
  screen2: {
    heading: "Threat Intelligence Feeds",
    heading2: "Integrate Threat Intel",
    options: [
      { id: 31, message: "Fetch New Incident Alerts", answer: false },
      { id: 32, message: "Set Fetch Intervals", answer: false },
      { id: 33, message: "Failed Fetch Notifications", answer: false },
      { id: 34, message: "Discard Old Alerts", answer: false },
    ],
  },
  screen3: {
    heading: "Incident Data Extraction",
    heading2: "Extract Threat",
    options: [
      {
        id: 1,
        message: "Extract Domains",
        answer: false,
        subHeading: "Conduct Whois Lookup",
      },
      {
        id: 3,
        message: "Extract URLs",
        answer: false,
        subHeading: "Submit to VirusTotal",
      },
      {
        id: 5,
        message: "Extract IPs",
        answer: false,
        subHeading: "Submit to VirusTotal",
      },
      { id: 7, message: "Analyst Extraction", answer: false },
    ],
  },
  screen4: {
    heading: " Reputation Checks",
    heading2: "",
    options: [
      { id: 11, message: "Reputation Results Output", answer: false },
      { id: 12, message: "Sandbox Testing", answer: false },
      { id: 13, message: "Analyst Validation", answer: false },
    ],
  },
  screen5: {
    heading: "Course of Action",
    heading2: "",
    options: [
      { id: 41, message: "Block Domains", answer: false },
      { id: 42, message: "Block IPs", answer: false },
      { id: 46, message: "Block URLs", answer: false },
      { id: 43, message: "Update Case Tickets", answer: false },
      { id: 44, message: "Analyst Approve COA", answer: false },
    ],
  },
};

// offical popup
const popupOffical = (heading, message, str) => {
  if (document.querySelector(".popup-offical")) {
    document.querySelector(".popup-offical").remove();
  }

  let button = `
  <div class="btn-container-2 click-button z-10 w-full p-[1rem] pt-[0rem] m-auto ">
    <button class="py-2 px-4 popup-remove">${str}</button>
  </div>
  `;

  const html = `
  <div class="fixed top-0 left-0  w-full  min-h-screen z-100 flex justify-center items-center  popup-offical overflow-hidden">
    <div class="w-[580px]  md:[666px] m-r-auto -mt-10  border rounded-lg popUp opacity-100 slide-bottom popup-offical-container">
        <div class="flex items-center justify-between py-3 px-5  border-b">
            <h2 class="text-2xl font-bold">${heading}</h2>
            <i class="fa-solid fa-xmark cursor-pointer text-2xl opacity-60 hover:opacity-100 popup-close" ></i>
        </div>
        <div class="py-5 px-5">${message}</div>
        ${str !== "" ? button : ""}
    </div>
</div>
  `;

  body.insertAdjacentHTML("afterbegin", html);
  mainContainer.style.filter = "blur(2px)";
  document.querySelector(".popup-close").addEventListener("click", () => {
    document.querySelector(".popup-offical").remove();
    mainContainer.style.filter = "none";
  });
  if (document.querySelector(".popup-remove")) {
    document.querySelector(".popup-remove").addEventListener("click", () => {
      document.querySelector(".popup-offical").remove();
      mainContainer.style.filter = "none";
      if (str === "Restart") setTimeout(() => location.reload(), 1000);
    });
  }
};
const popupOfficalFlag = () => {
  if (document.querySelector(".popup-offical")) {
    document.querySelector(".popup-offical").remove();
  }

  const html = `
  <div class="fixed top-0 left-0  w-full  min-h-screen z-100 flex justify-center items-center  popup-offical overflow-hidden">
    <div class="w-[580px]  md:[666px] m-r-auto -mt-10  border rounded-lg popUp opacity-100 slide-bottom popup-offical-container">
        <div class="flex items-center justify-between py-3 px-5  border-b">
            <h2 class="text-2xl font-bold">Flag</h2>
            <i class="fa-solid fa-xmark cursor-pointer text-2xl opacity-60 hover:opacity-100 popup-close" ></i>
        </div>
        <div class="py-5 px-5 flex items-center justify-between relative pt-4">
          <small class="absolute hidden -top-3 rounded left-[42%] bg-light p-1 copy-container">Copy to clipboard</small>
          <p id="text-to-copy">THM{AUT0M@T1N6_S3CUR1T¥}<p>
          <button class="copy-button">
             <i class="fa-solid fa-copy"></i>
          </button>
        </div>
    </div>
</div>
  `;

  body.insertAdjacentHTML("afterbegin", html);
  mainContainer.style.filter = "blur(2px)";

  const copyButton = document.querySelector(".copy-button");
  copyButton.addEventListener("click", () => {
    const textToCopy = document.getElementById("text-to-copy").innerText;
    copyMessage.innerHTML = "Copied!";
    copyMessage.style.display = "block";
    navigator.clipboard.writeText(textToCopy);
  });
  const copyMessage = document.querySelector(".copy-container");
  copyButton.addEventListener("mousemove", () => {
    copyMessage.style.display = "block";
    copyMessage.innerHTML = "Copy to clipboard";
  });
  copyButton.addEventListener(
    "mouseleave",
    () => (copyMessage.style.display = "none")
  );

  document.querySelector(".popup-close").addEventListener("click", () => {
    document.querySelector(".popup-offical").remove();
    mainContainer.style.filter = "none";
    setTimeout(() => {
      location.reload();
    }, 1000);
  });
};

const showDelayedMsg = (container, message) => {
  return new Promise(resolve => {
    setTimeout(() => {
      container.innerHTML = message;
      resolve();
    }, 1000);
  });
};

let isLoading = true;
const screenMessageShow = async (str, error = true) => {
  const container = document.querySelector(".screen-messages__container");
  let message;

  if (error) {
    container.classList.add("error");
  }

  if (!str) {
    message = `
  <h1 class="screen-message text-center message text-xl green-light">Adopt a SOAR and set up automation workflows that will help you in your security
  investigations.</h1>
  `;
    container.classList.remove("error");
    container.insertAdjacentHTML("afterbegin", message);
    return;
  }

  // if (isLoading && checkScreenSettingAuth()) {
    message = `<h1 class="text-center message text-xl green-light screen-message">Loading</h1>`;
    container.innerHTML = message;

    const messageContainer = document.querySelector(".screen-message");
    await showDelayedMsg(messageContainer, "Loading .");
    await showDelayedMsg(messageContainer, "Loading ..");
    await showDelayedMsg(messageContainer, "Loading ...");
  // }

  isLoading = false;
  message = `<h3 class="text-center message text-xl screen-message">${str}</h3>`;
  container.innerHTML = message;
};
// Second screen temp/handler
const firstScreenTemp = () => {
  const html = `
  <div class=" postion-center">
    <div class="screen-messages">
      <div class="screen-messages__container typing-slider error">
      </div>
    </div>
    <div class="m-auto flex items-center justify-between relative  w-[645px] md:w-[660px] main-image-container overflow-hidden" onmousemove="perimeterMouseover(event)">
      <img class="main-image-container__bg" src="./assests/images/room-image.png" alt="main-image" />
      <div id="movement" class="opacity-0">
      <i class="fas fa-file"></i>
      </div>
     
      <img id="screen-1" class="main-image-container__overlay screens w-full" src="./assests/images/screen-1.png" alt="cover-image"/>
      <img id="screen-2" class="main-image-container__overlay screens w-full" src="./assests/images/screen-2.png" alt="cover-image"/>
      <img id="screen-3" class="main-image-container__overlay screens w-full" src="./assests/images/screen-3.png" alt="cover-image"/>
      <img id="screen-4" class="main-image-container__overlay screens w-full" src="./assests/images/screen-4.png" alt="cover-image"/>
      <img id="screen-5" class="main-image-container__overlay screens w-full" src="./assests/images/screen-5.png" alt="cover-image"/>
      <img id="run" class="main-image-container__overlay  w-full" src="./assests/images/run.png" alt="run-image"/>

      <div class="tooltips">
        <div class="tooltips__tips" id="tooltips__tips"><h5>Use the settings to Integrate Case Management Workflow.</h5></div>
        <div class="tooltips__tips" id="tooltips__tips"><h5>Use the settings to Integrate Threat Intel Workflow.</h5></div>
        <div class="tooltips__tips" id="tooltips__tips"><h5>Use the settings to Extract Threats.</h5></div>
        <div class="tooltips__tips" id="tooltips__tips"><h5>Use the settings to Perform Reputation Checks.</h5></div>
        <div class="tooltips__tips" id="tooltips__tips"><h5>Use the settings to Set the Course of Actions.</h5></div>
      </div>
    </div>
</div>
      `;

  return html;
};
const firstScreenHandler = () => {
  const temp = firstScreenTemp();
  mainContainer.innerHTML = "";
  mainContainer.insertAdjacentHTML("afterbegin", temp);
  popupOffical("Instructions", instruction, "Let's Proceed!");
  screenMessageShow(null, false);
  const allScreen = document.querySelectorAll(".screens");
  allScreen.forEach((elem, i) =>
    elem.addEventListener("click", () => {
      const html = popupShowScreens(dataSet[`screen${i + 1}`]);
      setScreenSettingAuth(`screen${i + 1}`);
      mainContainer.insertAdjacentHTML("afterbegin", html);
      const buttonsOnOff = document.querySelectorAll(".buttons");
      buttonsOnOff.forEach(el =>
        el.addEventListener("click", e => showImagesAndCheckAnwe(e, i + 1))
      );
    })
  );
};

// checking resuts
const closeModal = () => {
  if (document.querySelector(".popup-container")) {
    document.querySelector(".popup-container").remove();
  }
};
const checkItems = item => {
  const image = `
      <div class="w-14 h-20 ">
        <img src="./assests/images/button-${
          item.answer === true ? "on" : "off"
        }.png" alt="switch-image" class="switch w-full h-full buttons cursor-pointer" id="button-${
    item.id
  }"/>
      </div>
  `;

  const html = `
  <div class="flex items-center w-full gap-2">
  ${item.answer === true || item.answer === false ? image : ""}
  <div class="flex flex-col">
     <label  for="id-${item.id}">${item.message}</label>
     <small> ${item.subHeading ? item.subHeading : ""} </small>
  </div>
</div>
  `;
  return html;
};
const popupShowScreens = data => {
  if (document.querySelector(".popup-container")) {
    document.querySelector(".popup-container").remove();
  }

  const entries = data.options.map(el => checkItems(el));

  const html = `
  <div class=" w-full  z-40 flex justify-center items-center popup-container opacity-90 postion-center">
  <div style="background:#212c42" class="w-[645px] md:w-[660px] m-r-auto border rounded-lg popUp slide-bottom  overflow-hidden ">
    <h3  class="heading text-2xl text-center p-3" style="background:#151c2b">${
      data.heading
    }</h3>
    <div class="grid grid-cols-2 flex-col gap-x-[50px] gap-y-[10px] my-4 px-8">
     ${entries.join("")}
    </div>
    <div class="btn-container-2 click-button z-10 w-1/2 m-auto mb-8">
      <button class="py-2 px-4" onClick="closeModal()">Ok</button>
    </div>
    </div>
</div>
  `;
  return html;
};

const showImagesAndCheckAnwe = (e, index) => {
  const id = +e.target.id.split("-")[1];

  dataSet[`screen${index}`].options.forEach((el, i) => {
    if (el.id === id) {
      if (el.answer) {
        dataSet[`screen${index}`].options[i].answer = false;
        e.target.src = "./assests/images/button-off.png";
      } else {
        el.answer = true;
        dataSet[`screen${index}`].options[i].answer = true;
        e.target.src = "./assests/images/button-on.png";
      }
    }
  });
};

// to check the is within coordinates
const screen1Coords = [{ x: [143, 195], y: [166, 211] }];
const screen2Coords = [{ x: [222, 286], y: [183, 222] }];
const screen3Coords = [{ x: [304, 391], y: [180, 241] }];
const screen4Coords = [{ x: [400, 501], y: [181, 260] }];
const screen5Coords = [{ x: [517, 639], y: [184, 278] }];

const runCoords = [{ x: [286, 374], y: [247, 291] }];
const toggleZIndex = (elem, value = false, tooltip) => {
  let zIndex = "-1";
  let display = "none";

  if (value) {
    zIndex = "1";
    display = "block";
  }

  if (elem.style.zIndex !== zIndex) {
    elem.style.zIndex = zIndex;
  }
  if (tooltip) {
    if (tooltip.style.display !== display) {
      tooltip.style.display = display;
    }
  }
};

const perimeterMouseover = event => {
  const { offsetX, offsetY } = event;
  const base = { offsetX, offsetY };
  const screen1Image = document.getElementById("screen-1");
  const screen2Image = document.getElementById("screen-2");
  const screen3Image = document.getElementById("screen-3");
  const screen4Image = document.getElementById("screen-4");
  const screen5Image = document.getElementById("screen-5");
  const runImage = document.querySelector("#run");
  const allToolTips = document.querySelectorAll("#tooltips__tips");

  if (isWithin(base, screen1Coords)) {
    toggleZIndex(screen1Image, true, allToolTips[0]);
    return;
  } else {
    toggleZIndex(screen1Image, false, allToolTips[0]);
  }
  if (isWithin(base, screen2Coords)) {
    toggleZIndex(screen2Image, true, allToolTips[1]);
    return;
  } else {
    toggleZIndex(screen2Image, false, allToolTips[1]);
  }

  if (isWithin(base, screen3Coords)) {
    toggleZIndex(screen3Image, true, allToolTips[2]);
    return;
  } else {
    toggleZIndex(screen3Image, false, allToolTips[2]);
  }

  if (isWithin(base, screen4Coords)) {
    toggleZIndex(screen4Image, true, allToolTips[3]);
    return;
  } else {
    toggleZIndex(screen4Image, false, allToolTips[3]);
  }

  if (isWithin(base, screen5Coords)) {
    toggleZIndex(screen5Image, true, allToolTips[4]);
    return;
  } else {
    toggleZIndex(screen5Image, false, allToolTips[4]);
  }

  if (isWithin(base, runCoords)) {
    toggleZIndex(runImage, true);
    runImage.addEventListener("click", matchResultMovement);
    return;
  } else {
    toggleZIndex(runImage, false);
  }
  return;
};

const isWithin = (event, coords) => {
  const { offsetX, offsetY } = event;
  if (typeof coords[0] === "number") {
    // [x1, x2, y1, y2]
    return (
      offsetX >= coords[0] &&
      offsetX <= coords[1] &&
      offsetY >= coords[2] &&
      offsetY <= coords[3]
    );
  }

  let within = false;
  for (let coord of coords) {
    const x = coord.x;
    const y = coord.y;
    if (
      offsetX >= x[0] &&
      offsetX <= x[1] &&
      offsetY >= y[0] &&
      offsetY <= y[1]
    ) {
      within = true;
      break;
    }
  }

  return within;
};

// validating the result
const compare = (arr1, arr2) => {
  return JSON.stringify(arr1) === JSON.stringify(arr2);
};
const setScreenSettingAuth = str => {
  if (str === "screen1") {
    screenMatch1 = true;
  } else if (str === "screen2") {
    screenMatch2 = true;
  } else if (str === "screen3") {
    screenMatch3 = true;
  } else if (str === "screen4") {
    screenMatch4 = true;
  } else if (str === "screen5") {
    screenMatch5 = true;
  } else {
    return;
  }
  return;
};

let screenMatch1 = false;
let screenMatch2 = false;
let screenMatch3 = false;
let screenMatch4 = false;
let screenMatch5 = false;

const checkScreenSettingAuth = () => {
  if (
    screenMatch1 &&
    screenMatch2 &&
    screenMatch3 &&
    screenMatch4 &&
    screenMatch5
  ) {
    return true;
  }
  return false;
};
const points = {
  start: {
    top: "17%",
    left: "36%",
  },
  case: {
    left: "43.5%",
    top: "17%",
  },
  threat: {
    left: "50.5%",
    top: "17%",
  },
  data: {
    left: "63%",
    top: "16%",
  },
  reputation: {
    left: "66.5%",
    top: "16%",
  },
  curse: {
    left: "78%",
    top: "17%",
  },
};

const moveFile = (answers, options, stage, prevStage, msg) => {
  return new Promise(resolve => {
    const movement = document.getElementById("movement");
    const file = movement.children[0];

    if (compare(answers, options)) {
      movement.style.left = stage.left;
      movement.style.top = stage.top;
      resolve(true);
      return;
    }

    file.classList.add("wrong");
    movement.style.left = prevStage.left;
    movement.style.top = prevStage.top;
    screenMessageShow(msg);
    resolve(false);
  });
};

function checkArrayExtraction(arr) {
  let falseCount = 0;
  for (let i = 0; i < 3; i++) {
    if (arr[i] === false) {
      falseCount++;
    }
  }
  if (falseCount > 1) {
    return false;
  }
  if (arr[3] !== true) {
    return false;
  }
  return true;
}

const moveFileDataExtraction = (answers, options, stage, prevStage, msg) => {
  return new Promise(resolve => {
    const movement = document.getElementById("movement");
    const file = movement.children[0];

    if (compare(answers, options)) {
      movement.style.left = stage.left;
      movement.style.top = stage.top;
      resolve(true);
      return;
    }

    const opt = [];
    options.forEach(el => opt.push(el.answer));

    if (checkArrayExtraction(opt)) {
      movement.style.left = stage.left;
      movement.style.top = stage.top;
      resolve(true);
      return;
    }

    file.classList.add("wrong");
    movement.style.left = prevStage.left;
    movement.style.top = prevStage.top;
    screenMessageShow(msg);
    resolve(false);
  });
};
const moveFileDataReputation = (
  answers,
  options,
  prevAnswerFourth,
  stage,
  prevStage,
  msg
) => {
  return new Promise(resolve => {
    const movement = document.getElementById("movement");
    const file = movement.children[0];

    if (compare(answers, options) && prevAnswerFourth) {
      movement.style.left = stage.left;
      movement.style.top = stage.top;
      resolve(true);
      return;
    }
    if (
      prevAnswerFourth == false &&
      options[0].answer == true &&
      options[1].answer == false &&
      options[2].answer == false
    ) {
      movement.style.left = stage.left;
      movement.style.top = stage.top;
      resolve(true);
      return;
    }

    file.classList.add("wrong");
    movement.style.left = prevStage.left;
    movement.style.top = prevStage.top;
    screenMessageShow(msg);
    resolve(false);
  });
};

// matching setting movement
const matchResultMovement = async e => {
  if (checkScreenSettingAuth() === false) {
    screenMessageShow(
      "Error: Please complete the Settings in order to activate the flowchart."
    );
    return;
  }
  const movement = document.getElementById("movement");
  const file = movement.children[0];
  file.classList.remove("wrong");
  movement.classList.remove("opacity-0");

  let res = await moveFile(
    answers.screen1,
    dataSet.screen1.options,
    points.case,
    points.start,
    "Error: Case Ticket setting is incorrect."
  );
  if (!res) return;
  res = await moveFile(
    answers.screen2,
    dataSet.screen2.options,
    points.threat,
    points.case,
    "Error: Threat Intel setting is incorrect."
  );
  if (!res) return;

  res = await moveFileDataExtraction(
    answers.screen3,
    dataSet.screen3.options,
    points.data,
    points.threat,
    "Error: Data Extraction setting is incorrect."
  );
  if (!res) return;

  res = await moveFileDataReputation(
    answers.screen4,
    dataSet.screen4.options,
    dataSet.screen3.options[3].answer,
    points.reputation,
    points.data,
    "Error: Reputation Checks setting is incorrect."
  );
  if (!res) return;

  res = await moveFile(
    answers.screen5,
    dataSet.screen5.options,
    points.curse,
    points.reputation,
    "Error: Course of Actions setting is incorrect."
  );
  if (!res) return;

  const container = document.querySelector(".screen-messages__container");
  const msgContainer = document.querySelector(".screen-message");
  container.classList.remove("error");
  msgContainer.classList.add("green-light");
  msgContainer.innerHTML = "Completed!";
  setTimeout(() => popupOfficalFlag(), 2000);
};

// main handler for all modules
function modulesHandler() {
  if (screen === 1) firstScreenHandler();
  else return;
}

modulesHandler();
