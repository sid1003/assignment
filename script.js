// script.js - Hypermarket Checkout System with Min-Heap Optimization

class MinHeap {
  constructor(comparator) {
    this.heap = [];
    this.comparator = comparator;
  }

  insert(node) {
    this.heap.push(node);
    this.heapifyUp();
  }

  extractMin() {
    if (this.size() === 0) return null;
    const min = this.heap[0];
    const last = this.heap.pop();
    if (this.size() > 0) {
      this.heap[0] = last;
      this.heapifyDown();
    }
    return min;
  }

  heapifyUp() {
    let index = this.size() - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.comparator(this.heap[index], this.heap[parentIndex])) {
        [this.heap[index], this.heap[parentIndex]] = [
          this.heap[parentIndex],
          this.heap[index],
        ];
        index = parentIndex;
      } else break;
    }
  }

  heapifyDown() {
    let index = 0;
    while (true) {
      const left = 2 * index + 1;
      const right = 2 * index + 2;
      let smallest = index;
      if (
        left < this.size() &&
        this.comparator(this.heap[left], this.heap[smallest])
      ) {
        smallest = left;
      }
      if (
        right < this.size() &&
        this.comparator(this.heap[right], this.heap[smallest])
      ) {
        smallest = right;
      }
      if (smallest !== index) {
        [this.heap[index], this.heap[smallest]] = [
          this.heap[smallest],
          this.heap[index],
        ];
        index = smallest;
      } else break;
    }
  }

  size() {
    return this.heap.length;
  }
}

class CheckoutSystem {
  constructor(numCheckouts = 3) {
    this.checkouts = Array(numCheckouts)
      .fill()
      .map(() => []);
    this.heap = new MinHeap(
      (a, b) =>
        a.totalItems < b.totalItems ||
        (a.totalItems === b.totalItems && a.checkoutIndex < b.checkoutIndex)
    );

    // Initialize heap with checkout nodes
    for (let i = 0; i < numCheckouts; i++) {
      this.heap.insert({
        totalItems: 0,
        checkoutIndex: i,
      });
    }

    this.initUI();
    this.setupEventListeners();
  }

  initUI() {
    const checkoutsContainer = document.getElementById("checkouts");
    checkoutsContainer.innerHTML = "";

    this.checkouts.forEach((_, index) => {
      const checkoutDiv = document.createElement("div");
      checkoutDiv.className = "checkout";
      checkoutDiv.id = `checkout-${index}`;

      checkoutDiv.innerHTML = `
        <div class="container-top">
            <div class="checkout-header">Counter ${index + 1}</div>
            <div class="customer-count"><i class="fa-solid fa-users"></i>   0 customers</div>
        </div>
        <div class="items-list"></div>
        <div class="total-items">Total items: 0</div>
      `;

      checkoutsContainer.appendChild(checkoutDiv);
    });
  }

  setupEventListeners() {
    document.getElementById("addCustomer").addEventListener("click", () => {
      const itemCountInput = document.getElementById("itemCount");
      const itemCount = parseInt(itemCountInput.value);

      if (itemCount > 0) {
        this.addCustomer(itemCount);
        itemCountInput.value = "";
        itemCountInput.focus();
      } else {
        alert("Please enter a valid number of items (at least 1)");
      }
    });

    // Allow pressing Enter key to add customer
    document.getElementById("itemCount").addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        document.getElementById("addCustomer").click();
      }
    });
  }

  addCustomer(itemCount) {
    const minNode = this.heap.extractMin();
    const checkoutIndex = minNode.checkoutIndex;

    // Add customer to the selected checkout
    this.checkouts[checkoutIndex].push(itemCount);
    minNode.totalItems += itemCount;

    // Reinsert the updated node back into the heap
    this.heap.insert(minNode);

    const prevHighlighted = document.querySelector('.checkout.highlight');
    if (prevHighlighted) {
        prevHighlighted.classList.remove('highlight');
    }

    // Highlight the new checkout
    const newCheckoutDiv = document.getElementById(`checkout-${checkoutIndex}`);
    newCheckoutDiv.classList.add('highlight');
    this.updateCheckoutUI(checkoutIndex);
  }

  highlightCheckout(index) {
    const checkoutDiv = document.getElementById(`checkout-${index}`);
    checkoutDiv.classList.add('highlight');
    
    // Remove highlight after 1 second
    setTimeout(() => {
        checkoutDiv.classList.remove('highlight');
    }, 1000);
}

  updateCheckoutUI(index) {
    const queue = this.checkouts[index];
    const checkoutDiv = document.getElementById(`checkout-${index}`);
    const itemsList = checkoutDiv.querySelector(".items-list");
    const customerCount = checkoutDiv.querySelector(".customer-count");
    const totalItems = checkoutDiv.querySelector(".total-items");

    // Clear and rebuild items list
    itemsList.innerHTML = "";
    queue.forEach((item) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "customer-item";
      itemDiv.innerHTML = `
        <i class="fa-solid fa-cart-shopping"></i>
        <span class="item-count">${item} item${item !== 1 ? 's' : ''}</span>
        `;
      itemsList.appendChild(itemDiv);
    });

    // Update counters
    customerCount.textContent = `${queue.length} customer${
      queue.length !== 1 ? "s" : ""
    }`;
    totalItems.textContent = `Total items: ${queue.reduce(
      (sum, item) => sum + item,
      0
    )}`;
  }
}

// Initialize the system with 3 checkouts (default)
document.addEventListener("DOMContentLoaded", () => {
  const checkoutSystem = new CheckoutSystem(3);
});
