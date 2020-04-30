// This is to explore what goes on under the hood with promises

// So here is a simple promise that just resolves and returns the string "resolved"
a = new Promise((res, rej) => {
  res("resolved")
})

// Here is an example of the promise executing
// We log the data returned from the promise
a.then(data => console.log(`Resolved with: ${data}`))

// Here is a promise that will reject
b = new Promise((res, rej) => {
  rej("rejected")
})

// Let's inspect it now
b.then(data => console.log(`Resolved rejected promise with: ${data}`))
  .catch(err => console.log(`Failed because: ${err}`))

// These logs will print before the promise then calls due to the event loop and how promises queue their calls
console.log(a)
console.log(b)


// Now let's introduce a delay
c = new Promise((res, rej) => {
  setTimeout(() => res("timeout resolved"), 1000)
})

c.then(data => console.log(`resolved timeout with: ${data}`))

// Let's inspect that timeout
console.log(c)
