import { createRouter, createWebHistory } from 'vue-router';
// import PerticularChat from './src/components/PerticularChat.vue'
import AddExpense from './src/components/AddExpense.vue'
import ExpenseList from './src/components/ExpenseList.vue';
import './src/main.css'

const routes = [
  {
    path: '/AddExpense',
    name: 'AddExpense',
    component: AddExpense
  },
//   ScrollInfo
{
    path: '/ExpenseList',
    name: 'ExpenseList',
    component: ExpenseList
  },
 
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
