/* Here is an implementation of JS Promises
 * console.log statements are scattered around to provide a glimpse into how things ran
 */
const PENDING = "pending"
const REJECTED = "rejected"
const RESOLVED = "resolved"

class MyPromise {
  /**
   * The constructor creates variables to hold state, bind functions so they all have access to `this`, and
   * tries to execute the function given to it
   * The function argument given expects the function to have two callbacks: resolve and reject
   * Here we pass our own resolve and reject functions which update the class's state
   * At the end of it, return the object itself so we can chain more functions off of it
   */
  constructor(func) {
    console.log("Constructing")

    this.data = null
    this.error = null
    this.state = PENDING
    
    this.resolve = this.resolve.bind(this)
    this.reject = this.reject.bind(this)
    this.then = this.then.bind(this)
    this.catch = this.catch.bind(this)

    try {
      console.log("Executing function")
      func(this.resolve, this.reject)
      console.log("Done executing function and returning `this`")
    } catch(e) {
      console.log("Rejecting")
      this.reject(e)
      console.log("Done rejecting")
    }
    return this
  }

  /**
   * The resolve function takes whatever was passed into it and sets it as the Promise object's data property
   * The sate is also set to "resolved"
   * The Promise object itself is returned to allow functions to be chained to it through `then`
   */
  resolve(data) {
    console.log(`resolving inner with data: ${data}`)
    this.state = RESOLVED
    this.data = data
    console.log("In resolve returning this:")
    console.log(this)
    return this
  }

  /**
   * The reject function takes whatever was passed into it and sets it as the Promise object's error property
   * The sate is also set to "rejected"
   * The Promise object itself is returned to allow functions to be chained to it through `then`
   */
  reject(error) {
    console.log("rejecting inner")
    console.error(error)
    this.state = REJECTED
    this.error = error
    return this
  }

  /**
   * This function calls whatever functiotn was passed into it with the Promise object's data property IF the Promise
   * is in a "resolved" state
   * No matter what though the Promise object is returned to allow other functions to chain off of it
   */
  then(cb) {
    console.log("In then")
    if (this.state === RESOLVED) {
      console.log("In then - success")
      cb(this.data)
    }
    return this
  }

  /**
   * This function calls whatever functiotn was passed into it with the Promise object's error property IF the Promise
   * is in a "rejected" state
   * No matter what though the Promise object is returned to allow other functions to chain off of it
   */
  catch(cb) {
    console.log("In catch")
    if (this.state === REJECTED) {
      console.log("In catch - rejected")
      cb(this.error)
    }
  }
}

function ResFunc(res, rej) {
  res("+++resolved+++")
}
a = new MyPromise(ResFunc)
a.then(data => { console.log(`then called with ${data}`) })

function RejFunc(res, rej) {
  rej("---rejected---")
}
b = new MyPromise(RejFunc)
b.then(data => { console.log(`RejFunc resolved with: ${data}`) })
  .catch(e => console.error(e))
