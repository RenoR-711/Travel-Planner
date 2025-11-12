import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

<<<<<<< HEAD
export default defineConfig({
  plugins: [react()],
  base: '/Travel-Planner/',
  optimizeDeps: {
    include: ['react-datepicker'],
  },
})

=======
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Travel-Planner1/', 
  optimizeDeps: {
    include: ["react-datepicker"],
  },
});
>>>>>>> parent of 1d2a0ad (add)
