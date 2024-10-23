<template>
  <div class="flex h-screen">
    <!-- Sidebar -->
    <nav class="w-1/6 bg-black text-white p-4">
      <ul class="space-y-4">
        <li>
          <router-link 
            to="/AddExpense" 
            class="block py-2 px-4 rounded"
            :class="{ 'bg-white text-black': $route.path === '/AddExpense', 'hover:bg-gray-700': $route.path !== '/AddExpense' }"
            exact
          >
            ખર્ચ ઉમેરો
          </router-link>
        </li>
        <li>
          <router-link 
            to="/ExpenseList" 
            class="block py-2 px-4 rounded"
            :class="{ 'bg-white text-black': $route.path === '/ExpenseList', 'hover:bg-gray-700': $route.path !== '/ExpenseList' }"
            exact
          >
            ખર્ચ ની યાદી
          </router-link>
        </li>
      </ul>
    </nav>

    <!-- Router View (Main Content) -->
    <div class="flex-grow">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style scoped>
</style>
