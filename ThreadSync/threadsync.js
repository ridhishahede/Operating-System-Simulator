// Thread class
class Thread {
    constructor(id, mutex) {
      this.id = id;
      this.mutex = mutex;
    }
  
    async run() {
      // Acquire the mutex lock
      await this.mutex.lock();
  
      // Perform the critical section (synchronized code)
      console.log(`Thread ${this.id}: Entered critical section`);
      // Perform operations that require synchronization
  
      // Delay for a short period of time
      await delay(1000);
  
      // Release the mutex lock
      this.mutex.unlock();
  
      // Print a message after releasing the lock
      console.log(`Thread ${this.id}: Released mutex lock`);
    }
  }
  
  // Mutex class
  class Mutex {
    constructor() {
      this.locked = false;
      this.waitingQueue = [];
    }
  
    async lock() {
      if (this.locked) {
        await new Promise(resolve => {
          // If the mutex is already locked, add the resolve function to the waiting queue
          this.waitingQueue.push(resolve);
        });
      } else {
        // Otherwise, acquire the lock immediately
        this.locked = true;
      }
    }
  
    unlock() {
      if (this.waitingQueue.length > 0) {
        // If there are waiting threads, resolve the promise for the next thread in the waiting queue
        const nextResolve = this.waitingQueue.shift();
        nextResolve();
      } else {
        // Otherwise, release the lock
        this.locked = false;
      }
    }
  }
  
  // Utility function to introduce a delay using setTimeout
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // Create a mutex instance
  const mutex = new Mutex();
  
  // Create multiple threads and run them
  async function runThreads() {
    const thread1 = new Thread(1, mutex);
    const thread2 = new Thread(2, mutex);
    const thread3 = new Thread(3, mutex);
  
    // Run the threads sequentially with a small delay between them
    await thread1.run();
    await delay(1000);
    await thread2.run();
    await delay(1000);
    await thread3.run();
  }
  
  // Start running the threads
  runThreads();
  