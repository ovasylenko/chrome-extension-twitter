chrome.runtime.onMessage.addListener(function (msg, sender, cb, options) {
  if (msg?.type === "addTweet") {
    const fragment = new DOMParser().parseFromString(msg.html, "text/html")

    document
      .getElementsByClassName("tweet-feed")[0]
      .appendChild(fragment.body.firstChild)
  }

  if (msg?.type === "addLinks") {
    const fragment = new DOMParser().parseFromString(msg.html, "text/html")
    const head = document.getElementsByTagName("head")[0]
    Array.from(fragment.head.children).forEach((it) => head.appendChild(it))
    document.body.setAttribute("style", msg.bodyStyle)
  }

  if (msg?.type === "setParents") {
    let root = null
    let currentElement = null
    msg.parents.reverse().forEach((className) => {
      let newElement = document.createElement("div")
      newElement.className = className
      if (root === null) {
        root = newElement
      } else {
        currentElement.appendChild(newElement)
      }
      currentElement = newElement
    })

    document.getElementById("root").appendChild(root)
  }
})
