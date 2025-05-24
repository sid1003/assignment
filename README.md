# Hypermarket Checkout Optimization System

Experience the system in action:  
🔗 [Live Demo](https://sid1003.github.io/assignment/)

## Algorithm Description

This system implements an efficient checkout assignment algorithm that:

1. **Dynamically assigns** customers to the checkout counter with the fewest total items
2. Uses a **min-heap (priority queue)** to always select the optimal counter in O(log n) time

<img src="https://github.com/user-attachments/assets/38e3c34b-6ad5-439e-bd4b-b0bef337857e" width="500" alt="Heap visualization">

<img src="https://github.com/user-attachments/assets/a5814489-0641-400e-9f51-bc84d9615a19" width="500" alt="UI screenshot">

3. Provides **real-time visual feedback** showing queue lengths and highlighting active counters

## Time Complexity Analysis

### Core Operations

| Operation | Complexity | Description |
|-----------|------------|-------------|
| `peekMin()` | O(1) | Get counter with shortest queue |
| `addCustomer()` | O(log n) | Update counter and maintain heap |
| UI Update | O(1) | Append-only DOM operations |

Where **n** = number of checkout counters

### Performance Scaling

| Counters | Operations per Assignment |
|----------|--------------------------|
| 5        | ~2-3                     |
| 20       | ~4-5                     |
| 100      | ~6-7                     |

## Key Features

- **Visual highlighting of active counters**  
  The currently active checkout counter is highlighted with a colored border for clear visibility.

- **Real-time queue length displays**  
  Each counter shows up-to-date customer counts and total items in queue.

- **Responsive design works on all devices**  
  The interface adapts to desktop, tablet, and mobile screens.

## How to Use

1. **Enter number of checkout counters**  
   Specify how many counters your store has (minimum 1).

2. **Add customers by specifying item counts**  
   Input the number of items for each arriving customer.

3. **System automatically assigns to optimal counter**  
   The algorithm directs each customer to the counter with fewest items.

## Advantages

- **Reduces customer wait times by balancing queues**  
  Ensures no single counter gets overloaded while others sit idle.

- **Scales efficiently to large store layouts**  
  Handles hundreds of counters with logarithmic time complexity.

- **Intuitive visual interface for staff monitoring**  
  Clear display of all queues at a glance with no training required.
