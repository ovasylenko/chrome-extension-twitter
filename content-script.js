chrome.runtime.onMessage.addListener(function (msg, sender) {
  if (msg == "toggle") {
    toggle()
  }
})

const iframe = document.createElement("iframe")
iframe.style.background = "white"
iframe.style.height = "100%"
iframe.style.width = "0px"
iframe.style.position = "fixed"
iframe.style.top = "0px"
iframe.style.right = "0px"
iframe.style.zIndex = "9000000000000000000"
iframe.src = chrome.runtime.getURL("popup.html")

document.body.appendChild(iframe)

function addButtons() {
  Array.from(document.querySelectorAll("*[data-testid=tweet]")).forEach(
    (it) => {
      const threeDots = it.querySelector("[aria-label=More]")
      const buttonElem = document.createElement("button")
      buttonElem.innerText = "Hi there"
      buttonElem.className = "bookmakers"

      buttonElem.onclick = function () {
        chrome.runtime.sendMessage(null, {
          type: "addTweet",
          html: it.outerHTML,
        })

        // this.parentElement.remove()
      }

      // nullish coalliscing
      threeDots?.parentElement?.appendChild(buttonElem)
    }
  )
}
function removeButtons() {
  Array.from(document.querySelectorAll(".bookmakers")).forEach((it) => {
    it.remove()
  })
}

function setLinks() {
  const links = [
    ...Array.from(document.querySelectorAll("link")),
    ...Array.from(document.querySelectorAll("style")),
    ...Array.from(document.querySelectorAll("meta")),
  ]
    .map((it) => it.outerHTML)
    .filter((it) => it.indexOf(".js") === -1)
    .join("")

  chrome.runtime.sendMessage(null, {
    type: "addLinks",
    html: links,
    bodyStyle: document.querySelector("body").getAttribute("style"),
  })
}

function setParents() {
  chrome.runtime.sendMessage(null, {
    type: "setParents",
    parents: getParentClasses(),
  })
}

function getParentClasses() {
  let elem = document.querySelector("*[data-testid=tweet]")
  const parents = [["tweet-feed"]]
  while (elem.parentNode && elem.parentNode.nodeName.toLowerCase() != "body") {
    elem = elem.parentNode
    parents.push(Array.from(elem.classList.values()))
  }

  return parents.filter((it) => it.length > 0).map((it) => it.join(" "))
}
function toggle() {
  if (iframe.style.width == "0px") {
    addButtons()
    iframe.style.width = "400px"
  } else {
    iframe.style.width = "0px"
    removeButtons()
  }
}
setTimeout(setLinks, 3000)

setTimeout(setParents, 3000)
