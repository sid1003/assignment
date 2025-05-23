class CheckoutSystem {
    constructor(numCheckouts = 3) {
        this.checkouts = Array(numCheckouts).fill().map(() => []);
        this.initUI();
    }
    
    initUI() {
        const checkoutsContainer = document.getElementById('checkouts');
        checkoutsContainer.innerHTML = '';
        
        this.checkouts.forEach((queue, index) => {
            const checkoutDiv = document.createElement('div');
            checkoutDiv.className = 'checkout';
            checkoutDiv.id = `checkout-${index}`;
            
            const header = document.createElement('div');
            header.className = 'checkout-header';
            header.textContent = `Counter ${index + 1}`;
            
            const customerCount = document.createElement('div');
            customerCount.className = 'customer-count';
            
            const itemsList = document.createElement('div');
            itemsList.className = 'items-list';
            
            const totalItems = document.createElement('div');
            totalItems.className = 'total-items';
            
            checkoutDiv.appendChild(header);
            checkoutDiv.appendChild(customerCount);
            checkoutDiv.appendChild(itemsList);
            checkoutDiv.appendChild(totalItems);
            
            checkoutsContainer.appendChild(checkoutDiv);
            this.updateCheckoutUI(index);
        });
        
        document.getElementById('addCustomer').addEventListener('click', () => {
            const itemCountInput = document.getElementById('itemCount');
            const itemCount = parseInt(itemCountInput.value);
            
            if (itemCount > 0) {
                this.addCustomer(itemCount);
                itemCountInput.value = '';
            } else {
                alert('Please enter a valid number of items (at least 1)');
            }
        });
    }
    
    findBestCheckout() {
        let minItems = Infinity;
        let bestIndex = 0;
        
        this.checkouts.forEach((queue, index) => {
            const total = queue.reduce((sum, item) => sum + item, 0);
            if (total < minItems) {
                minItems = total;
                bestIndex = index;
            }
        });
        
        return bestIndex;
    }
    
    addCustomer(itemCount) {
        const checkoutIndex = this.findBestCheckout();
        this.checkouts[checkoutIndex].push(itemCount);
        this.updateCheckoutUI(checkoutIndex);
    }
    
    updateCheckoutUI(index) {
        const queue = this.checkouts[index];
        const checkoutDiv = document.getElementById(`checkout-${index}`);
        const itemsList = checkoutDiv.querySelector('.items-list');
        const customerCount = checkoutDiv.querySelector('.customer-count');
        const totalItems = checkoutDiv.querySelector('.total-items');
        
        itemsList.innerHTML = '';
        queue.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'customer-item';
            itemDiv.textContent = `${item} items`;
            itemsList.appendChild(itemDiv);
        });
        
        const total = queue.reduce((sum, item) => sum + item, 0);
        customerCount.textContent = `${queue.length} customer${queue.length !== 1 ? 's' : ''}`;
        totalItems.textContent = `Total items: ${total}`;
    }
}

class OptimizedCheckoutSystem {
  constructor(numCheckouts = 3) {
    this.checkouts = Array(numCheckouts).fill().map(() => []); // Queues for each checkout
    this.heap = new MinHeap((a, b) => 
      a.totalItems < b.totalItems || 
      (a.totalItems === b.totalItems && a.checkoutIndex < b.checkoutIndex)
    );

    // Initialize heap with each checkout (totalItems: 0)
    for (let i = 0; i < numCheckouts; i++) {
      this.heap.insert({ totalItems: 0, checkoutIndex: i });
    }

    this.initUI(); // Initialize the UI (same as original)
  }

  addCustomer(itemCount) {
    // 1. Extract the best checkout from the heap
    const minNode = this.heap.extractMin();
    const checkoutIndex = minNode.checkoutIndex;

    // 2. Update the queue in `this.checkouts`
    this.checkouts[checkoutIndex].push(itemCount);
    minNode.totalItems += itemCount;

    // 3. Reinsert the updated node back into the heap
    this.heap.insert(minNode);

    // 4. Update the UI for the modified checkout
    this.updateCheckoutUI(checkoutIndex); // Same function as before!
  }

  // --- UI Functions (unchanged) ---
  updateCheckoutUI(index) {
    const queue = this.checkouts[index];
    const checkoutDiv = document.getElementById(`checkout-${index}`);
    const itemsList = checkoutDiv.querySelector('.items-list');
    const customerCount = checkoutDiv.querySelector('.customer-count');
    const totalItems = checkoutDiv.querySelector('.total-items');

    // Clear and rebuild the UI for this checkout
    itemsList.innerHTML = '';
    queue.forEach(item => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'customer-item';
      itemDiv.textContent = `${item} items`;
      itemsList.appendChild(itemDiv);
    });

    // Update summary
    customerCount.textContent = `${queue.length} customer${queue.length !== 1 ? 's' : ''}`;
    totalItems.textContent = `Total items: ${minNode.totalItems}`; // From the heap node!
  }

  initUI() { /* Same as original */ }
}

// Initialize the system with 3 checkouts (can be changed)
const checkoutSystem = new CheckoutSystem(3);