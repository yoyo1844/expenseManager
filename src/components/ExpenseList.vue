<template>
  <div class="w-full h-1/4  flex items-center justify-around">
    <!-- Gold Category -->
    <div class="w-1/5 h-3/4 shadow-2xl rounded-2xl bg-yellow-100 flex flex-col items-center justify-center text-center transition-transform transform hover:scale-105 hover:bg-yellow-200">
      <div class="text-lg font-bold text-gray-700">ગોલ્ડ ટોટલ</div>
      <div class="text-3xl font-extrabold text-yellow-700 mt-2">₹ {{ totalGold }}</div>
    </div>

    <!-- Jamanvar Category -->
    <div class="w-1/5 h-3/4 rounded-2xl shadow-2xl bg-green-100 flex flex-col items-center justify-center text-center transition-transform transform hover:scale-105 hover:bg-green-200">
      <div class="text-lg font-bold text-gray-700">જમણવાર ટોટલ</div>
      <div class="text-3xl font-extrabold text-green-700 mt-2">₹ {{ totalJamanvar }}</div>
    </div>

    <!-- Kapda Category -->
    <div class="w-1/5 h-3/4 rounded-2xl shadow-2xl bg-blue-100 flex flex-col items-center justify-center text-center transition-transform transform hover:scale-105 hover:bg-blue-200">
      <div class="text-lg font-bold text-gray-700">કપડા ટોટલ</div>
      <div class="text-3xl font-extrabold text-blue-700 mt-2">₹ {{ totalKapda }}</div>
    </div>

    <!-- Other Category -->
    <div class="w-1/5 h-3/4 rounded-2xl shadow-2xl bg-red-100 flex flex-col items-center justify-center text-center transition-transform transform hover:scale-105 hover:bg-red-200">
      <div class="text-lg font-bold text-gray-700">અન્ય ટોટલ</div>
      <div class="text-3xl font-extrabold text-red-700 mt-2">₹ {{ totalOther }}</div>
    </div>
  </div>

  <!-- Subtotal Display -->
  <div class="w-full h-1/6 bg-orange-100 flex items-center justify-center">
    <div class="text-4xl font-extrabold text-gray-800">
      ઓવરઓલ કુલ ટોટલ: ₹ {{ subtotal }}
    </div>
  </div>

  <div class="p-2 text-3xl w-1/2 font-extrabold">ખર્ચ ની યાદી : </div>

  <div class="w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
    <!-- Display the expenses in a table -->
    <table class="table-auto w-full text-left border-collapse">
      <thead>
        <tr>
          <th class="px-4 py-2 border-b-2">ક્રમ </th> <!-- Index Column -->
          <th class="px-4 py-2 border-b-2"> રૂપિયા ₹</th>
          <th class="px-4 py-2 border-b-2">વસ્તુ નુ નામ</th>
          <th class="px-4 py-2 border-b-2">દુકાન નુ નામ</th>
          <th class="px-4 py-2 border-b-2">દુકાન નો નંબર</th>
          <th class="px-4 py-2 border-b-2">કેટેગરી</th>
          <th class="px-4 py-2 border-b-2">action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(expense, index) in expenses" :key="expense._id">
          <td class="px-4 py-2 border-b">{{ index + 1 }}</td>
          <td class="px-4 py-2 border-b">{{ expense.amount }}</td>
          <td class="px-4 py-2 border-b">{{ expense.description }}</td>
          <td class="px-4 py-2 border-b">{{ expense.shopName }}</td>
          <td class="px-4 py-2 border-b">{{ expense.shopMobileNumber }}</td>
          <td class="px-4 py-2 border-b">{{ expense.category }}</td>
          <td class="px-4 py-2 border-b"><button @click="deleteKharch(expense._id)"><span class="material-symbols-outlined">delete</span ></button></td>
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
      totalGold: 0,  // Initialize total for Gold category
      totalJamanvar: 0,  // Initialize total for Jamanvar category
      totalKapda: 0,  // Initialize total for Kapda category
      totalOther: 0,  // Initialize total for Other category
      subtotal: 0,  // Subtotal of all expenses
    };
  },
  async mounted() {
    this.getKharchas()
  },

  methods : {
    async getKharchas(){
            try {
      // Fetch expenses from the backend API
      const response = await axios.get('http://localhost:3000/api/kharch');
      this.expenses = response.data; // Store the fetched data in the 'expenses' array
      
      // Calculate totals for each category and the subtotal
      this.expenses.forEach((expense) => {
        const amount = parseFloat(expense.amount); // Ensure amount is a number
        this.subtotal += amount;  // Add to subtotal
        
        // Add to specific category totals
        switch (expense.category) {
          case 'Gold':
            this.totalGold += amount;
            break;
          case 'Jamanvar':
            this.totalJamanvar += amount;
            break;
          case 'Kapda':
            this.totalKapda += amount;
            break;
          default:
            this.totalOther += amount;
            break;
        }
      });
    } catch (error) {
      console.error('Error fetching expenses:', error);
    }
    },
    clearTotals(){
      this.totalGold = 0
      this.totalJamanvar = 0
      this.totalKapda = 0
      this.totalOther = 0
      this.subtotal = 0
    },
     async deleteKharch(id){
      try{

        const res= await axios.post(`http://localhost:3000/api/deleteKharch?id=${id}`)
        console.log(res)
        this.clearTotals()
        this.getKharchas()
      }catch(err){
        console.log(err)
      }
    }
  }
};
</script>

<style scoped>
th {
  background-color: #f3f4f6;
  font-weight: bold;
}
td, th {
  padding: 0.75rem;
  border-bottom: 1px solid #ddd;
}

/* Additional styles for the category boxes */
.text-lg {
  font-size: 1.125rem;
}
.text-3xl {
  font-size: 1.875rem;
}
.text-4xl {
  font-size: 2.25rem;
}
.font-bold {
  font-weight: 700;
}
.font-extrabold {
  font-weight: 800;
}
td, th {
  padding: 0.75rem;
  border: 1px solid #ddd; /* Add this line for outlines */
}
</style>
