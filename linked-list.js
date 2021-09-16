/** Node: node for a singly linked list. */

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

/** LinkedList: chained together nodes. */

class LinkedList {
  constructor(vals = []) {
    this.head = null;
    this.tail = null;
    this.length = 0;

    for (let val of vals) this.push(val);
  }

  /** HELPER: getNode(idx): Get a node
   * This is different from getAt. getAt returns a value while getNode returns the node
   */

  getNode(idx) {
    let node = this.head
    let count = 0

    while (node !== null && count !== idx) {
      count++
      node = node.next
    }

    return node
  }

  /** push(val): add new value to end of list. */

  push(val) {
    const newNode = new Node(val)
    if (!this.head) {
      this.head = newNode
      this.tail = newNode
    } else {
      this.tail.next = newNode
      this.tail = newNode
    }
    this.length++
  }

  /** unshift(val): add new value to start of list. */

  unshift(val) {
    const newNode = new Node(val)
    if (!this.head) {
      this.head = newNode
    } else {
      newNode.next = this.head
      this.head = newNode
    }
    if (this.length === 0) this.tail = this.head
    this.length++
  }

  /** pop(): return & remove last item. */

  pop() {
    return this.removeAt(this.length - 1)
  }

  /** shift(): return & remove first item. */

  shift() {
    return this.removeAt(0)
  }

  /** getAt(idx): get val at idx. */

  getAt(idx) {
    if (idx < 0 || idx > this.length - 1) throw new Error("Invalid index")

    return this.getNode(idx).val
  }

  /** setAt(idx, val): set val at idx to val */

  setAt(idx, val) {
    if (idx < 0 || idx > this.length - 1) throw new Error("Invalid index")

    const node = this.getNode(idx)
    node.val = val
  }

  /** insertAt(idx, val): add node w/val before idx. */

  insertAt(idx, val) {
    if (idx < 0 || idx > this.length) throw new Error("Invalid index")

    if (idx === 0) return this.unshift(val)
    if (idx === this.length) return this.push(val)

    const prev = this.getNode(idx - 1)

    const newNode = new Node(val)
    newNode.next = prev.next
    prev.next = newNode

    this.length++
  }

  /** removeAt(idx): return & remove item at idx, */

  removeAt(idx) {
    if (idx < 0 || idx >= this.length) throw new Error('Invalid index')

    // delete first element
    if (idx === 0) {
      const val = this.head.val
      this.head = this.head.next
      this.length--
      if (this.length < 2) this.tail = this.head
      return val
    }

    const prev = this.getNode(idx - 1)
    // delete last element
    if (idx === this.length - 1) {
      const val = prev.next.val
      prev.next = null
      this.tail = prev
      this.length--
      return val
    }

    // all other cases
    const val = prev.next.val
    prev.next = prev.next.next
    this.length--
    return val
  }

  /** average(): return an average of all values in the list */

  average() {
    if (this.length === 0) return 0
    let sum = 0;
    let curr = this.head

    while (curr) {
      sum += curr.val
      curr = curr.next
    }

    return sum / this.length
  }
}

module.exports = LinkedList;
