import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qekcgmhqxurcfzybcrny.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFla2NnbWhxeHVyY2Z6eWJjcm55Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzI4ODE3NTMsImV4cCI6MTk4ODQ1Nzc1M30.2I6p2L3zTXHrbJNxBDEOKT2vkxDlN3G5X0d7-Sv1q8o'

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})

