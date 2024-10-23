<template>
        <div></div>
      <div class=" p-2 text-3xl w-1/2 font-extrabold">ખર્ચ ની યાદી : </div>

    <div class="w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
      
      <!-- Display the expenses in a table -->
      <table class="table-auto w-full text-left border-collapse">
        <thead>
          <tr>
            <th class="px-4 py-2 border-b-2">ક્રમ </th> <!-- Index Column -->
            <th class="px-4 py-2 border-b-2"> રૂપિયા ₹</th>
            <th class="px-4 py-2 border-b-2">Description</th>
            <th class="px-4 py-2 border-b-2">Shop Name</th>
            <th class="px-4 py-2 border-b-2">Category</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(expense, index) in expenses" :key="expense._id">
            <td class="px-4 py-2 border-b">{{ index + 1 }}</td> <!-- Display the index + 1 -->
            <td class="px-4 py-2 border-b">{{ expense.amount }}</td>
            <td class="px-4 py-2 border-b">{{ expense.description }}</td>
            <td class="px-4 py-2 border-b">{{ expense.shopName }}</td>
            <td class="px-4 py-2 border-b">{{ expense.category }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ExpenseList',
    data() {
      return {
        expenses: [], // Store the fetched expenses here
      };
    },
    async mounted() {
      try {
        // Fetch expenses from the backend API
        const response = await axios.get('http://localhost:3000/api/kharch');
        this.expenses = response.data; // Store the fetched data in the 'expenses' array
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    },
  };
  </script>
  
  <style scoped>
    /* Add some basic styles for table formatting */
    th {
      background-color: #f3f4f6;
      font-weight: bold;
    }
    td, th {
      padding: 0.75rem;
      border-bottom: 1px solid #ddd;
    }
  </style>
  