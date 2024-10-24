<template>
    <div class="w-full mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h1 class="text-2xl font-bold mb-6 text-gray-800">અહિ ખર્ચ ઉમેરો</h1>
  
      <!-- Amount Input -->
      <div class="mb-9">
        <label for="rupees" class="block text-gray-700 font-medium mb-2">રૂપિયા</label>
        <input 
          type="number" 
          id="rupees" 
          v-model="kharchObj.amount" 
          class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
      </div>
  
      <!-- Description Input -->
      <div class="mb-9">
        <label for="description" class="block text-gray-700 font-medium mb-2">વસ્તુ નુ નામ</label>
        <input 
          type="text" 
          id="description" 
          v-model="kharchObj.description" 
          class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
      </div>
  
      <!-- Shop Name Input -->
      <div class="flex w-full " > 
      <div class="mb-9 w-1/3">
        <label for="shopName" class="block text-gray-700 font-medium mb-2 w-1/3">દુકાન નુ નામ </label>
        <input 
          type="text" 
          id="shopName" 
          v-model="kharchObj.shopName" 
          class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
      </div>

      <!-- shop mobile number -->
       <div class="mb-9 w-1/3 ml-16">
        <label for="shopMobileNumber" class="block text-gray-700 font-medium mb-2">દુકાન નો નંબર</label>
        <input 
          type="number" 
          id="shopMobileNumber" 
          v-model="kharchObj.shopMobileNumber" 
          class="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
      </div>
      </div>
  
      <!-- Category Dropdown -->
      <div class="mb-28">
        <label for="category" class="block text-gray-700 font-medium mb-2">કેટેગરી</label>
        <multiselect
          v-model="kharchObj.category"
          :options="categoryOptions"
          placeholder="Select Category"
          class="w-full custom-multiselect"
          label="label"
          track-by="value"
        ></multiselect>
      </div>
  
      <!-- Submit Button -->
      <div>
        <button 
          class="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          @click="addKharcho"
        >
          ખર્ચ ઉમેરો
        </button>
      </div>
    </div>
  </template>
  
  
  <script>
    import axios from 'axios';
import Multiselect from 'vue-multiselect'
  export default {
    name: 'AddExpense',
    components : {
        Multiselect
    },
    data() {
      return {
        kharchObj: {
          amount: null,
          description: '',
          shopName: '',
          category: '',
          shopMobileNumber : null
        },
       categoryOptions : [
          { label: 'Gold', value: 'G' },
          { label: 'Kapda', value: 'K' },
          { label: 'Jamanvar', value: 'J' },
          { label: 'Other', value: 'O' }
        ]
      };
    },
    methods: {
      clearKharchObj(){
          this.kharchObj =  {
          amount: null,
          description: '',
          shopName: '',
          category: '',
        }
      },
  async addKharcho() {
    try {
      // Create a copy of kharchObj but replace category with only its value
      const kharchData = {
        ...this.kharchObj,
        category: this.kharchObj.category.label // Extract just the value of the selected category
      };

      const res = await axios.post('http://localhost:3000/api/kharch', kharchData);
      console.log(res);
      this.clearKharchObj()
    } catch (err) {
      console.log(err);
    }
  }
},


  };
  </script>
  <style scoped>
  /* Custom Multiselect Styles */
  .custom-multiselect .multiselect {
    display: block;
    width: 100%;
  }
  
  .custom-multiselect .multiselect__input {
    padding: 0.5rem; /* Match the padding of other inputs */
    border: 1px solid #d1d5db; /* Same border as the input elements */
    border-radius: 0.375rem; /* Same rounded corners */
  }
  
  .custom-multiselect .multiselect__tags {
    height: 2.5rem; /* Match the height of other input fields */
    line-height: 1.25rem; /* Adjust to center the text vertically */
    padding: 0.5rem; /* Match input padding */
  }
  
  .custom-multiselect .multiselect__single {
    height: 100%; /* Ensure the selected option takes up the full height */
    padding-left: 0.5rem; /* Match padding */
  }
  
  .custom-multiselect .multiselect__content-wrapper {
    border-radius: 0.375rem; /* Same rounded corners */
  }
  </style>
  